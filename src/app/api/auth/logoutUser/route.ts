import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const response = NextResponse.json({
    message: "Logged out successfully",
    success: true,
    status: 200,
  });
  const expiredCookie = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  };
  response.cookies.set("userToken", "", expiredCookie);
  response.cookies.set("next-auth.callback-url", "", expiredCookie);
  response.cookies.set("next-auth.csrf-token", "", expiredCookie);
  response.cookies.set("next-auth.session-token", "", expiredCookie);
  response.cookies.set("__Secure-next-auth.session-token", "", expiredCookie);
  return response;
}
