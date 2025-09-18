import { paginationQuerySchema } from '@utils';
import { z } from 'zod';

export const CreateAgeGroupDto = z
  .object({
    fromAge: z
      .number()
      .int('From age must be an integer')
      .min(0, 'From age must be at least 0')
      .max(150, 'From age must be at most 150'),
    toAge: z
      .number()
      .int('To age must be an integer')
      .min(0, 'To age must be at least 0')
      .max(150, 'To age must be at most 150'),
  })
  .refine((data) => data.fromAge <= data.toAge, {
    message: 'From age must be less than or equal to to age',
    path: ['toAge'],
  });

export type CreateAgeGroupInput = z.infer<typeof CreateAgeGroupDto>;

export const UpdateAgeGroupDto = z
  .object({
    fromAge: z
      .number()
      .int('From age must be an integer')
      .min(0, 'From age must be at least 0')
      .max(150, 'From age must be at most 150')
      .optional(),
    toAge: z
      .number()
      .int('To age must be an integer')
      .min(0, 'To age must be at least 0')
      .max(150, 'To age must be at most 150')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.fromAge !== undefined && data.toAge !== undefined) {
        return data.fromAge <= data.toAge;
      }
      return true;
    },
    {
      message: 'From age must be less than or equal to to age',
      path: ['toAge'],
    },
  );

export type UpdateAgeGroupInput = z.infer<typeof UpdateAgeGroupDto>;

export const AgeGroupListDto = z.object({
  ...paginationQuerySchema,
  search: z.string().optional(),
});

export type AgeGroupListInput = z.infer<typeof AgeGroupListDto>;

export const AgeGroupIdParamDto = z.object({
  ageGroupId: z.string().cuid2(),
});
