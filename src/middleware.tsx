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
  console.log("Private path at zero index is:",privatePaths[0])
  console.log('Current URL:', path); // Log the current URL
  const isPrivatePath = privatePaths.includes(path);
  console.log('Is private path:', isPrivatePath); // Log the private path check result
  if (isPrivatePath && !tokenCookie) {
    console.log('Redirecting to / due to missing token'); // Log the redirection reason
    return NextResponse.redirect(new URL('/', request.url));
  }
  console.log('Request allowed to proceed'); // Log if the request is allowed
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/pages/:path*', '/dashboard/:path*'],
};