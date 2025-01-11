import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const cookies = req.cookies.get("_id"); // Get the "_id" cookie
  if (cookies) {
    const response = NextResponse.json({
      message: "User Logout Successfully",
      status: 200,
      success: true,
    });
    response.cookies.set("_id", "", { path: "/", expires: new Date(0) }); // Clear the "_id" cookie
    return response;
  } else {
    return NextResponse.json({
      message: "There is no user logged in to logout.",
      status: 400,
      success: false,
    });
  }
}
