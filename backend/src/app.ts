import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import {
  API_PREFIX,
  DEFAULT_RATE_LIMIT_MAX,
  DEFAULT_RATE_LIMIT_WINDOW_MS,
  REQUEST_BODY_LIMIT,
} from './config/constants';

export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(
    rateLimit({
      windowMs: DEFAULT_RATE_LIMIT_WINDOW_MS,
      max: DEFAULT_RATE_LIMIT_MAX,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use(express.json({ limit: REQUEST_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: true }));

  app.use(requestLogger);
  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(`${API_PREFIX}/${env.API_VERSION}`, router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
