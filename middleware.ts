import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const role = request.cookies.get("user-role")?.value

  // Allow public routes
  if (pathname === "/" || pathname === "/login" || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  // Protect portal routes
  if (pathname.startsWith("/portal")) {
    if (!role) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/portal/:path*"],
}
