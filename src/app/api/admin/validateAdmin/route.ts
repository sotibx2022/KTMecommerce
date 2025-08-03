import { connectToDB } from "@/config/db";
import AdminModel from "@/models/admin.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(req: NextRequest) {
    const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET!;
    try {
        await connectToDB();
        const { adminUserName } = await req.json();
        if (!adminUserName) {
            return NextResponse.json(
                { message: "Admin username is required", success: false },
                { status: 400 }
            );
        }
        const existingAdmin = await AdminModel.findOne({ adminUserName });
        if (!existingAdmin) {
            return NextResponse.json(
                { message: "Admin not found", success: false },
                { status: 404 }
            );
        }
        const adminToken = jwt.sign(
            { userName: adminUserName },  // Payload must be an object
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        const response = NextResponse.json({ message: "Access granted. Taking you to the Admin Dashboard...", success: true, status: 200 })
        response.cookies.set({
            name: "adminDetails",
            value: adminToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
        });
        return response;
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
