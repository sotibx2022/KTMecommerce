import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AdminModel from "@/models/admin.model";
export const validateAdmin = async (request: NextRequest): Promise<NextResponse | { message: string; success: boolean; status: number }> => {
    try {
        await connectToDB();
        const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET;
        if (!JWT_SECRET) {
            return NextResponse.json(
                { message: "JWT secret is not configured", success: false },
                { status: 500 }
            );
        }
        const cookie = request.cookies.get('adminDetails')?.value;
        if (!cookie) {
            return NextResponse.json(
                { message: "Admin cookie not found", success: false },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
        const adminUser = await AdminModel.findOne({ adminUserName: decoded.userName });
        if (!adminUser) {
            return NextResponse.json(
                { message: "Admin not found", success: false },
                { status: 404 }
            );
        }
        return {
            message: "Admin is authorized",
            success: true,
            status: 200
        };
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json(
                { message: "Invalid token", success: false },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
};