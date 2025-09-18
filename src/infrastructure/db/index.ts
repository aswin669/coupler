import { PrismaClient } from '@prisma/client';
import { AppConfig, Logger } from '@types';

export async function connectDB(config: AppConfig, logger: Logger) {
  const prisma = new PrismaClient({
    log: config.isProduction ? ['error', 'warn'] : ['error', 'warn', 'info', 'query'],
  });

  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL database');
  } catch (error) {
    logger.info('Failed to connect to database', error);
    throw error;
  }

  return prisma;
}
