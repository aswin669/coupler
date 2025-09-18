import { FastifyPluginAsync } from 'fastify';

const healthzRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('', {
    schema: {
      summary: 'Health check endpoint',
      tags: ['health'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: async (_, reply) => {
      const healthStatus = {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      };

      return reply.code(200).send(healthStatus);
    },
  });

  // Add health check route for database connectivity
  fastify.get('/db', {
    schema: {
      summary: 'Health check endpoint for database connectivity',
      tags: ['health'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            database: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: async (req, reply) => {
      try {
        // Execute a simple query to verify database connection
        await req.di.db.$queryRaw`SELECT 1`;

        const response = {
          status: 'ok',
          database: 'connected',
          timestamp: new Date().toISOString(),
        };
        return reply.code(200).send(response);
      } catch (error) {
        fastify.log.error('Database health check failed', error);

        const errorResponse = {
          status: 'error',
          database: 'disconnected',
          timestamp: new Date().toISOString(),
        };
        return reply.status(503).send(errorResponse);
      }
    },
  });
};

export default healthzRoute;
