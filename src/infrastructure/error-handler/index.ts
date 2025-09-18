import { ErrorType } from '@constants';
import { NotFoundError } from '@domain/errors';
import { ResponseHandler } from '@utils';
import { FastifyInstance } from 'fastify';

export async function registerErrorHandler(app: FastifyInstance) {
  // Handle route not found
  app.setNotFoundHandler((_request, reply) => {
    return ResponseHandler.error(
      reply,
      new NotFoundError({
        message: 'Route not found',
        type: ErrorType.ROUTE_NOT_FOUND,
      }),
    );
  });

  app.setErrorHandler((error, _request, reply) => {
    return ResponseHandler.error(reply, error);
  });
}
