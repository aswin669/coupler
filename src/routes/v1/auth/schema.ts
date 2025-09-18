import { SuccessSchema } from '@schemas';

export const loginRequestSchema = {
  type: 'object',
  required: ['mobileNumber', 'password'],
  properties: {
    mobileNumber: {
      type: 'string',
      examples: ['+918080808080'],
      description: 'User mobile number with country code',
    },
    password: {
      type: 'string',
      examples: ['000000'],
      minLength: 6,
      description: 'Password of the user',
    },
  },
};

export const loginResponseSchema = {
  type: 'object',
  properties: {
    ...SuccessSchema.properties,
    data: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        accessToken: { type: 'string' },
        expiresIn: { type: 'integer', description: 'Token expiry in seconds' },
      },
    },
  },
  headers: {
    'Set-Cookie': {
      schema: {
        type: 'string',
        example: 'refreshToken=abc123; HttpOnly; Path=/auth/refresh',
      },
      description:
        'Refreshes access token using the refreshToken cookie. The cookie is set during login or token refresh and must be included in the request.',
    },
  },
};
