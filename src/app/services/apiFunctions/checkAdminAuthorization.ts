import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AdminModel from "@/models/admin.model";
export const checkAdminAuthorization = async (request: NextRequest) => {
    try {
        await connectToDB();
        const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET;
        if (!JWT_SECRET) {
            return new NextResponse(
                JSON.stringify({
                    message: "JWT secret is not configured",
                    success: false
                }),
                { status: 500 }
            );
        }
        const cookie = request.cookies.get('adminDetails')?.value;
        if (!cookie) {
            return new NextResponse(
                JSON.stringify({
                    message: "Admin cookie not found",
                    success: false
                }),
                { status: 401 }
            );
        }
        const decoded = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
        const adminUser = await AdminModel.findOne({ adminUserName: decoded.userName });
        if (!adminUser) {
            return new NextResponse(
                JSON.stringify({
                    message: "Admin not found",
                    success: false
                }),
                { status: 404 }
            );
        }
        if (adminUser.role === 'readOnly') {
            return new NextResponse(
                JSON.stringify({
                    message: "ReadOnly Admin can only view data",
                    success: false
                }),
                { status: 403 } // 403 Forbidden is more appropriate
            );
        }
        // For authorized admins
        return NextResponse.next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return new NextResponse(
                JSON.stringify({
                    message: "Invalid token",
                    success: false
                }),
                { status: 401 }
            );
        }
        return new NextResponse(
            JSON.stringify({
                message: "Internal server error",
                success: false
            }),
            { status: 500 }
        );
    }
};