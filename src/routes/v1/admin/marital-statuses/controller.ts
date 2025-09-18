import { ResponseHandler, catchAsync, validateRequest } from '@utils';
import { FastifyPluginAsync } from 'fastify';

import { CreateMaritalStatusDto, MaritalStatusIdParamDto, MaritalStatusListDto, UpdateMaritalStatusDto } from './dto';
import {
  CreateMaritalStatusBodySchema,
  CreateMaritalStatusResponseSchema,
  DeleteMaritalStatusResponseSchema,
  MaritalStatusGetByIdResponseSchema,
  MaritalStatusListResponseSchema,
  MaritalStatusListSchema,
  MaritalStatusParamsSchema,
  UpdateMaritalStatusBodySchema,
  UpdateMaritalStatusResponseSchema,
} from './schema';

const MaritalStatusRoutes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const maritalStatusService = fastify.di.maritalStatusService;

  fastify.register(async (protectedRoutes) => {
    protectedRoutes.addHook('preHandler', fastify.authenticate);
    protectedRoutes.addHook('preHandler', fastify.authorize(['ADMIN']));

    protectedRoutes.get('/', {
      schema: {
        tags: ['marital-status'],
        summary: 'Get list of marital statuses',
        description: 'Returns paginated list of marital statuses',
        querystring: MaritalStatusListSchema,
        response: {
          200: MaritalStatusListResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const queryData = validateRequest(MaritalStatusListDto, 'query')(request);

        const result = await maritalStatusService.getMaritalStatuses(queryData);

        return ResponseHandler.success(reply, result, 'Marital statuses fetched successfully');
      }),
    });

    protectedRoutes.get('/:maritalStatusId', {
      schema: {
        tags: ['marital-status'],
        summary: 'Get marital status by id',
        description: 'Returns details of a marital status',
        params: MaritalStatusParamsSchema,
        response: {
          200: MaritalStatusGetByIdResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { maritalStatusId } = validateRequest(MaritalStatusIdParamDto, 'params')(request);
        const maritalStatus = await maritalStatusService.getMaritalStatusById(maritalStatusId);
        return ResponseHandler.success(reply, maritalStatus, 'Marital status fetched successfully');
      }),
    });

    protectedRoutes.post('/', {
      schema: {
        tags: ['marital-status'],
        summary: 'Create a new marital status',
        body: CreateMaritalStatusBodySchema,
        response: {
          201: CreateMaritalStatusResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const body = validateRequest(CreateMaritalStatusDto, 'body')(request);
        const created = await maritalStatusService.createMaritalStatus(body);
        return ResponseHandler.success(reply, created, 'Marital status created successfully');
      }),
    });

    protectedRoutes.put('/:maritalStatusId', {
      schema: {
        tags: ['marital-status'],
        summary: 'Update a marital status',
        params: MaritalStatusParamsSchema,
        body: UpdateMaritalStatusBodySchema,
        response: {
          200: UpdateMaritalStatusResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { maritalStatusId } = validateRequest(MaritalStatusIdParamDto, 'params')(request);
        const body = validateRequest(UpdateMaritalStatusDto, 'body')(request);
        const updated = await maritalStatusService.updateMaritalStatus(maritalStatusId, body);
        return ResponseHandler.success(reply, updated, 'Marital status updated successfully');
      }),
    });

    protectedRoutes.delete('/:maritalStatusId', {
      schema: {
        tags: ['marital-status'],
        summary: 'Delete a marital status',
        params: MaritalStatusParamsSchema,
        response: {
          200: DeleteMaritalStatusResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { maritalStatusId } = validateRequest(MaritalStatusIdParamDto, 'params')(request);
        await maritalStatusService.deleteMaritalStatus(maritalStatusId);
        return ResponseHandler.success(reply, maritalStatusId, 'Marital status deleted successfully');
      }),
    });
  });
};

export default MaritalStatusRoutes;
