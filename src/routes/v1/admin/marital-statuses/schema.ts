import { SuccessSchema } from '@schemas/Success';

export const MaritalStatusListSchema = {
  type: 'object',
  properties: {
    page: { type: 'string', examples: ['1'] },
    limit: { type: 'string', examples: ['10'] },
    search: { type: 'string' },
  },
  required: [],
};

export const MaritalStatusListResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        maritalStatuses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              maritalStatus: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              deletedAt: { type: ['string', 'null'], format: 'date-time' },
            },
            required: ['id', 'maritalStatus', 'createdAt', 'updatedAt'],
          },
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
        totalPages: { type: 'integer' },
      },
      required: ['maritalStatuses', 'total', 'page', 'limit', 'totalPages'],
    },
  },
};

export const MaritalStatusParamsSchema = {
  type: 'object',
  properties: {
    maritalStatusId: {
      type: 'string',
      description: 'Unique identifier of the marital status',
    },
  },
  required: ['maritalStatusId'],
  additionalProperties: false,
  description: 'Schema for get by marital status id',
};

export const MaritalStatusGetByIdResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique identifier for the marital status' },
        maritalStatus: { type: 'string', description: 'Name of the marital status' },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the marital status record was created',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the marital status record was last updated',
        },
        deletedAt: {
          type: ['string', 'null'],
          format: 'date-time',
          description: 'Date and time when the marital status record was deleted, if applicable',
        },
      },
      required: ['id', 'maritalStatus', 'createdAt', 'updatedAt'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for fetching a marital status by its unique identifier',
};

export const CreateMaritalStatusBodySchema = {
  type: 'object',
  properties: {
    maritalStatus: {
      type: 'string',
      description: 'Name of the marital status',
    },
  },
  required: ['maritalStatus'],
  additionalProperties: false,
  description: 'Schema for creating a new marital status',
};

export const CreateMaritalStatusResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the created marital status',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for creating a new marital status',
};

export const UpdateMaritalStatusBodySchema = {
  type: 'object',
  properties: {
    maritalStatus: {
      type: 'string',
      description: 'Name of the marital status',
    },
    deletedAt: {
      type: ['string', 'null'],
      format: 'date-time',
      description: 'Date and time when the marital status record was deleted, if applicable',
    },
  },
  required: [],
  additionalProperties: false,
  description: 'Schema for updating a marital status',
};

export const UpdateMaritalStatusResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the updated marital status',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for updating a marital status',
};

export const DeleteMaritalStatusResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {},
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for deleting a marital status',
};
