import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../authFunctions/getUserIdFromCookies"; // Assuming this function exists and works correctly
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { currentPassword } = await req.json();
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: User ID not found in cookies" },
        { status: 401 }
      );
    }
    const user = await UserModel.findOne({_id:userId}); 
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 } 
      );
    }
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Account registered with social login. No password set for direct login.",
        },
        { status: 400 } // Bad request or conflict, as they can't 'verify' a non-existent password
      );
    }
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Incorrect current password" },
        { status: 401 } 
      );
    }
    return NextResponse.json(
      { success: true, message: "Current password verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/verify-password:", error); 
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}