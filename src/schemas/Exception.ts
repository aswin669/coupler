import { ErrorType } from '@constants';

export const ExceptionSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['success', 'error', 'pending'],
    },
    code: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
    error: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: Object.values(ErrorType),
        },
        details: {
          oneOf: [
            {
              type: 'object',
              properties: {
                field: { type: 'string', nullable: true },
                message: { type: 'string', nullable: true },
              },
              required: [],
            },
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', nullable: true },
                  message: { type: 'string', nullable: true },
                },
                required: [],
              },
            },
            {
              type: 'null',
            },
          ],
        },
      },
      required: ['type'],
    },
  },
  required: ['status', 'code', 'message', 'error'],
};
