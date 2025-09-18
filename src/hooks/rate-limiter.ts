import { ErrorType, StatusCode } from '@constants';
import { AppError } from '@domain/errors';
import { ResponseHandler } from '@utils';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (use Redis in production)
const limitStore: Map<string, RateLimitRecord> = new Map();

async function rateLimiter(fastify: FastifyInstance) {
  const config = fastify.di.config;

  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    // Only apply to OTP routes
    if (!(request.routeOptions.url ?? '').includes('otp')) {
      return;
    }

    // Get client identifier (IP address or userId if authenticated)
    const clientId = request.ip;
    const now = Date.now();

    // Get existing record or create new one
    const record = limitStore.get(clientId) || {
      count: 0,
      resetTime: now + config.rateLimiting.windowMs,
    };

    // Check if window expired and reset if needed
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + config.rateLimiting.windowMs;
    }

    // Increment count
    record.count += 1;

    // Update store
    limitStore.set(clientId, record);

    // If limit exceeded, return rate limit error
    if (record.count > config.rateLimiting.maxAttempts) {
      // const retryAfter = new Date(record.resetTime);

      return ResponseHandler.error(
        reply,
        new AppError({
          message: 'Rate limit exceeded, please try again later',
          code: StatusCode.RATE_LIMIT,
          type: ErrorType.RATE_LIMIT_EXCEEDED,
        }),
      );
    }
  });
}

export default fastifyPlugin(rateLimiter);
