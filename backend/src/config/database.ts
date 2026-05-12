import { PrismaClient } from '@prisma/client';
import { env } from './env';

// Singleton Prisma client. Re-using one instance across the process prevents
// exhausting the DB connection pool — every `new PrismaClient()` opens its own pool.
declare global {
  // eslint-disable-next-line no-var
  var __clc_prisma__: PrismaClient | undefined;
}

export const prisma =
  global.__clc_prisma__ ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
  });

if (env.NODE_ENV !== 'production') {
  global.__clc_prisma__ = prisma;
}
