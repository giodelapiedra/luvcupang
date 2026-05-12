import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { logger } from '../shared/logger';
import { fail } from '../shared/response';

// Global error catcher — every unhandled error in any route ends up here so we
// always return a uniform ApiResponse shape instead of Express's default HTML.
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const requestId = (req as { id?: string }).id;

  if (err instanceof ZodError) {
    logger.warn('Validation failed', { requestId, issues: err.flatten() });
    res.status(400).json(fail('Validation failed'));
    return;
  }

  const status =
    typeof (err as { status?: unknown }).status === 'number'
      ? (err as { status: number }).status
      : 500;

  const message =
    err instanceof Error && err.message ? err.message : 'Internal server error';

  logger.error('Unhandled error', {
    requestId,
    status,
    message,
    stack: err instanceof Error ? err.stack : undefined,
  });

  res.status(status).json(fail(status >= 500 ? 'Internal server error' : message));
};
