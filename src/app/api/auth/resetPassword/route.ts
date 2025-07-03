import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const data = await req.json();
    const { resetEmail, newresetPassword, confirmNewresetPassword } = data;
    // Validate input
    if (!newresetPassword || !confirmNewresetPassword || !resetEmail) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        status: 400,
      });
    }
    if (newresetPassword !== confirmNewresetPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords don't match",
        status: 400,
      });
    }
    const user = await UserModel.findOne({ email: resetEmail });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }
    // Check password history
    if (user.passwordHistory && user.passwordHistory.length > 0) {
      for (const entry of user.passwordHistory) {
        if (entry.password && (await bcrypt.compare(newresetPassword, entry.password))) {
          return NextResponse.json({
            success: false,
            message: "This password was used before. Please choose a new one.",
            status: 400,
          });
        }
      }
    }
    const hashedPassword = await bcrypt.hash(newresetPassword, 10);
    const newEntry = { password: hashedPassword, createdAt: new Date() };
    const updatedHistory = [
      newEntry,
      ...(user.passwordHistory || []).slice(0, 2),
    ];
    // Update user
    user.password = hashedPassword;
    user.passwordHistory = updatedHistory;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred. Please try again.",
      status: 500,
    });
  }
}