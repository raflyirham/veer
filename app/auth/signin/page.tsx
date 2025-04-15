"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { authenticate } from "@/app/actions/auth";
import toast from "react-hot-toast";

interface ResponseState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

const initialState: ResponseState = {
  success: false,
  message: null,
  errors: null,
};

export default function SignIn() {
  const [state, formAction, isLoading] = useActionState(
    authenticate,
    initialState
  );
  const [error, setError] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      return;
    }

    setError(state.errors);

    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex flex-row">
      <div className="w-1/2 bg-blue-500"></div>

      <div className="w-1/2 flex flex-col items-center justify-center px-10">
        <form
          action={formAction}
          className="flex flex-col gap-6 border-[1px] border-gray-200 px-6 py-8 rounded-md shadow-md min-w-[600px] max-w-full"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-black">Welcome Back!</h1>
            <p className="text-gray-500 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border-[1px] border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-sm duration-300"
            />

            {error?.email && (
              <div className="text-red-500 text-sm">
                {error.email.map((error) => (
                  <span key={error}>{error}</span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border-[1px] border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-sm duration-300"
            />

            {error?.password && (
              <div className="text-red-500 text-sm">
                {error.password.map((error) => (
                  <span key={error}>{error}</span>
                ))}
              </div>
            )}
          </div>

          <button
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 active:bg-blue-600 duration-300 text-sm font-medium w-full cursor-pointer"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <Link
            href="/auth/signup"
            className="text-sm text-gray-500 hover:text-gray-700 duration-300 cursor-pointer"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
