import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './config/database';
import { logger } from './shared/logger';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`CLC API listening`, {
    port: env.PORT,
    env: env.NODE_ENV,
    apiVersion: env.API_VERSION,
  });
});

// Graceful shutdown — close HTTP server, then Prisma pool. Prevents dropped
// in-flight requests during deploys / SIGTERM from container orchestrators.
async function shutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}, shutting down gracefully`);
  server.close(async (err) => {
    if (err) {
      logger.error('Error during HTTP server close', { err });
      process.exit(1);
    }
    try {
      await prisma.$disconnect();
      logger.info('Prisma disconnected, exit 0');
      process.exit(0);
    } catch (e) {
      logger.error('Error during Prisma disconnect', { e });
      process.exit(1);
    }
  });

  // Hard-exit safety net if close() hangs.
  setTimeout(() => {
    logger.error('Force exit after 10s');
    process.exit(1);
  }, 10_000).unref();
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
