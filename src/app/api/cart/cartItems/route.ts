import { connectToDB } from "@/config/db";
import { CartModel } from "@/models/carts.model";
import { Types } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }
    // Validate userId format
    try {
      if (!Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { message: "Invalid User ID format", success: false },
          { status: 400 }
        );
      }
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid User ID format", success: false },
        { status: 400 }
      );
    }
    const cartItems = await CartModel.find({ userId: userId }).lean();
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        {
          message: "No cart items found for this user",
          success: true,
          data: []
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Cart items retrieved successfully",
        success: true,
        data: cartItems
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
