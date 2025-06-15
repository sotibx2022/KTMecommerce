import { connectToDB } from "@/config/db";
import { NotificationModel } from "@/models/notification.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Import getToken from next-auth
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const token = await getToken({ req });
    const userId = token?.id;
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user ID found", success: false },
        { status: 401 }
      );
    }
    const notifications = await NotificationModel.find({
      userId
    })
    return NextResponse.json(
      { 
        success: true, 
        data: notifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}