import { IAuthService } from '@domain/services';
import { LoginDto } from '@routes/v1/auth/dto';
import { ResponseHandler, catchAsync, validateRequest } from '@utils';
import { FastifyPluginAsync } from 'fastify';

import { loginRequestSchema, loginResponseSchema } from './schema';

const AuthRoutes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const authService = fastify.di.authService as IAuthService;

  fastify.post('/login', {
    schema: {
      tags: ['auth'],
      summary: 'User login',
      body: loginRequestSchema,
      response: {
        200: loginResponseSchema,
        400: { $ref: 'Exception#' },
        401: { $ref: 'Exception#' },
        500: { $ref: 'Exception#' },
      },
    },
    handler: catchAsync(async (request, reply) => {
      const loginInput = validateRequest(LoginDto, 'body')(request);

      const loginResult = await authService.login(loginInput);

      return ResponseHandler.success(reply, loginResult, 'Login successful');
    }),
  });
};

export default AuthRoutes;
