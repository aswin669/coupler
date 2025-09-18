import { paginationQuerySchema } from '@utils';
import { z } from 'zod';

export const CreateGenderDto = z.object({
  gender: z.string().min(1, 'Gender must not be empty').max(50, 'Gender must be at most 50 characters'),
});

export type CreateGenderInput = z.infer<typeof CreateGenderDto>;

export const UpdateGenderDto = z.object({
  gender: z.string().min(1, 'Gender must not be empty').max(50, 'Gender must be at most 50 characters').optional(),
});

export type UpdateGenderInput = z.infer<typeof UpdateGenderDto>;

export const GenderListDto = z.object({
  ...paginationQuerySchema,
  search: z.string().optional(),
});

export type GenderListInput = z.infer<typeof GenderListDto>;

export const GenderIdParamDto = z.object({
  genderId: z.string().cuid2(),
});
