import { connectToDB } from "@/config/db";
import AdminModel from "@/models/admin.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
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
        const response = NextResponse.json(
            { message: "Admin is valid", success: true },
            { status: 200 }
        );
        response.cookies.set({
            name: "validAdmin",
            value: "true",
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
