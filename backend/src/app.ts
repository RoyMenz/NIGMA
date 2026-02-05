import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './env.js';
import { supabase } from './supabase.js';
import { eventsRouter } from './routes/events.js';
import { registrationsRouter } from './routes/registrations.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  const allowedOrigins = env.CORS_ORIGIN.split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  // eslint-disable-next-line no-console
  console.log('[cors] allowed origins:', allowedOrigins);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        if (env.NODE_ENV !== 'production') return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
    }),
  );
  app.use(express.json({ limit: '256kb' }));
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.get('/health', async (_req, res) => {
    if (!supabase) return res.status(500).json({ ok: false, supabase: false });

    const { error } = await supabase.from('events').select('event_id').limit(1);
    if (error) return res.status(500).json({ ok: false, supabase: true, error: error.message });

    res.json({ ok: true, supabase: true });
  });

  app.get('/api', (_req, res) => {
    res.json({
      name: 'nigma-backend',
      version: '0.1.0',
      endpoints: ['/api/events', '/api/registrations'],
    });
  });

  app.use('/api/events', eventsRouter);
  app.use('/api/registrations', registrationsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
