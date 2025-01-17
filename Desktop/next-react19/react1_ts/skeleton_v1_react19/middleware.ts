import { NextResponse } from "next/server";
import { auth } from "./lib/auth/options";

const protectedRoutes = ["/dashboard", "/profile"]; // Define your protected routes

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // Ensure logged-in users see `/` as the default page (Dashboard Content)
  if (isLoggedIn && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  // Match all routes except static assets and APIs
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
