import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

// export { auth as middleware } from "@/auth";

const publicRoutes = ["/auth/signin", "/auth/signup"];
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const isLoggedIn = await auth();

  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

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
