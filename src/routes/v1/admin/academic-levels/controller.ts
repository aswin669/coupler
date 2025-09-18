// src/routes/v1/admin/academic-levels/controller.ts
import { ResponseHandler, catchAsync, validateRequest } from '@utils';
import { FastifyPluginAsync } from 'fastify';

import { AcademicLevelIdParamDto, AcademicLevelListDto, CreateAcademicLevelDto, UpdateAcademicLevelDto } from './dto';
import {
  AcademicLevelGetIdResponseSchema,
  AcademicLevelListResponseSchema,
  AcademicLevelListSchema,
  AcademicLevelParamsSchema,
  CreateAcademicLevelBodySchema,
  CreateAcademicLevelResponseSchema,
  DeletAcademicLevelResponseSchema,
  UpdateAcademicLevelBodySchema,
  UpdateAcademicLevelResponseSchema,
} from './schema';

const AcademicLevelRoutes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const academicLevelService = fastify.di?.academicLevelService;

  fastify.register(async (protectedRoutes) => {
    protectedRoutes.addHook('preHandler', fastify.authenticate);
    protectedRoutes.addHook('preHandler', fastify.authorize(['ADMIN']));

    protectedRoutes.get('/', {
      schema: {
        tags: ['academic-level'],
        summary: 'Get list of academic levels',
        description: 'Returns paginated list of academic levels',
        querystring: AcademicLevelListSchema,
        response: {
          200: AcademicLevelListResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const queryData = validateRequest(AcademicLevelListDto, 'query')(request);
        const result = await academicLevelService.getAcademicLevels(queryData);
        return ResponseHandler.success(reply, result, 'Academic levels fetched successfully');
      }),
    });

    protectedRoutes.get('/:academicLevelId', {
      schema: {
        tags: ['academic-level'],
        summary: 'Get academic level by id',
        description: 'Returns details of an academic level',
        params: AcademicLevelParamsSchema,
        response: {
          200: AcademicLevelGetIdResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { academicLevelId } = validateRequest(AcademicLevelIdParamDto, 'params')(request);
        const level = await academicLevelService.getAcademicLevelById(academicLevelId);
        return ResponseHandler.success(reply, level, 'Academic level fetched successfully');
      }),
    });

    protectedRoutes.post('/', {
      schema: {
        tags: ['academic-level'],
        summary: 'Create a new academic level',
        body: CreateAcademicLevelBodySchema,
        response: {
          201: CreateAcademicLevelResponseSchema,
          400: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const body = validateRequest(CreateAcademicLevelDto, 'body')(request);
        const created = await academicLevelService.createAcademicLevel(body);
        return ResponseHandler.success(reply, created, 'Academic level created successfully');
      }),
    });

    protectedRoutes.put('/:academicLevelId', {
      schema: {
        tags: ['academic-level'],
        summary: 'Update an academic level',
        params: AcademicLevelParamsSchema,
        body: UpdateAcademicLevelBodySchema,
        response: {
          200: UpdateAcademicLevelResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { academicLevelId } = validateRequest(AcademicLevelIdParamDto, 'params')(request);
        const body = validateRequest(UpdateAcademicLevelDto, 'body')(request);
        const updated = await academicLevelService.updateAcademicLevel(academicLevelId, body);
        return ResponseHandler.success(reply, updated, 'Academic level updated successfully');
      }),
    });

    protectedRoutes.delete('/:academicLevelId', {
      schema: {
        tags: ['academic-level'],
        summary: 'Delete an academic level',
        params: AcademicLevelParamsSchema,
        response: {
          200: DeletAcademicLevelResponseSchema,
          400: { $ref: 'Exception#' },
          404: { $ref: 'Exception#' },
          500: { $ref: 'Exception#' },
        },
      },
      handler: catchAsync(async (request, reply) => {
        const { academicLevelId } = validateRequest(AcademicLevelIdParamDto, 'params')(request);
        await academicLevelService.deleteAcademicLevel(academicLevelId);
        return ResponseHandler.success(reply, academicLevelId, 'Academic level deleted successfully');
      }),
    });
  });
};

export default AcademicLevelRoutes;
