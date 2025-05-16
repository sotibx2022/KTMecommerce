import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phoneNumber, address } = await request.json();
    if (!fullName || !email || !phoneNumber) {
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
    const newUser = new UserModel({
      fullName,
      email,
      phoneNumber,
      address // Optional
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