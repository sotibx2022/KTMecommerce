import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getUserIdFromCookies } from './app/api/auth/authFunctions/getUserIdFromCookies';
const ALLOWED_ORIGINS = [
  'https://ecommercektm.vercel.app/',
  'http://localhost:3000', 
];
export async function middleware(request: NextRequest) {
  const userId = await getUserIdFromCookies(request)
  const path = request.nextUrl.pathname;
  const origin = request.headers.get('origin') || '';
  const privatePaths = [
    `/dashboard/cart`,
    `/dashboard/cartProcess`,
    `/dashboard/orders`,
    `/dashboard/profile`,
    `/dashboard/setting`,
    `/dashboard/wishlist`,
    `/dashboard/notifications`,
    `/pages/cart`,
    `/pages/wishlist`,
  ];
  const isPrivatePath = privatePaths.includes(path);
  // Handle API routes with proper CORS
  if (path.startsWith('/api')) {
    const response = NextResponse.next();
    // Set CORS headers only for allowed origins
    if (ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
    response.headers.set('Access-Control-Expose-Headers', 'Set-Cookie');
    response.headers.set('Vary', 'Origin');
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: 204, 
        headers: response.headers 
      });
    }
    return response;
  }
  // Handle private paths
  if (isPrivatePath && !userId) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/pages/:path*', '/dashboard/:path*', '/api/:path*'],
};