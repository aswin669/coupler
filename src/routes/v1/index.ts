import { FastifyPluginAsync } from 'fastify';

const v1Routes: FastifyPluginAsync = async (fastify, _options) => {
  // can add version-specific hooks or plugins here
  fastify.addHook('onRequest', async (request, _reply) => {
    request.log.info('Processing v1 API request');
  });
};

export default v1Routes;
