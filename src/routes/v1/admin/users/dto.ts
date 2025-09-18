import { ProfileStatus, Role } from '@prisma/client';
import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email('Invalid email format'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.nativeEnum(Role),
  password: z.string(),
  mobileNumber: z.string().regex(/^\+[1-9]\d{0,3}[-\s]?\d{7,14}$/, 'Invalid mobile number'),
  dob: z.string().datetime(),
  gender: z.string(),
  profileStatus: z.nativeEnum(ProfileStatus).optional().default(ProfileStatus.UNDER_REVIEW),
});

export const UpdateUserDto = z.object({
  id: z.string().cuid2(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  emailVerified: z.boolean().optional(),
  role: z.nativeEnum(Role).optional(),
  password: z.string().optional(),
  mobileNumber: z
    .string()
    .regex(/^\+[1-9]\d{0,3}[-\s]?\d{7,14}$/, 'Invalid mobile number')
    .optional(),
  mobileNumberVerified: z.boolean().optional(),
  dob: z.string().date().optional(),
  profileStatus: z.nativeEnum(ProfileStatus).optional(),
});

// TypeScript type for service/controller
export type CreateUserInput = z.infer<typeof CreateUserDto>;
export type UpdateUserInput = z.infer<typeof UpdateUserDto>;
