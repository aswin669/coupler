import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

type CorsOptions = {
  origin: string[];
  isProduction: boolean;
  rateLimitMax: number;
  rateLimitWindow: number;
};

const corsPlugin: FastifyPluginAsync<CorsOptions> = fp(async (fastify: FastifyInstance, options: CorsOptions) => {
  // Helmet for security headers
  await fastify.register(helmet, {
    contentSecurityPolicy: options.isProduction,
  });

  await fastify.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin
      if (!origin) {
        return cb(null, true);
      }

      const allowedOrigins = options.origin;

      // Determine if origin is allowed
      if (allowedOrigins.includes('*') || allowedOrigins.indexOf(origin) !== -1 || !origin) {
        cb(null, true);
        return;
      }

      // Reject if not in allowed origins
      cb(new Error('Not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    maxAge: 86400, // 24 hours
  });

  // Rate limiting
  await fastify.register(rateLimit, {
    max: options.rateLimitMax,
    timeWindow: options.rateLimitWindow,
    errorResponseBuilder: () => ({
      error: 'Too many requests',
      message: 'Rate limit exceeded',
    }),
  });
});

export default corsPlugin;
