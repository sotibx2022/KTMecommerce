import { getUserIdFromCookies } from "@/app/api/auth/authFunctions/getUserIdFromCookies";
import { NextRequest, NextResponse } from "next/server";
const ALLOWED_ORIGINS = [
    'https://ecommercektm.vercel.app',
    'http://localhost:3000',
];
export const handleAPIPath = (path: string, request: NextRequest) => {
    if (path.startsWith('/api')) {
        const response = NextResponse.next();
        const origin = request.headers.get('origin') || '';
        if (ALLOWED_ORIGINS.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
            response.headers.set('Access-Control-Allow-Credentials', 'true');
        }
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
        response.headers.set('Access-Control-Expose-Headers', 'Set-Cookie');
        response.headers.set('Vary', 'Origin');
        if (request.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 204,
                headers: response.headers,
            });
        }
        return response;
    }
    return undefined;
};
export const handleDashboardRoutes = async (path: string, request: NextRequest) => {
    const userId = await getUserIdFromCookies(request);
    if (!userId) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
};
export const handleAdminRoutes = async (path: string, request: NextRequest) => {
    const validAdmin = request.cookies.get('validAdmin')?.value;
    const isValidateAdminPage = path === '/pages/validateAdmin'; // Exact match
    if (isValidateAdminPage) {
        return NextResponse.next();
    }
    if (validAdmin === 'true' && isValidateAdminPage) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (validAdmin === 'true') {
        return NextResponse.next();
    }
    if (path.startsWith('/admin')) {
        const response = NextResponse.redirect(new URL('/pages/validateAdmin', request.url));
        response.cookies.delete('validAdmin'); // Prevent loops
        return response;
    }
    return NextResponse.next();
};
