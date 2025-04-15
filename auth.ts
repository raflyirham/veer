import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./libs/db";
import { SignInSchema, signInSchema } from "./schemas/user";
import bcrypt from "bcryptjs";

export class CustomAuthError extends CredentialsSignin {
  constructor(message: string) {
    super();
    this.message = message;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomAuthError(
            JSON.stringify({
              status: "error",
              message: "ERROR: Missing credentials!",
              errors: {
                email: ["Email is required"],
                password: ["Password is required"],
              },
            })
          );
        }

        const validatedFields = signInSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });
        if (!validatedFields.success) {
          throw new CustomAuthError(
            JSON.stringify({
              status: "error",
              message: "ERROR: Invalid credentials!",
              errors: validatedFields.error.flatten().fieldErrors,
            })
          );
        }

        const { email, password } = validatedFields.data;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new CustomAuthError(
            JSON.stringify({
              status: "error",
              message: "ERROR: Invalid credentials!",
              errors: {
                email: ["Email or password is incorrect"],
                password: ["Email or password is incorrect"],
              },
            })
          );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new CustomAuthError(
            JSON.stringify({
              status: "error",
              message: "ERROR: Invalid credentials!",
              errors: {
                email: ["Email or password is incorrect"],
                password: ["Email or password is incorrect"],
              },
            })
          );
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    async redirect(params) {
      if (params.url === "/auth/signin") {
        return "/auth/signin";
      }
      return "/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
