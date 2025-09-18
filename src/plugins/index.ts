import { parseTimeToSeconds } from '@utils';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import authPlugin from './auth';
import cookiePlugin from './cookie';
import jwtPlugin from './jwt';
import monitoringPlugin from './monitoring';
import multipartPlugin from './multipart';
import corsPlugin from './security';
import swaggerPlugin from './swagger';
import swaggerSchemaPlugin from './swaggerSchema';

// Register all plugins
const plugins: FastifyPluginAsync = fp(async (fastify, _opts) => {
  const config = fastify.di.config;

  // Register CORS
  await fastify.register(corsPlugin, {
    // Make it secure for production
    origin: config.isProduction ? ['https://api.regional_data_management.in'] : ['*'],
    isProduction: config.isProduction,
    rateLimitMax: config.rateLimiting.maxAttempts,
    rateLimitWindow: config.rateLimiting.windowMs,
  });

  // Register swagger (to collect schema definitions)
  await fastify.register(swaggerPlugin, {
    swaggerHost: config.swagger.host,
    swaggerHostName: config.swagger.name,
  });

  await fastify.register(swaggerSchemaPlugin);

  await fastify.register(multipartPlugin);

  await fastify.register(jwtPlugin, {
    secret: config.jwt.accessTokenSecret,
    refreshSecret: config.jwt.refreshTokenSecret,
    accessTokenExpiresIn: config.jwt.accessTokenExpiresIn,
    refreshTokenExpiresIn: config.jwt.refreshTokenExpiresIn,
    signOptions: {
      algorithm: 'HS256',
      expiresIn: config.jwt.refreshTokenExpiresIn,
      notBefore: '0',
    },
  });

  await fastify.register(cookiePlugin, {
    secret: config.jwt.refreshTokenSecret,
    hook: 'onRequest',
    parseOptions: {
      path: '/',
      httpOnly: true,
      secure: config.isProduction,
      maxAge: parseTimeToSeconds(config.jwt.refreshTokenExpiresIn),
    },
  });

  await fastify.register(authPlugin);

  await fastify.register(monitoringPlugin);
});

export default plugins;
