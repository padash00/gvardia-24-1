import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  // Public paths that don't require authentication
  if (request.nextUrl.pathname === "/login") {
    // If user is already authenticated, redirect to their dashboard
    if (token) {
      try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
        const role = payload.role as string
        return NextResponse.redirect(new URL(`/${role}-dashboard`, request.url))
      } catch (error) {
        console.error("Invalid token:", error)
      }
    }
    return NextResponse.next()
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    const role = payload.role as string

    // Check role-based access
    if (request.nextUrl.pathname.startsWith("/owner-dashboard") && role !== "owner") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/manager-dashboard") && role !== "manager") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/admin-dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Token verification failed:", error)
    // If token verification fails, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

