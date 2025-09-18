import { FastifyPluginAsync } from 'fastify';

const healthRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', {
    schema: {
      summary: 'Health check endpoint',
      tags: ['health'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
          },
        },
      },
    },
    handler: async (_request, reply) => {
      return reply.code(200).send({
        status: 'ok',
      });
    },
  });
};

export default healthRoute;
