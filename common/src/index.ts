import { z } from "zod";

export const signupValidations = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signinValidations = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const profileValidations = z.object({
  dob: z.string(),
  phoneNumber: z.number(),
  address: z.string()
});

export const createBlog = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
});

export type ProfileValidations = z.infer<typeof profileValidations>;
export type SigninValidations = z.infer<typeof signinValidations>;
export type SignupValidations = z.infer<typeof signupValidations>;
export type CreateBlog = z.infer<typeof createBlog>;
