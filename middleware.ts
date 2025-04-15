import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

// export { auth as middleware } from "@/auth";

const publicRoutes = ["/auth/signin", "/auth/signup"];
const protectedRoutes = ["/dashboard/**"];

export async function middleware(request: NextRequest) {
  const isLoggedIn = await auth();

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
