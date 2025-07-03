import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const data = await req.json();
    const { resetEmail, newresetPassword, confirmNewresetPassword } = data;
    const userId = await getUserIdFromCookies(req)
    // Validate input
    if (!newresetPassword || !confirmNewresetPassword) {
      return NextResponse.json({
        success: false,
        message: "New password and confirmation are required",
        status: 400,
      });
    }
    // Either email (for reset) or userId (for update) must be present
    if (!resetEmail && !userId) {
      return NextResponse.json({
        success: false,
        message: "Either email or user authentication is required",
        status: 400,
      });
    }
    if (newresetPassword !== confirmNewresetPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match",
        status: 400,
      });
    }
    let user;
    if (resetEmail) {
      user = await UserModel.findOne({ email: resetEmail });
    }
    else if (userId) {
      user = await UserModel.findById(userId);
    }
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }
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