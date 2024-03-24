import { z } from "zod";

export const signupValidations = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(16),
    confirmPassword: z.string().min(8).max(16),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signinValidations = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export const profileValidations = z.object({
  dob: z.string(),
  phoneNumber: z.number().min(10).max(10),
  address: z.string().min(10)
});

export const createBlog = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    published: z.boolean(),
});

export type ProfileValidations = z.infer<typeof profileValidations>;
export type SigninValidations = z.infer<typeof signinValidations>;
export type SignupValidations = z.infer<typeof signupValidations>;
export type CreateBlog = z.infer<typeof createBlog>;
