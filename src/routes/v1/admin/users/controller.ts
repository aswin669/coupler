import { IUserService } from '@domain/services';
import { FastifyPluginAsync } from 'fastify';

import { CreateUserDto, UpdateUserDto } from './dto';
import { createUserSchema, updateUserSchema, userParamsSchema, userSchema, usersResponseSchema } from './schema';

const userRoutes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  // Get user service from DI container
  const userService: IUserService = fastify.di.userService;

  // GET /api/v1/users
  fastify.get('/', {
    schema: {
      tags: ['users'],
      summary: 'Get all users',
      description: 'Returns a list of all users',
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, examples: [1] },
          limit: { type: 'integer', minimum: 1, maximum: 100, examples: [20] },
          search: { type: 'string' },
        },
      },
      response: {
        200: usersResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { page, limit, search } = request.query as {
        page?: number;
        limit?: number;
        search?: string;
      };

      try {
        const result = await userService.getUsers({ page, limit, search });
        return result;
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'An error occurred while fetching users',
        });
      }
    },
  });

  // GET /api/v1/users/:id
  fastify.get('/:id', {
    schema: {
      tags: ['users'],
      summary: 'Get user by ID',
      description: 'Returns a single user by ID',
      params: userParamsSchema,
      response: {
        200: userSchema,
        404: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        const user = await userService.getUserById(id);
        return user;
      } catch (error) {
        request.log.error(error);
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `User with ID ${id} not found`,
        });
      }
    },
  });

  // POST /api/v1/users
  fastify.post('/', {
    schema: {
      tags: ['users'],
      summary: 'Create a new user',
      description: 'Creates a new user and returns the created user',
      body: createUserSchema,
      response: {
        201: userSchema,
        400: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const parsed = CreateUserDto.safeParse(request.body);

        if (!parsed.success) {
          return reply.status(400).send({ errors: parsed.error.flatten() });
        }
        const data = parsed.data;
        const newUser = await userService.createUser(data);
        return reply.code(201).send(newUser);
      } catch (error) {
        request.log.error(error);
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: error instanceof Error ? error.message : 'An error occurred while creating user',
        });
      }
    },
  });

  // PUT /api/v1/users/:id
  fastify.put('/:id', {
    schema: {
      tags: ['users'],
      summary: 'Update a user',
      description: 'Updates a user and returns the updated user',
      params: userParamsSchema,
      body: updateUserSchema,
      response: {
        200: userSchema,
        404: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };

      const parsed = UpdateUserDto.safeParse({
        ...(request.body as Record<string, unknown>),
        id,
      });

      if (!parsed.success) {
        return reply.status(400).send({ errors: parsed.error.flatten() });
      }
      const data = parsed.data;

      try {
        const updatedUser = await userService.updateUser(id, data);
        return updatedUser;
      } catch (error) {
        request.log.error(error);
        const statusCode = error instanceof Error && error.message?.includes('not found') ? 404 : 400;
        return reply.code(statusCode).send({
          statusCode,
          error: statusCode === 404 ? 'Not Found' : 'Bad Request',
          message: error instanceof Error ? error.message : 'An error occurred while updating user',
        });
      }
    },
  });

  // DELETE /api/v1/users/:id
  fastify.delete('/:id', {
    schema: {
      tags: ['users'],
      summary: 'Delete a user',
      description: 'Deletes a user',
      params: userParamsSchema,
      response: {
        204: {
          type: 'null',
          description: 'User successfully deleted',
        },
        404: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        await userService.deleteUser(id);
        return reply.code(204).send();
      } catch (error) {
        request.log.error(error);
        return reply.code(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: error instanceof Error ? error.message : 'An error occurred while deleting user',
        });
      }
    },
  });
};

export default userRoutes;
