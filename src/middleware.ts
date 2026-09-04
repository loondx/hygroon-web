import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Host canonicalization and redirect middleware.
 * Ensures www.hygroon.com performs a permanent 301 redirect to canonical hygroon.com.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  if (host.startsWith('www.')) {
    const canonicalHost = host.replace(/^www\./, '');
    const url = request.nextUrl.clone();
    url.hostname = canonicalHost;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
