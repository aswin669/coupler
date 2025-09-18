import { ValidationError } from '@domain/errors';
import { FastifyRequest } from 'fastify';
import { ZodSchema } from 'zod';

export const validateRequest =
  <T>(schema: ZodSchema<T>, source: 'body' | 'query' | 'params' = 'body') =>
  (request: FastifyRequest): T => {
    const result = schema.safeParse(request[source]);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
    return result.data;
  };

export function validateData<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(result.error.issues);
  }
  return result.data;
}
