import { NotificationModel } from "@/models/notification.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { read } = await req.json();
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const notificationId = pathSegments.pop();
    if (!notificationId || !Types.ObjectId.isValid(notificationId)) {
      return NextResponse.json(
        { success: false, message: "Invalid notification ID" },
        { status: 400 }
      );
    }
    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      new Types.ObjectId(notificationId),
      { read: read },
      { new: true }
    );
    if (!updatedNotification) {
      return NextResponse.json(
        { success: false, message: "Notification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { 
        success: true, 
        message: "Notification updated successfully",
        data: updatedNotification 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}