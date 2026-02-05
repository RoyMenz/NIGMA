import { Router } from 'express';
import { supabase } from '../supabase.js';

export const eventsRouter = Router();

eventsRouter.get('/', async (_req, res, next) => {
  try {
    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const { data, error } = await supabase
      .from('events')
      .select('event_id,event_name,min_members,max_members')
      .order('event_id', { ascending: true });
    if (error) throw error;
    return res.json({ data });
  } catch (err) {
    next(err);
  }
});

eventsRouter.get('/:eventId', async (req, res, next) => {
  try {
    const eventId = Number(req.params.eventId);
    if (!Number.isFinite(eventId)) {
      return res.status(400).json({ error: { message: 'Invalid eventId' } });
    }

    if (!supabase) return res.status(500).json({ error: { message: 'Supabase not configured' } });

    const { data, error } = await supabase
      .from('events')
      .select('event_id,event_name,min_members,max_members')
      .eq('event_id', eventId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: { message: 'Event not found' } });
    return res.json({ data });
  } catch (err) {
    next(err);
  }
});
