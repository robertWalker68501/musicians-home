import * as z from 'zod';

export const SignUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name cannot exceed 30 characters'),
    email: z.email(),
    username: z
      .string()
      .trim()
      .min(4, 'Username must be at least 4 characters long')
      .max(20, 'Username cannot exceed 20 characters')
      .optional()
      .or(z.literal('')),
    image: z.string().optional(),
    bio: z.string().optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(26, 'Password cannot exceed 26 characters'),
    confirmPassword: z.string(),
    callbackURL: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
