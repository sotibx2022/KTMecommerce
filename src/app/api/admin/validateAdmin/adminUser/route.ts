import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectToDB } from "@/config/db";
import AdminModel from "@/models/admin.model";
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET;
        if (!JWT_SECRET) {
            return NextResponse.json({
                message: "JWT secret is not configured",
                success: false,
                status: 500
            });
        }
        const cookie = req.cookies.get('adminDetails')?.value;
        if (!cookie) {
            return NextResponse.json({
                message: "Admin cookie not found",
                success: false,
                status: 401
            });
        }
        const decoded = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
        const adminUser = await AdminModel.findOne({ adminUserName: decoded.adminUserName });
        if (!adminUser) {
            return NextResponse.json({
                message: "Admin not found",
                success: false,
                status: 404
            });
        }
        return NextResponse.json({
            data: adminUser,
            success: true,
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            message: "Error to fetch adminDetails",
            success: false,
            status: 500
        });
    }
}