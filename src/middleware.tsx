import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { config as envConfig } from './config/configuration';
export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("_id");
  const path = request.url;
  const privatePaths = [`${envConfig.websiteUrl}/dashboard/cart`,
    `${envConfig.websiteUrl}/dashboard/orders`,
    `${envConfig.websiteUrl}/dashboard/profile`,
    `${envConfig.websiteUrl}/dashboard/setting`,
    `${envConfig.websiteUrl}/dashboard/wishlist`,
    `${envConfig.websiteUrl}/dashboard/notifications`
  ];
  const isPrivatePath = privatePaths.includes(path);
  if (isPrivatePath && !tokenCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/pages/:path*', '/dashboard/:path*'],
};