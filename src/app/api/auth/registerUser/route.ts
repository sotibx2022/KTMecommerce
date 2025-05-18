import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connectToDB } from "@/config/db";
export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const { fullName, email, phoneNumber, address,password } = await request.json();
    if (!fullName || !email || !phoneNumber || !password) {
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
      fullName,
      email,
      phoneNumber,
      address,
      password:hashedPassword,
      passwordHistory:[passwordHistory]
    });
    await newUser.save();
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