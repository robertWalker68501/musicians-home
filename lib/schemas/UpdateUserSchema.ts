import * as z from 'zod';

export const UpdateUserSchema = z.object({
  image: z.string().optional(),
  bio: z.string().optional(),
});
