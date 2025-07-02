import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(req: NextRequest) {
  console.log("1. Starting password verification endpoint");
  try {
    console.log("2. Attempting to connect to database");
    await connectToDB();
    console.log("3. Database connection successful");
    console.log("4. Parsing request body");
    const data = await req.json();
    const { currentPassword } = data;
    console.log("5. Current password received:", !!currentPassword ? "*****" : "undefined");
    console.log("6. Getting token from cookies");
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("7. Token received:", token ? "exists" : "null");
    if (!token) {
      console.log("8. No token found - returning unauthorized");
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    console.log("9. Raw token content:", JSON.stringify(token, null, 2));
    // If you need to decode the raw JWT (when using JWT strategy)
    const rawToken = await getToken({ req, raw: true });
    if (rawToken && process.env.NEXTAUTH_SECRET) {
      console.log("10. Raw JWT string:", rawToken);
      const decoded = jwt.decode(rawToken);
      console.log("11. Decoded JWT content:", JSON.stringify(decoded, null, 2));
    }
    return NextResponse.json(
      { success: true, message: "Token decoded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("12. ERROR in token handling:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}