import autoLoad from '@fastify/autoload';
import { makeInfrastructureDependencies } from '@infrastructure/di';
import { registerErrorHandler } from '@infrastructure/error-handler';
import { FastifyInstance } from 'fastify';
import path from 'path';

export default async function makeApp(app: FastifyInstance) {
  const container = await makeInfrastructureDependencies(app);

  // Decorate fastify instance with the container
  app.decorate('di', container);

  // Make container available in the request context
  app.decorateRequest('di', {
    getter() {
      return container;
    },
  });

  // Register plugins
  app.register(autoLoad, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /^(__tests__|test)$/,
  });

  // Register hooks
  app.register(autoLoad, {
    dir: path.join(__dirname, 'hooks'),
    ignorePattern: /^(__tests__|test)$/,
  });

  // Register routes
  app.register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true, // Support route parameters in directory names
    ignorePattern: /^(__tests__|test|types|schemas)$/,
    autoHooks: true, // Use directory based hooks
    cascadeHooks: true, // Inherit parent hooks
  });

  // Handle errors
  registerErrorHandler(app);

  const shutdown = (error: unknown) => {
    if (error) app.log.error(error);
    app.log.info('Shutting down server...');
    app.di.db.$disconnect();
    app.log.info('Prisma client disconnected');
    app.close();
    process.exit(0);
  };

  // For graceful shutdown
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  process.on('unhandledRejection', (error) => {
    app.log.error('UNHANDLED PROMISE REJECTION', error);
    shutdown(error);
  });

  process.on('uncaughtException', (error) => shutdown(error));
}
