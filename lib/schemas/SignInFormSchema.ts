import * as z from 'zod';

const usernamePattern = /^[a-zA-Z0-9_]{3,30}$/;

export const SignInFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Email or username is required')
    .refine(
      (value) => z.email().safeParse(value).success || usernamePattern.test(value),
      'Enter a valid email or username'
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(26, 'Password cannot exceed 26 characters'),
  callbackURL: z.string().optional(),
});
