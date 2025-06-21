import UserModel from "@/models/users.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
     const {data}= await req.json();
     const { newPassword, confirmNewPassword, email } = data;
    // Validate input
    if (!newPassword || !confirmNewPassword || !email) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        status: 400
      });
    }
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords don't match",
        status: 400
      });
    }
    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404
      });
    }
    // Check password history - ADDED SAFETY CHECK
    if (user.passwordHistory && user.passwordHistory.length > 0) {
      for (const entry of user.passwordHistory) {
        if (entry.password && await bcrypt.compare(newPassword, entry.password)) {
          return NextResponse.json({
            success: false,
            message: "This password was used before. Please choose a new one.",
            status: 400
          });
        }
      }
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newEntry = { password: hashedPassword, createdAt: new Date() };
    const updatedHistory = [
      newEntry,
      ...(user.passwordHistory || []).slice(0, 2) // Safely handle undefined
    ];
    // Update user
    user.password = hashedPassword;
    user.passwordHistory = updatedHistory;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      status: 200
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred. Please try again.",
      status: 500
    });
  }
}