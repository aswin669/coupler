import { ResponseHandler, catchAsync, validateRequest } from '@utils';
import { FastifyPluginAsync } from 'fastify';

import { CreateGenderDto, GenderIdParamDto, GenderListDto, UpdateGenderDto } from './dto';
import {
  CreateGenderBodySchema,
  CreateGenderResponseSchema,
  DeleteGenderResponseSchema,
  GenderGetByIdResponseSchema,
  GenderListResponseSchema,
  GenderListSchema,
  GenderParamsSchema,
  UpdateGenderBodySchema,
  UpdateGenderResponseSchema,
} from './schema';

const GenderRoutes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const genderService = fastify.di.genderService;

  fastify.register(async (protectedRoutes) => {
    protectedRoutes.addHook('preHandler', fastify.authenticate);
    protectedRoutes.addHook('preHandler', fastify.authorize(['ADMIN']));

    protectedRoutes.get('/', {
      schema: {
        tags: ['gender'],
        summary: 'Get list of genders',
        description: 'Returns paginated list of genders',
        querystring: GenderListSchema,
        response: {
          200: GenderListResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const queryData = validateRequest(GenderListDto, 'query')(request);

        const result = await genderService.getGenders(queryData);

        return ResponseHandler.success(reply, result, 'Genders fetched successfully');
      }),
    });

    protectedRoutes.get('/:genderId', {
      schema: {
        tags: ['gender'],
        summary: 'Get gender by id',
        description: 'Returns details of a gender',
        params: GenderParamsSchema,
        response: {
          200: GenderGetByIdResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { genderId } = validateRequest(GenderIdParamDto, 'params')(request);
        const gender = await genderService.getGenderById(genderId);
        return ResponseHandler.success(reply, gender, 'Gender fetched successfully');
      }),
    });

    protectedRoutes.post('/', {
      schema: {
        tags: ['gender'],
        summary: 'Create a new gender',
        body: CreateGenderBodySchema,
        response: {
          201: CreateGenderResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const body = validateRequest(CreateGenderDto, 'body')(request);
        const created = await genderService.createGender(body);
        return ResponseHandler.success(reply, created, 'Gender created successfully');
      }),
    });

    protectedRoutes.put('/:genderId', {
      schema: {
        tags: ['gender'],
        summary: 'Update a gender',
        params: GenderParamsSchema,
        body: UpdateGenderBodySchema,
        response: {
          200: UpdateGenderResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { genderId } = validateRequest(GenderIdParamDto, 'params')(request);
        const body = validateRequest(UpdateGenderDto, 'body')(request);
        const updated = await genderService.updateGender(genderId, body);
        return ResponseHandler.success(reply, updated, 'Gender updated successfully');
      }),
    });

    protectedRoutes.delete('/:genderId', {
      schema: {
        tags: ['gender'],
        summary: 'Delete a gender',
        params: GenderParamsSchema,
        response: {
          200: DeleteGenderResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { genderId } = validateRequest(GenderIdParamDto, 'params')(request);
        await genderService.deleteGender(genderId);
        return ResponseHandler.success(reply, genderId, 'Gender deleted successfully');
      }),
    });
  });
};

export default GenderRoutes;
