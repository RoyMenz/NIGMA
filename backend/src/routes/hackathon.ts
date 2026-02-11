import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../supabase.js';
import { sendHackathonEmail } from '../utils/mailer.js';

export const hackathonRouter = Router();

const MemberSchema = z.object({
  fullName: z.string().trim().min(1),
  college: z.string().trim().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  phone: z.string().trim().min(7),
  email: z.string().email(),
});

const CreateHackathonSchema = z.object({
  teamName: z.string().trim().min(1),
  teamSize: z.number().int().min(2).max(4),
  track: z.enum(['healthcare', 'education', 'fintech', 'open innovation']),
  members: z.array(MemberSchema).min(2).max(4),
});

hackathonRouter.post('/', async (req, res, next) => {
  try {
    const parsed = CreateHackathonSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: { message: 'Invalid payload', details: parsed.error.flatten() },
      });
    }

    const { teamName, teamSize, track, members } = parsed.data;

    if (members.length !== teamSize) {
      return res.status(400).json({
        error: { message: 'Members count must match teamSize' },
      });
    }

    if (!supabase) {
      return res.status(500).json({ error: { message: 'Supabase not configured' } });
    }

    // 1️⃣ Insert registration
    const { data: registration, error: regErr } = await supabase
      .from('hackathon_registrations')
      .insert({
        team_name: teamName,
        team_size: teamSize,
        track,
      })
      .select('registration_id, created_at')
      .single();

    if (regErr) throw regErr;

    // 2️⃣ Insert members
    const memberRows = members.map((m, index) => ({
      registration_id: registration.registration_id,
      full_name: m.fullName,
      college_name: m.college,
      city: m.city,
      state: m.state,
      phone_number: m.phone,
      email: m.email,
      is_leader: index === 0,
    }));

    const { error: memErr } = await supabase
      .from('hackathon_members')
      .insert(memberRows);

    if (memErr) {
      await supabase
        .from('hackathon_members')
        .delete()
        .eq('registration_id', registration.registration_id);

      await supabase
        .from('hackathon_registrations')
        .delete()
        .eq('registration_id', registration.registration_id);

      throw memErr;
    }

    // 3️⃣ Send confirmation email
    try {
      await sendHackathonEmail(
        members[0].email,
        teamName,
        registration.registration_id
      );
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
    }

    return res.status(201).json({
      data: {
        registrationId: registration.registration_id,
        createdAt: registration.created_at,
        teamSize,
      },
    });
  } catch (err) {
    next(err);
  }
});
