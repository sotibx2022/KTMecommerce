import UserModel from "@/models/users.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        const token = await getToken({req});
        const userId = token?.id;
        if (!userId) {
            return NextResponse.json(
                { message: "User ID not found in cookies", success: false, status: 400 },
            );
        }
        const userDetails = await UserModel.findOne({ _id: userId });
        if (!userDetails) {
            return NextResponse.json(
                { message: "User details not found", success: false, status: 404 },
            );
        }
        return NextResponse.json(
            { message: "User details found", success: true, status: 200, userDetails },
        );
    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json(
            { message: "Internal Server Error", success: false, status: 500 },
        );
    }
}