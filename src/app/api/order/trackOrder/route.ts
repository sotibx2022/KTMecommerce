import { NextRequest, NextResponse } from "next/server";
import OrderModel from "../../../../models/orders.model";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to database...");
    await connectToDB();
    console.log("Database connected successfully.");
    const body = await req.json();
    console.log("Request body:", body);
    const { orderNumber } = body;
    console.log("Order number received:", orderNumber);
    if (!orderNumber || typeof orderNumber !== 'string') {
      console.log("Invalid or missing order number.");
      return NextResponse.json({
        message: "Invalid or missing order number",
        success: false,
        status: 400,
      });
    }
    console.log("Searching for order in the database...");
    const targetOrder = await OrderModel.aggregate([
      {
        $addFields: {
          _idString: { $toString: '$_id' }
        }
      },
      {
        $match: { _idString: { $regex: orderNumber + '$' } }
      },
      {
        $limit: 1
      }
    ]);
    console.log("Aggregation result:", targetOrder);
    if (!targetOrder || targetOrder.length === 0) {
      console.log("Order not found for order number:", orderNumber);
      return NextResponse.json({
        message: "Order not found. Please check for valid order number.",
        success: false,
        status: 404,
      });
    }
    console.log("Order found:", targetOrder[0]);
    return NextResponse.json({
      message: "Order details found",
      success: true,
      status: 200,
      data: targetOrder[0],
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
}
