import OrderModel from "@/models/orders.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { userEmail, items, status, paymentMethod, shippingAddress, shippingPerson } = await req.json();
    // Validate required fields
    if (!userEmail || !items || !status || !paymentMethod || !shippingAddress || !shippingPerson) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    // Create and save order
    const order = new OrderModel({
      userEmail,
      items,
      status,
      paymentMethod,
      shippingAddress,
      shippingPerson
    });
    await order.save();
    // Return success response
    return NextResponse.json(
      {
        message: "Order created successfully",
        success: true,
        data: order
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}