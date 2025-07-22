import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
    const validAdmin = req.cookies.get('validAdmin')?.value;
    if (validAdmin === 'true') {
        return NextResponse.next();
    }
    const loginUrl = new URL('/pages/validateAdmin', req.url);
    return NextResponse.redirect(loginUrl);
}
export const config = {
    matcher: [
        '/admin/:path*',
    ]
};