// Defaults for tests so env.ts validation passes when running locally without .env.
process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.PORT = process.env.PORT ?? '3000';
process.env.API_VERSION = process.env.API_VERSION ?? 'v1';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:8081';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? 'postgresql://clc_user:clc_password_test@localhost:5432/clc_test';
