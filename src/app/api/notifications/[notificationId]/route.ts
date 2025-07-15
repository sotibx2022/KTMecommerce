import { connectToDB } from "@/config/db";
import { NotificationModel } from "@/models/notification.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    connectToDB()
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
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const notificationId = pathSegments.pop();
    if (!notificationId || !Types.ObjectId.isValid(notificationId)) {
      return NextResponse.json(
        { success: false, message: "Invalid notification ID" },
        { status: 400 }
      );
    }
    const targetedNotification = await NotificationModel.findByIdAndDelete(notificationId);
    if (!targetedNotification) {
      return NextResponse.json(
        { success: false, message: "Notification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Notification deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
