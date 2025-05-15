import { adminAuth } from "@/config/firebaseAdminAuth";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, newPassword, confirmNewPassword } = data;
    // Validate input
    if (!email || !newPassword || !confirmNewPassword) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        status: 400
      });
    }
    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match",
        status: 400
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404
      });
    }
    await adminAuth.updateUser(user.firebaseId, {
      password: newPassword,
    });
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      status: 200,
      data: {
        id: user._id,
        email: user.email,
        // Include other non-sensitive user data as needed
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to reset password",
      status: 500
    });
  }
}