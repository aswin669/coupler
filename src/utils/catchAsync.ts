import { FastifyReply, FastifyRequest } from 'fastify';

import { ResponseHandler } from './ResponseHandler';

type AsyncHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>;

export function catchAsync(handler: AsyncHandler): AsyncHandler {
  return async (request, reply) => {
    try {
      return await handler(request, reply);
    } catch (error) {
      return ResponseHandler.error(reply, error as Error);
    }
  };
}
