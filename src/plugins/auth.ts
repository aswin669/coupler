import { ForbiddenError, UnauthorizedError } from '@domain/errors';
import { Role } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const authPlugin: FastifyPluginAsync = fp(async (fastify, _opts) => {
  fastify.decorate('authenticate', async (request, _reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedError({ message: 'Missing or invalid authorization header' });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      if (!token) {
        throw new UnauthorizedError({ message: 'Missing token' });
      }
      const decoded = fastify.verifyAccessToken(token);
      request.user = decoded;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedError({ message: error.message });
      } else {
        throw new UnauthorizedError({ message: `Authentication failed: ${error}` });
      }
    }
  });

  fastify.decorate('authorize', (roles: Role[]) => {
    return async (request, _reply) => {
      const user = request.user;
      if (!user) {
        throw new UnauthorizedError({ message: 'User not authenticated' });
      }

      if (!roles.includes(user.role)) {
        throw new ForbiddenError({
          additionalDetails: {
            field: 'role',
            message: `User does not have the required role: ${roles.join(', ')}`,
          },
        });
      }
    };
  });
});

export default authPlugin;
