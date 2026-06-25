import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define which routes need protection
  const isDashboardRoute = path.startsWith('/dashboard');
  
  // Check if the user has a valid ticket in their browser
  const hasToken = request.cookies.get('auth_token')?.value;

  // RULE 1: If they try to enter the dashboard without a ticket, kick them to login
  if (isDashboardRoute && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // RULE 2: If they already have a ticket and try to go to the login page, send them right into the dashboard
  if (path === '/login' && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Otherwise, let them pass
  return NextResponse.next();
}

// Tell Next.js exactly which paths this Bouncer should watch
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};