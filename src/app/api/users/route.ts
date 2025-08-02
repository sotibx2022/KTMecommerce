import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const allUsers = await UserModel.find();
        return NextResponse.json({
            success: true,
            message: "Users fetched successfully",
            data: allUsers
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        }, { status: 500 });
    }
}