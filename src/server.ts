import { ajvFilePlugin } from '@fastify/multipart';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { loadEnvironmentVariables } from '@infrastructure/config';
import ajvErrors from 'ajv-errors';
import fastify from 'fastify';
import 'source-map-support/register';

import makeApp from './app';

const start = async () => {
  await loadEnvironmentVariables();

  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
    ajv: {
      plugins: [ajvErrors, ajvFilePlugin],
      customOptions: {
        removeAdditional: 'failing',
        coerceTypes: true,
        useDefaults: true,
        allErrors: true,
      },
    },
    trustProxy: true,
    bodyLimit: 1048576, // 1 MB
    caseSensitive: true,
    ignoreTrailingSlash: true,
    genReqId: () => `req-${Date.now()}-${Math.random()}`,
    serializerOpts: {
      bigint: 'string', // this will auto-convert BigInt to string in all responses
    },
  }).withTypeProvider<JsonSchemaToTsProvider>();

  await makeApp(app);

  const config = app.di.config;

  try {
    await app.listen({
      port: config.server.port,
      host: config.server.host,
    });

    app.log.info(`Server listening on ${config.server.host}:${config.server.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
