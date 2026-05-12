import type { RequestHandler } from 'express';
import { fail } from '../shared/response';

export const notFound: RequestHandler = (req, res) => {
  res.status(404).json(fail(`Route not found: ${req.method} ${req.originalUrl}`));
};
