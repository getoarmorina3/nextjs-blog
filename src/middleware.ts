import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  // If user is already logged in, redirect to the homepage
  if (token && req.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  // If user is not logged in, redirect to the sign-in page
  if (!token && req.nextUrl.pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }
}

// See "Matching Paths" below to learn more
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
  matcher: ['/dashboard', '/admin', '/sign-in'],
}