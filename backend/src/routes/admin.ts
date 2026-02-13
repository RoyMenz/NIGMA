import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../supabase.js';

export const adminRouter = Router();

const ADMIN_EMAIL = 'developers@nigmafest.in';
const ADMIN_PASSWORD = 'Kairos_004';
const ADMIN_TOKEN = 'nigma_admin_static_token_v1';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function unauthorized() {
  return { error: { message: 'Unauthorized' } };
}

function getBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

adminRouter.post('/login', (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: { message: 'Invalid payload', details: parsed.error.flatten() },
    });
  }

  const { email, password } = parsed.data;
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json(unauthorized());
  }

  return res.json({
    data: {
      token: ADMIN_TOKEN,
      email: ADMIN_EMAIL,
    },
  });
});

adminRouter.use((req, res, next) => {
  const token = getBearerToken(req.headers.authorization);
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json(unauthorized());
  }
  next();
});

adminRouter.get('/events-summary', async (_req, res, next) => {
  try {
    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const [{ data: events, error: eventsErr }, { data: registrations, error: regsErr }, { data: members, error: membersErr }] =
      await Promise.all([
        supabase.from('events').select('event_id,event_name,min_members,max_members').order('event_id', { ascending: true }),
        supabase.from('registrations').select('registration_id,event_id,created_at').order('created_at', { ascending: false }),
        supabase.from('members').select('member_id,event_id,registration_id'),
      ]);

    if (eventsErr) throw eventsErr;
    if (regsErr) throw regsErr;
    if (membersErr) throw membersErr;

    const regsByEvent = new Map<number, number>();
    const membersByEvent = new Map<number, number>();

    for (const row of registrations ?? []) {
      regsByEvent.set(row.event_id, (regsByEvent.get(row.event_id) ?? 0) + 1);
    }
    for (const row of members ?? []) {
      membersByEvent.set(row.event_id, (membersByEvent.get(row.event_id) ?? 0) + 1);
    }

    const eventSummary = (events ?? []).map((event) => ({
      eventId: event.event_id,
      eventName: event.event_name,
      minMembers: event.min_members,
      maxMembers: event.max_members,
      registrationsCount: regsByEvent.get(event.event_id) ?? 0,
      participantsCount: membersByEvent.get(event.event_id) ?? 0,
    }));

    return res.json({
      data: {
        totals: {
          events: eventSummary.length,
          registrations: (registrations ?? []).length,
          participants: (members ?? []).length,
        },
        events: eventSummary,
      },
    });
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/events/:eventId/registrations', async (req, res, next) => {
  try {
    const eventId = Number(req.params.eventId);
    if (!Number.isFinite(eventId) || eventId <= 0) {
      return res.status(400).json({ error: { message: 'Invalid eventId' } });
    }

    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const { data: registrations, error: regsErr } = await supabase
      .from('registrations')
      .select('registration_id,event_id,created_at')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });
    if (regsErr) throw regsErr;

    const registrationIds = (registrations ?? []).map((r) => r.registration_id);
    let membersByRegistration = new Map<number, Array<{ fullName: string; college: string; city: string; phone: string }>>();
    if (registrationIds.length > 0) {
      const { data: members, error: memErr } = await supabase
        .from('members')
        .select('registration_id,full_name,college,city,phone')
        .in('registration_id', registrationIds)
        .order('member_id', { ascending: true });
      if (memErr) throw memErr;

      membersByRegistration = new Map();
      for (const m of members ?? []) {
        const list = membersByRegistration.get(m.registration_id) ?? [];
        list.push({
          fullName: m.full_name,
          college: m.college,
          city: m.city,
          phone: String(m.phone),
        });
        membersByRegistration.set(m.registration_id, list);
      }
    }

    const result = (registrations ?? []).map((r) => ({
      registrationId: r.registration_id,
      eventId: r.event_id,
      createdAt: r.created_at,
      members: membersByRegistration.get(r.registration_id) ?? [],
    }));

    return res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/insights/overview', async (_req, res, next) => {
  try {
    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const [{ data: registrations, error: regsErr }, { data: members, error: membersErr }] = await Promise.all([
      supabase.from('registrations').select('registration_id,created_at'),
      supabase.from('members').select('college,city'),
    ]);
    if (regsErr) throw regsErr;
    if (membersErr) throw membersErr;

    const byDate = new Map<string, number>();
    for (const r of registrations ?? []) {
      const day = new Date(r.created_at).toISOString().slice(0, 10);
      byDate.set(day, (byDate.get(day) ?? 0) + 1);
    }

    const collegeCounts = new Map<string, number>();
    const cityCounts = new Map<string, number>();
    for (const m of members ?? []) {
      const college = m.college.trim();
      const city = m.city.trim();
      collegeCounts.set(college, (collegeCounts.get(college) ?? 0) + 1);
      cityCounts.set(city, (cityCounts.get(city) ?? 0) + 1);
    }

    const topColleges = Array.from(collegeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
    const topCities = Array.from(cityCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
    const dailyRegistrations = Array.from(byDate.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));

    return res.json({
      data: {
        dailyRegistrations,
        topColleges,
        topCities,
      },
    });
  } catch (err) {
    next(err);
  }
});
