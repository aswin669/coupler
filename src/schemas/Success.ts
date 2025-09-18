export const SuccessSchema = {
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
  },
};
