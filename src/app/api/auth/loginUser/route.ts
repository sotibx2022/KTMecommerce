import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/config/db";
import { setAuthCookies } from "../authFunctions/setauthCookies";
export async function POST(req: NextRequest) {
  try {
    connectToDB();
    const data = await req.json();
    const { loginEmail, loginPassword } = data;
    if (!loginEmail || !loginPassword) {
      return NextResponse.json(
        { message: "loginEmail and loginPassword are required", success: false },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ email: loginEmail });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    if (!user.password) {
      return NextResponse.json(
        {
          message: "User Created with Google/Facebook, Update loginPassword in Setting First",
          success: false,
        },
        { status: 400 }
      );
    }
    const isloginPasswordValid = await bcrypt.compare(loginPassword, user.password);
    if (!isloginPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }
    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );
    return setAuthCookies(user, response);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}