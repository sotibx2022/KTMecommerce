import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            return NextResponse.json(
                { success: false, message: "This user is not registered" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, message: "Email is valid", data: { userEmail: user.email, userPassword: user.password } },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while verifying email"
            },
            { status: 500 }
        );
    }
}