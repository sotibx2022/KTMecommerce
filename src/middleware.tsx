import { NextRequest, NextResponse } from "next/server";
import {
  handleAdminRoutes,
  handleAPIPath,
  handleDashboardRoutes,
} from "./app/services/middlewareFunctions/middlewareFunctions";
export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const isAdminPath = path.startsWith('/admin');
    const isdashboardPath = path.startsWith('/dashboard');
    const isApiPath = path.startsWith('/api');
    const isAdminCheckPath = path.includes('/validateAdmin');
    const isValidateAdminPath = path === '/pages/validateAdmin';
    const validAdminCookie = request.cookies.get('validAdmin')?.value;
    // Block /pages/validateAdmin if validAdmin cookie is true
    if (isValidateAdminPath && validAdminCookie === 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (isApiPath) {
      const apiResponse = handleAPIPath(path, request);
      if (apiResponse) {
        return apiResponse;
      }
    }
    if (isAdminPath || isAdminCheckPath) {
      const adminResponse = await handleAdminRoutes(path, request);
      if (adminResponse) {
        return adminResponse;
      }
    }
    if (isdashboardPath) {
      const dashboardResponse = await handleDashboardRoutes(path, request);
      if (dashboardResponse) {
        return dashboardResponse;
      }
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    '/',
    '/pages/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/api/:path*',
    '/admin',
    '/admin/:path*',
  ],
};
