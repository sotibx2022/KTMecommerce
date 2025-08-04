import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { IAddAdminData } from "@/app/types/admin";
import { connectToDB } from "@/config/db";
import AdminModel from "@/models/admin.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        connectToDB()
        await checkAdminAuthorization(req);
        const { adminFullName, adminEmail, adminUserName } = await req.json() as IAddAdminData;
        // Basic validation
        if (!adminFullName || !adminEmail || !adminUserName) {
            return NextResponse.json({
                message: "Validation Error: All fields are required.",
                success: false,
                status: 400
            });
        }
        // Create and save the new admin
        const newAdmin = new AdminModel({
            adminFullName,
            adminEmail,
            adminUserName,
        });
        await newAdmin.save();
        return NextResponse.json({
            message: "New Admin Created",
            success: true,
            status: 200,
            data: newAdmin,
        });
    } catch (error: any) {
        console.error("Error creating admin:", error);
        return NextResponse.json({
            message: "Server Error",
            success: false,
            status: 500,
            error: error.message,
        });
    }
}
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const allAdmins = await AdminModel.find();
        if (!allAdmins || allAdmins.length === 0) {
            return NextResponse.json({
                message: "No Admin users found",
                status: 404,
                success: false,
            });
        }
        return NextResponse.json({
            message: "Admin users retrieved successfully",
            status: 200,
            success: true,
            data: allAdmins,
        });
    } catch (error: any) {
        console.error("GET /admin error:", error);
        return NextResponse.json({
            message: "Server Error",
            status: 500,
            success: false,
            error: error.message,
        });
    }
}
