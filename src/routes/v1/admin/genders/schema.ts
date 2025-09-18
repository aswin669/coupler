import { SuccessSchema } from '@schemas/Success';

export const GenderListSchema = {
  type: 'object',
  properties: {
    page: { type: 'string', examples: ['1'] },
    limit: { type: 'string', examples: ['10'] },
    search: { type: 'string' },
  },
  required: [],
};

export const GenderListResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        genders: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              gender: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              deletedAt: { type: ['string', 'null'], format: 'date-time' },
            },
            required: ['id', 'gender', 'createdAt', 'updatedAt'],
          },
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
        totalPages: { type: 'integer' },
      },
      required: ['genders', 'total', 'page', 'limit', 'totalPages'],
    },
  },
};

export const GenderParamsSchema = {
  type: 'object',
  properties: {
    genderId: {
      type: 'string',
      description: 'Unique identifier of the gender',
    },
  },
  required: ['genderId'],
  additionalProperties: false,
  description: 'Schema for get by gender id',
};

export const GenderGetByIdResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique identifier for the gender' },
        gender: { type: 'string', description: 'Name of the gender' },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the gender record was created',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the gender record was last updated',
        },
        deletedAt: {
          type: ['string', 'null'],
          format: 'date-time',
          description: 'Date and time when the gender record was deleted, if applicable',
        },
      },
      required: ['id', 'gender', 'createdAt', 'updatedAt'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for fetching a gender by its unique identifier',
};

export const CreateGenderBodySchema = {
  type: 'object',
  properties: {
    gender: {
      type: 'string',
      description: 'Name of the gender',
    },
  },
  required: ['gender'],
  additionalProperties: false,
  description: 'Schema for creating a new gender',
};

export const CreateGenderResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the created gender',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for creating a new gender',
};

export const UpdateGenderBodySchema = {
  type: 'object',
  properties: {
    gender: {
      type: 'string',
      description: 'Name of the gender',
    },
    deletedAt: {
      type: ['string', 'null'],
      format: 'date-time',
      description: 'Date and time when the gender record was deleted, if applicable',
    },
  },
  required: [],
  additionalProperties: false,
  description: 'Schema for updating a gender',
};

export const UpdateGenderResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the updated gender',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for updating a gender',
};

export const DeleteGenderResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {},
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for deleting a gender',
};
