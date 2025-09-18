import { z } from 'zod';

export const LoginDto = z.object({
  mobileNumber: z.string().regex(/^\+[1-9]\d{0,3}[-\s]?\d{7,14}$/, 'Invalid mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof LoginDto>;
