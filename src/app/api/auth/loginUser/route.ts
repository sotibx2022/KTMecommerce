import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const user = await UserModel.findOne({ email });
    if (user) {
      const response = NextResponse.json({
        message: "Login Successful",
        status: 200,
        success: true,
        data:user,
      });
        response.cookies.set("_id", user._id.toString(), {
          httpOnly: true, // Makes the cookie accessible only by the server
          sameSite: "strict", // Prevents CSRF
          maxAge: 60 * 60 * 24 * 1, // Cookie valid for 1 day
          path: "/", // Cookie accessible throughout the site
        });
      return response;
    } else {
      return NextResponse.json({
        message: "No User Found with provided email",
        status: 401,
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred during login",
      status: 500,
      success: false,
    });
  }
}
