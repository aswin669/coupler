import { paginationQuerySchema } from '@utils';
import { z } from 'zod';

export const CreateAcademicLevelDto = z.object({
  level: z.string().min(1, 'Level must not be empty').max(128, 'Level must be at most 128 characters'),
});

export type CreateAcademicLevelInput = z.infer<typeof CreateAcademicLevelDto>;

export const UpdateAcademicLevelDto = z.object({
  level: z.string().min(1, 'Level must not be empty').max(128, 'Level must be at most 128 characters').optional(),
});

export type UpdateAcademicLevelInput = z.infer<typeof UpdateAcademicLevelDto>;

export const AcademicLevelListDto = z.object({
  ...paginationQuerySchema,
  search: z.string().optional(),
});

export type academicLevelListInput = z.infer<typeof AcademicLevelListDto>;

export const AcademicLevelIdParamDto = z.object({
  academicLevelId: z.string().cuid2(),
});
 //