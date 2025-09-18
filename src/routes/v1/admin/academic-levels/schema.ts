import { SuccessSchema } from '@schemas/Success';

export const AcademicLevelListSchema = {
  type: 'object',
  properties: {
    page: { type: 'string', examples: ['1'] },
    limit: { type: 'string', examples: ['10'] },
    search: { type: 'string' },
  },
  required: [],
};
export const AcademicLevelListResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        academicLevels: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              academicLevels: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              deletedAt: { type: ['string', 'null'], format: 'date-time' },
            },
            required: ['id', 'academicLevels', 'createdAt', 'updatedAt'],
          },
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
        totalPages: { type: 'integer' },
      },
      required: ['academicLevels', 'total', 'page', 'limit', 'totalPages'],
    },
  },
};

export const AcademicLevelParamsSchema = {
  type: 'object',
  properties: {
    academicLevelId: {
      type: 'string',
      description: 'Unique identifier of the academic level',
    },
  },
  required: ['academicLevelId'],
  additionalProperties: false,
  description: 'Schema for get by academic level id',
};
export const AcademicLevelGetIdResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique identifier for the academic level' },
        academicLevels: { type: 'string', description: 'Name of the academic level' },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the academic level record was created',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the academic level record was last updated',
        },
        deletedAt: {
          type: ['string', 'null'],
          format: 'date-time',
          description: 'Date and time when the academic level record was deleted, if applicable',
        },
      },
      required: ['id', 'academicLevels', 'createdAt', 'updatedAt'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for fetching a academic level by its unique identifier',
};
export const CreateAcademicLevelBodySchema = {
  type: 'object',
  properties: {
    academicLevels: {
      type: 'string',
      description: 'Name of the academic level',
    },
  },
  required: ['academicLevel'],
  additionalProperties: false,
  description: 'Schema for creating a new academic level',
};

export const CreateAcademicLevelResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the created academic level',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for creating a new academic level',
};
export const UpdateAcademicLevelBodySchema = {
  type: 'object',
  properties: {
    academicLevels: {
      type: 'string',
      description: 'Name of the academic Levels',
    },
    deletedAt: {
      type: ['string', 'null'],
      format: 'date-time',
      description: 'Date and time when the academic Levels record was deleted, if applicable',
    },
  },
  required: [],
  additionalProperties: false,
  description: 'Schema for updating a academic Levels',
};
export const UpdateAcademicLevelResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the updated academic level',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for updating a academic level',
};
export const DeletAcademicLevelResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {},
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for deleting a academic level',
};
 