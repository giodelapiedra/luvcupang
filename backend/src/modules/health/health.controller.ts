import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { ok } from '../../shared/response';

interface HealthPayload {
  status: 'ok';
  timestamp: string;
  environment: string;
  database: 'reachable' | 'unreachable';
}

export async function getHealth(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let database: HealthPayload['database'] = 'unreachable';
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = 'reachable';
    } catch {
      database = 'unreachable';
    }

    const payload: HealthPayload = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database,
    };
    res.status(200).json(ok(payload));
  } catch (err) {
    next(err);
  }
}
