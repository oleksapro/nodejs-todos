import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(10, { message: "Password must be at least 10 characters long" }),
});

export type RegisterPayload = z.infer<typeof registerSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim(),
});

export type SignInPayload = z.infer<typeof signInSchema>;
