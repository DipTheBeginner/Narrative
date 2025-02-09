import { z } from 'zod';

export const postSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type postSchema=z.infer<typeof postSchema>


export const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
    name:z.string(),
});



export type signupSchema=z.infer<typeof signupSchema>


export const  signinSchema=z.object({
    email:z.string(),
    password:z.string(),
})

export type signinSchema=z.infer<typeof signinSchema>




