import { z } from 'zod';

export const postSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type postSchema=z.infer<typeof postSchema>


export const userSchema = z.object({
    email: z.string(),
    password: z.string(),
    name:z.string(),
});

export type userSchema=z.infer<typeof userSchema>




