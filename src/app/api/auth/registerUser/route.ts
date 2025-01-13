import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phoneNumber, firebaseId, address } = await request.json();
    if (!fullName || !email || !phoneNumber || !firebaseId) {
      return NextResponse.json({
        status: 400,
        message: "All fields are required",
        success: false,
      });
    }
    const savedUser = await UserModel.findOne({ email });
    if (savedUser) {
      return NextResponse.json({
        status: 409, // Conflict
        message: "User already registered with the provided email",
        success: false,
      });
    }
    const newUser = new UserModel({
      fullName,
      email,
      phoneNumber,
      firebaseId,
    });
    console.log("New user before saving:", newUser);
    await newUser.save();
    const response = NextResponse.json({
      status: 201, // Created
      message: "User registered successfully",
      success: true,
      newUser,
    });
    response.cookies.set("_id", newUser._id.toString(), {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500, // Internal Server Error
      message: "An error occurred while processing your request",
      success: false,
    });
  }
}
