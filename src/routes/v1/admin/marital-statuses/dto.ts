import { paginationQuerySchema } from '@utils';
import { z } from 'zod';

export const CreateMaritalStatusDto = z.object({
  maritalStatus: z
    .string()
    .min(1, 'Marital status must not be empty')
    .max(50, 'Marital status must be at most 50 characters'),
});

export type CreateMaritalStatusInput = z.infer<typeof CreateMaritalStatusDto>;

export const UpdateMaritalStatusDto = z.object({
  maritalStatus: z
    .string()
    .min(1, 'Marital status must not be empty')
    .max(50, 'Marital status must be at most 50 characters')
    .optional(),
});

export type UpdateMaritalStatusInput = z.infer<typeof UpdateMaritalStatusDto>;

export const MaritalStatusListDto = z.object({
  ...paginationQuerySchema,
  search: z.string().optional(),
});

export type MaritalStatusListInput = z.infer<typeof MaritalStatusListDto>;

export const MaritalStatusIdParamDto = z.object({
  maritalStatusId: z.string().cuid2(),
});
