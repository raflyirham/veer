import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});

const signUpSchema = signInSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters"),
  fullName: z.string().min(1, "Full name is required"),
});

export { signInSchema, signUpSchema };
export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
