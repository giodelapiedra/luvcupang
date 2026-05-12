import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';
import { logger } from '../shared/logger';

// Attaches a request ID and logs each request with status + duration.
// The ID is also echoed back as `X-Request-Id` so clients can quote it in bug reports.
export const requestLogger: RequestHandler = (req, res, next) => {
  const id = req.header('x-request-id') ?? randomUUID();
  (req as { id?: string }).id = id;
  res.setHeader('X-Request-Id', id);

  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    logger.info('http_request', {
      requestId: id,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Math.round(durationMs * 100) / 100,
    });
  });

  next();
};
