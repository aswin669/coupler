import { SuccessSchema } from '@schemas/Success';

export const AgeGroupListSchema = {
  type: 'object',
  properties: {
    page: { type: 'string', examples: ['1'] },
    limit: { type: 'string', examples: ['10'] },
    search: { type: 'string' },
  },
  required: [],
};

export const AgeGroupListResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        ageGroups: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              fromAge: { type: 'integer' },
              toAge: { type: 'integer' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              deletedAt: { type: ['string', 'null'], format: 'date-time' },
            },
            required: ['id', 'fromAge', 'toAge', 'createdAt', 'updatedAt'],
          },
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
        totalPages: { type: 'integer' },
      },
      required: ['ageGroups', 'total', 'page', 'limit', 'totalPages'],
    },
  },
};

export const AgeGroupParamsSchema = {
  type: 'object',
  properties: {
    ageGroupId: {
      type: 'string',
      description: 'Unique identifier of the age group',
    },
  },
  required: ['ageGroupId'],
  additionalProperties: false,
  description: 'Schema for get by age group id',
};

export const AgeGroupGetByIdResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique identifier for the age group' },
        fromAge: { type: 'integer', description: 'Starting age of the group' },
        toAge: { type: 'integer', description: 'Ending age of the group' },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the age group record was created',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date and time when the age group record was last updated',
        },
        deletedAt: {
          type: ['string', 'null'],
          format: 'date-time',
          description: 'Date and time when the age group record was deleted, if applicable',
        },
      },
      required: ['id', 'fromAge', 'toAge', 'createdAt', 'updatedAt'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for fetching an age group by its unique identifier',
};

export const CreateAgeGroupBodySchema = {
  type: 'object',
  properties: {
    fromAge: {
      type: 'integer',
      description: 'Starting age of the group',
      minimum: 0,
      maximum: 150,
    },
    toAge: {
      type: 'integer',
      description: 'Ending age of the group',
      minimum: 0,
      maximum: 150,
    },
  },
  required: ['fromAge', 'toAge'],
  additionalProperties: false,
  description: 'Schema for creating a new age group',
};

export const CreateAgeGroupResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the created age group',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for creating a new age group',
};

export const UpdateAgeGroupBodySchema = {
  type: 'object',
  properties: {
    fromAge: {
      type: 'integer',
      description: 'Starting age of the group',
      minimum: 0,
      maximum: 150,
    },
    toAge: {
      type: 'integer',
      description: 'Ending age of the group',
      minimum: 0,
      maximum: 150,
    },
    deletedAt: {
      type: ['string', 'null'],
      format: 'date-time',
      description: 'Date and time when the age group record was deleted, if applicable',
    },
  },
  required: [],
  additionalProperties: false,
  description: 'Schema for updating an age group',
};

export const UpdateAgeGroupResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the updated age group',
        },
      },
      required: ['id'],
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for updating an age group',
};

export const DeleteAgeGroupResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {},
    },
  },
  required: ['status', 'message', 'data'],
  description: 'Response schema for deleting an age group',
};
