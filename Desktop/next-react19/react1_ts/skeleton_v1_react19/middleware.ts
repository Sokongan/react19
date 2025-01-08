
import { NextResponse } from "next/server"
import { auth } from "./lib/auth/options"

const protectedRoutes = ["/dashboard", "/suggestions"] // Define your protected routes

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname)

  // If user is not logged in and trying to access a protected route or any route other than '/login'
  if (!isLoggedIn && req.nextUrl.pathname !== "/login") {
    const loginUrl = new URL("/login", req.nextUrl.origin)
    return NextResponse.redirect(loginUrl)
  }

  // If the user tries to access a protected route but is not logged in, redirect them to '/'
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin))
  }

  // Allow the request to continue
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Match all routes except api, static assets, and images
}
