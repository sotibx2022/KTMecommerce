import { CartModel } from "@/models/carts.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    // Retrieve userId from cookies
    const userId = req.cookies.get("_id")?.value;
    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", status: 400, success: false },
        { status: 400 }
      );
    }
    // Convert userId to ObjectId
    let objectUserId;
    try {
      objectUserId = new Types.ObjectId(userId);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid User ID format", status: 400, success: false },
        { status: 400 }
      );
    }
    // Fetch cart items
    const cartItems = await CartModel.find({ userId: objectUserId });
    // Return response
    return NextResponse.json(
      { message: "Cart Items found", status: 200, success: true, cartItems: cartItems },
      { status: 200 }
    );
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { message: "An error occurred", status: 500, success: false },
      { status: 500 }
    );
  }
}
