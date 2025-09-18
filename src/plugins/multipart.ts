import multipart from '@fastify/multipart';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const multipartPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(multipart, {
    attachFieldsToBody: true,
    sharedSchemaId: '#mySharedSchema',
    throwFileSizeLimit: true,
    limits: {
      files: 1,
      fileSize: 10 * 1024 * 1024,
      fields: 20,
      parts: 25,
    },
  });
});

export default multipartPlugin;
