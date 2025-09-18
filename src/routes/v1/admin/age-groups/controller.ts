import { ResponseHandler, catchAsync, validateRequest } from '@utils';
import { FastifyPluginAsync } from 'fastify';

import { AgeGroupIdParamDto, AgeGroupListDto, CreateAgeGroupDto, UpdateAgeGroupDto } from './dto';
import {
  AgeGroupGetByIdResponseSchema,
  AgeGroupListResponseSchema,
  AgeGroupListSchema,
  AgeGroupParamsSchema,
  CreateAgeGroupBodySchema,
  CreateAgeGroupResponseSchema,
  DeleteAgeGroupResponseSchema,
  UpdateAgeGroupBodySchema,
  UpdateAgeGroupResponseSchema,
} from './schema';

const AgeGroupRoutes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const ageGroupService = fastify.di.ageGroupService;

  fastify.register(async (protectedRoutes) => {
    protectedRoutes.addHook('preHandler', fastify.authenticate);
    protectedRoutes.addHook('preHandler', fastify.authorize(['ADMIN']));

    protectedRoutes.get('/', {
      schema: {
        tags: ['age-group'],
        summary: 'Get list of age groups',
        description: 'Returns paginated list of age groups',
        querystring: AgeGroupListSchema,
        response: {
          200: AgeGroupListResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const queryData = validateRequest(AgeGroupListDto, 'query')(request);

        const result = await ageGroupService.getAgeGroups(queryData);

        return ResponseHandler.success(reply, result, 'Age groups fetched successfully');
      }),
    });

    protectedRoutes.get('/:ageGroupId', {
      schema: {
        tags: ['age-group'],
        summary: 'Get age group by id',
        description: 'Returns details of an age group',
        params: AgeGroupParamsSchema,
        response: {
          200: AgeGroupGetByIdResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { ageGroupId } = validateRequest(AgeGroupIdParamDto, 'params')(request);
        const ageGroup = await ageGroupService.getAgeGroupById(ageGroupId);
        return ResponseHandler.success(reply, ageGroup, 'Age group fetched successfully');
      }),
    });

    protectedRoutes.post('/', {
      schema: {
        tags: ['age-group'],
        summary: 'Create a new age group',
        body: CreateAgeGroupBodySchema,
        response: {
          201: CreateAgeGroupResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const body = validateRequest(CreateAgeGroupDto, 'body')(request);
        const created = await ageGroupService.createAgeGroup(body);
        return ResponseHandler.success(reply, created, 'Age group created successfully');
      }),
    });

    protectedRoutes.put('/:ageGroupId', {
      schema: {
        tags: ['age-group'],
        summary: 'Update an age group',
        params: AgeGroupParamsSchema,
        body: UpdateAgeGroupBodySchema,
        response: {
          200: UpdateAgeGroupResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { ageGroupId } = validateRequest(AgeGroupIdParamDto, 'params')(request);
        const body = validateRequest(UpdateAgeGroupDto, 'body')(request);
        const updated = await ageGroupService.updateAgeGroup(ageGroupId, body);
        return ResponseHandler.success(reply, updated, 'Age group updated successfully');
      }),
    });

    protectedRoutes.delete('/:ageGroupId', {
      schema: {
        tags: ['age-group'],
        summary: 'Delete an age group',
        params: AgeGroupParamsSchema,
        response: {
          200: DeleteAgeGroupResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { ageGroupId } = validateRequest(AgeGroupIdParamDto, 'params')(request);
        await ageGroupService.deleteAgeGroup(ageGroupId);
        return ResponseHandler.success(reply, ageGroupId, 'Age group deleted successfully');
      }),
    });
  });
};

export default AgeGroupRoutes;
