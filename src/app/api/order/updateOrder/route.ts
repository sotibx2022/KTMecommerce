import { connectToDB } from "@/config/db";
import OrderModel from "@/models/orders.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { orderId, statusValue } = await req.json();
    if (!orderId || !statusValue) {
      return NextResponse.json(
        { success: false, message: "Order ID and status are required." },
        { status: 400 }
      );
    }
    const targetOrder = await OrderModel.findById(orderId);
    if (!targetOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }
    targetOrder.status = statusValue;
    await targetOrder.save();
    return NextResponse.json(
      { success: true, message: "Order status updated successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
