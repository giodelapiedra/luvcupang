import 'dotenv/config';
import { z } from 'zod';

// All required env vars are validated at startup. If any is missing or invalid,
// the process exits with a clear error message. This prevents silent failures
// in production where a missing var would surface as a confusing runtime crash.
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('3000')
    .transform((v) => Number.parseInt(v, 10))
    .pipe(z.number().int().positive()),
  API_VERSION: z.string().default('v1'),
  CORS_ORIGIN: z.string().url(),

  // Phase 1 — optional in Phase 0 so the placeholder values don't break startup.
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_EXPIRES: z.string().default('15m'),
  JWT_REFRESH_EXPIRES: z.string().default('30d'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
