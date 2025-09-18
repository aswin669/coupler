import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'production', 'staging', 'test']).default('local'),

  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('127.0.0.1'),

  LOG_LEVEL: z.enum(['info', 'error', 'warn', 'debug', 'trace']).default('info'),

  DATABASE_URL: z.string().url().default('postgresql://user:password@localhost:5430/app?schema=public'),
  DATABASE_MAX_CONNECTIONS: z.coerce.number().default(10),
  DATABASE_CONNECTION_TIMEOUT: z.coerce.number().default(30000),

  SERVICE_NAME: z.string().default('authentication'),
  SERVICE_VERSION: z.string().default('1.1.0'),

  ACCESS_TOKEN_SECRET: z.string().default('your_jwt_secret_dev_only'),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_SECRET: z.string().default('super_secret'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

  RATE_LIMIT_MAX_ATTEMPTS: z.coerce.number().default(500),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(300000),

  SWAGGER_HOST: z.string().default('http://localhost:4500'),
  SWAGGER_HOST_NAME: z.string().default('Local server'),
});
