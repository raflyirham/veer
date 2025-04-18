"use server";

import { CustomAuthError, signIn, signOut } from "@/auth";
import db from "@/libs/db";
import { signUpSchema } from "@/schemas/user";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface ResponseState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export async function authenticate(
  prevState: ResponseState,
  formData: FormData
): Promise<ResponseState> {
  try {
    const { email, password } = Object.fromEntries(formData);
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
    return { success: true, message: "Signed in successfully", errors: null };
  } catch (error) {
    console.error("Sign in error:", error);

    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof CustomAuthError) {
      const err = JSON.parse(error.message);
      return { success: false, message: err.message, errors: err.errors };
    }

    return {
      success: false,
      message: `An error occurred during sign in: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      errors: null,
    };
  }
}

export async function signUp(
  prevState: ResponseState,
  formData: FormData
): Promise<ResponseState> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");
    const fullName = formData.get("fullName");

    const validatedFields = signUpSchema.safeParse({
      email,
      password,
      passwordConfirmation,
      fullName,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "ERROR: Invalid fields!",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const isEmailExists = await db.user.findUnique({
      where: { email: email as string },
    });

    if (isEmailExists) {
      return {
        success: false,
        message: "ERROR: Email already exists!",
        errors: {
          email: ["Email already exists"],
        },
      };
    }

    if (password !== passwordConfirmation) {
      return {
        success: false,
        message: "ERROR: Password and confirm password do not match!",
        errors: {
          password: ["Password and confirm password do not match"],
          passwordConfirmation: ["Password and confirm password do not match"],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await db.user.create({
      data: {
        email: email as string,
        password: hashedPassword,
        fullName: fullName as string,
      },
    });

    return { success: true, message: "Signed up successfully", errors: null };
  } catch {
    return {
      success: false,
      message: "ERROR: An error occurred during sign up",
      errors: null,
    };
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/auth/signin" });
    return { success: true, message: "Logged out successfully", errors: null };
  } catch (error) {
    console.error("Logout error:", error);

    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: `An error occurred during logout: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      errors: null,
    };
  }
}
