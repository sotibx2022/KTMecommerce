import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/config/db";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const userId = await getUserIdFromCookies(req);
        if (!userId) {
            return NextResponse.json(
                { message: "User ID not found in cookies", success: false, status: 400 },
            );
        }
        const userDetails = await UserModel.findOne({ _id: userId })
            .select('fullName email profileImage _id accountStatus passwordHistory')
            .lean();
        if (!userDetails) {
            return NextResponse.json(
                { message: "User details not found", success: false, status: 404 },
            );
        }
        return NextResponse.json(
            {
                message: "User details found",
                success: true,
                status: 200,
                userDetails
            },
        );
    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json(
            { message: "Internal Server Error", success: false, status: 500 },
        );
    }
}