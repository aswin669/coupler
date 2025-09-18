import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hooks: FastifyPluginAsync = async (fastify: FastifyInstance, _options: { [key: string]: any }) => {
  // Global hooks for all routes
  fastify.addHook('onRequest', async (_request, _reply) => {});

  fastify.addHook('onResponse', async (_request, _reply) => {});

  fastify.addHook('onError', async (_request, _reply, _error) => {});

  fastify.addHook('onSend', async (_request, _reply, _payload) => {});
};

export default fp(hooks, { name: 'hooks' });
