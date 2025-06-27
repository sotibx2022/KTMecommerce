import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connectToDB } from "@/config/db";
import { NotificationModel } from "@/models/notification.model";
export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const { email, password } = await request.json();
    if (!email ||!password) {
      return NextResponse.json({
        status: 400,
        message: "All fields are required",
        success: false,
      });
    }
    const savedUser = await UserModel.findOne({ email });
    if (savedUser) {
      return NextResponse.json({
        status: 409,
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const passwordHistory = {password:hashedPassword,createdAt:Date.now()}
    const newUser = new UserModel({
      email,
      password:hashedPassword,
      passwordHistory:[passwordHistory]
    });
    await newUser.save();
const newNotification = new NotificationModel({
   userId: newUser._id,
  title: "Account Created",
  description: `Welcome ${newUser.fullName},your account created with email ${newUser.email}!`,
  category: "UserCreated"
})
await newNotification.save();
    return NextResponse.json({
      status: 201,
      message: "Profile created successfully",
      success: true,
      data: newUser
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Server error",
      success: false,
    });
  }
}