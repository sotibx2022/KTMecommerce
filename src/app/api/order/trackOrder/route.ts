import { NextRequest, NextResponse } from "next/server";
import OrderModel from "../../../../models/orders.model";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { orderNumber } = await req.json();
    if (!orderNumber || typeof orderNumber !== 'string') {
      return NextResponse.json({
        message: "Invalid or missing order number",
        success: false,
        status: 400,
      });
    }
    const targetOrder = await OrderModel.aggregate([
      {
        $addFields: {
          _idString: { $toString: '$_id' }
        }
      },
      {
        $match: {
          _idString: { $regex: '^' + orderNumber }
        }
      },
      {
        $limit: 1
      }
    ]);
    if (!targetOrder || targetOrder.length === 0) {
      return NextResponse.json({
        message: "Order not found. Please check for valid order number.",
        success: false,
        status: 404,
      });
    }
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