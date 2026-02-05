import type { NextFunction, Request, Response } from 'express';

type ApiErrorResponse = {
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
};

type DbErrorLike = {
  code?: string;
  constraint?: string;
  detail?: string;
};

export function errorHandler(err: unknown, _req: Request, res: Response<ApiErrorResponse>, _next: NextFunction) {
  const message = err instanceof Error ? err.message : 'Unknown error';

  // eslint-disable-next-line no-console
  console.error(err);

  const db = err as DbErrorLike;
  // Unique violation (e.g. "members_phone_unique")
  if (db?.code === '23505') {
    return res.status(409).json({
      error: {
        message: 'Conflict',
        code: db.constraint ?? db.code,
        details: db.detail,
      },
    });
  }

  res.status(500).json({
    error: {
      message,
    },
  });
}
