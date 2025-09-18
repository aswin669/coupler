import { userSchema } from '@routes/v1/admin/users/schema';
import { ExceptionSchema } from '@schemas';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const swaggerSchemaPlugin: FastifyPluginAsync = fp(async (fastify, _options) => {
  fastify.addSchema({
    $id: 'Exception',
    ...ExceptionSchema,
  });

  fastify.addSchema({
    $id: 'User',
    ...userSchema,
  });
});

export default swaggerSchemaPlugin;
