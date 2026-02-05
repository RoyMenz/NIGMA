import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../supabase.js';

export const registrationsRouter = Router();

const MemberSchema = z.object({
  fullName: z.string().trim().min(1),
  college: z.string().trim().min(1),
  // Frontend currently uses `cityState`; allow either key and store into DB column `city`.
  city: z.string().trim().min(1).optional(),
  cityState: z.string().trim().min(1).optional(),
  phone: z.string().trim().min(1),
});

const CreateRegistrationSchema = z.object({
  eventId: z.number().int().positive(),
  members: z.array(MemberSchema).min(1).max(25),
});

function normalizePhoneToBigInt(phoneRaw: string): bigint {
  const digits = phoneRaw.replace(/\D/g, '');
  // keep it permissive (international numbers), but prevent junk
  if (digits.length < 7 || digits.length > 15) {
    throw new Error('Invalid phone number');
  }
  return BigInt(digits);
}

registrationsRouter.post('/', async (req, res, next) => {
  try {
    const parsed = CreateRegistrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: { message: 'Invalid payload', details: parsed.error.flatten() } });
    }

    const { eventId, members } = parsed.data;
    const normalizedPhones = members.map((m) => normalizePhoneToBigInt(m.phone).toString());
    const uniquePhones = new Set(normalizedPhones);
    if (uniquePhones.size !== normalizedPhones.length) {
      return res.status(400).json({
        error: { message: 'Duplicate phone numbers in team members list' },
      });
    }

    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const { data: event, error: eventErr } = await supabase
      .from('events')
      .select('event_id,min_members,max_members')
      .eq('event_id', eventId)
      .maybeSingle();
    if (eventErr) throw eventErr;
    if (!event) return res.status(404).json({ error: { message: 'Event not found' } });

    if (members.length < event.min_members || members.length > event.max_members) {
      return res.status(400).json({
        error: {
          message: `Team size must be between ${event.min_members} and ${event.max_members} members for this event`,
        },
      });
    }

    const { data: existing, error: existErr } = await supabase
      .from('members')
      .select('phone,event_id,registration_id')
      .in('phone', Array.from(uniquePhones));
    if (existErr) throw existErr;
    if (existing && existing.length > 0) {
      return res.status(409).json({
        error: { message: 'One or more members are already registered for an event', details: existing },
      });
    }

    // Create registration then members. If member insert fails, best-effort cleanup.
    const { data: reg, error: regErr } = await supabase
      .from('registrations')
      .insert({ event_id: eventId })
      .select('registration_id,event_id,created_at')
      .single();
    if (regErr) throw regErr;

    const memberRows = members.map((m, i) => {
      const city = m.city ?? m.cityState;
      if (!city) throw new Error('Missing city/cityState for member');
      return {
        registration_id: reg.registration_id,
        event_id: eventId,
        full_name: m.fullName,
        college: m.college,
        city,
        phone: normalizedPhones[i]!, // keep as string (int8 safe)
      };
    });

    const { error: memErr } = await supabase.from('members').insert(memberRows);
    if (memErr) {
      // cleanup registration + members if possible
      await supabase.from('members').delete().eq('registration_id', reg.registration_id);
      await supabase.from('registrations').delete().eq('registration_id', reg.registration_id);
      throw memErr;
    }

    return res.status(201).json({
      data: {
        registrationId: reg.registration_id,
        eventId,
        createdAt: reg.created_at,
        membersCount: members.length,
      },
    });
  } catch (err) {
    next(err);
  }
});

registrationsRouter.get('/:registrationId', async (req, res, next) => {
  try {
    const registrationId = Number(req.params.registrationId);
    if (!Number.isFinite(registrationId) || registrationId <= 0) {
      return res.status(400).json({ error: { message: 'Invalid registrationId' } });
    }

    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const { data: registration, error: regErr } = await supabase
      .from('registrations')
      .select('registration_id,event_id,created_at')
      .eq('registration_id', registrationId)
      .maybeSingle();
    if (regErr) throw regErr;
    if (!registration) return res.status(404).json({ error: { message: 'Registration not found' } });

    const { data: members, error: memErr } = await supabase
      .from('members')
      .select('member_id,full_name,college,city,phone')
      .eq('registration_id', registrationId)
      .order('member_id', { ascending: true });
    if (memErr) throw memErr;

    return res.json({ data: { ...registration, members: members ?? [] } });
  } catch (err) {
    next(err);
  }
});
