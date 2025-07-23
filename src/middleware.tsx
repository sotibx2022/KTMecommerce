import { NextRequest, NextResponse } from "next/server";
import {
  handleAdminRoutes,
  handleAPIPath,
  handleDashboardRoutes
} from "./app/services/middlewareFunctions/middlewareFunctions";
export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const isAdminPath = path.startsWith('/admin');
    const isdashboardPath = path.startsWith('/dashboard');
    const isApiPath = path.startsWith('/api');
    if (isApiPath) {
      const apiResponse = handleAPIPath(path, request);
      if (apiResponse) {
        return apiResponse;
      }
    }
    if (isAdminPath) {
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
    return NextResponse.next(); // default case
  } catch (error) {
    return NextResponse.next();
  }
}
export const config = {
  matcher: ['/', '/pages/:path*', '/dashboard', '/dashboard/:path*', '/api/:path*', '/admin', '/admin/:path*'],
};
