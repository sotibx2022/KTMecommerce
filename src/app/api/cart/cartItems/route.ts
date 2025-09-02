import { connectToDB } from "@/config/db";
import { CartModel } from "@/models/carts.model";
import { Types } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
  try {
    console.log("Connecting to database...");
    await connectToDB();
    console.log("Database connected successfully.");
    const userId = await getUserIdFromCookies(req);
    console.log("Retrieved userId from cookies:", userId);
    if (!userId) {
      console.log("No user ID found in cookies.");
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }
    // Validate userId format
    try {
      if (!Types.ObjectId.isValid(userId)) {
        console.log("User ID format is invalid:", userId);
        return NextResponse.json(
          { message: "Invalid User ID format", success: false },
          { status: 400 }
        );
      }
      console.log("User ID format validated successfully.");
    } catch (err) {
      console.log("Error validating user ID format:", err);
      return NextResponse.json(
        { message: "Invalid User ID format", success: false },
        { status: 400 }
      );
    }
    console.log("Fetching cart items for userId:", userId);
    const cartItems = await CartModel.find({ userId: userId }).lean();
    console.log("Cart items fetched:", cartItems);
    if (!cartItems || cartItems.length === 0) {
      console.log("No cart items found for userId:", userId);
      return NextResponse.json(
        {
          message: "No cart items found for this user",
          success: true,
          data: []
        },
        { status: 200 }
      );
    }
    console.log("Returning cart items for userId:", userId);
    return NextResponse.json(
      {
        message: "Cart items retrieved successfully",
        success: true,
        data: cartItems
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart items:", error);
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
