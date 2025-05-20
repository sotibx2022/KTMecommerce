import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { config as envConfig } from './config/configuration';
export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('_id');
  const path = request.nextUrl.pathname; // Use `nextUrl.pathname` to get the path
  const privatePaths = [
    `${envConfig.websiteUrl}/dashboard/cart`,
    `${envConfig.websiteUrl}/dashboard/cartProcess`,
    `${envConfig.websiteUrl}/dashboard/orders`,
    `${envConfig.websiteUrl}/dashboard/profile`,
    `${envConfig.websiteUrl}/dashboard/setting`,
    `${envConfig.websiteUrl}/dashboard/wishlist`,
    `${envConfig.websiteUrl}/dashboard/notifications`,
    `${envConfig.websiteUrl}/pages/cart`,
    `${envConfig.websiteUrl}/pages/wishlist`,
  ];
  const isPrivatePath = privatePaths.includes(path);
  // Handle CORS for /api/... routes
  if (path.startsWith('/api')) {
    const response = NextResponse.next();
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your frontend URL)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    // Handle preflight requests (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: response.headers });
    }
    return response;
  }
  // Handle private paths
  if (isPrivatePath && !tokenCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/pages/:path*', '/dashboard/:path*', '/api/:path*'], // Include /api/:path* in the matcher
};