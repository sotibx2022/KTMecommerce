import { CartModel } from "@/models/carts.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
  try {
    const { productId, quantity } = await req.json();
    if (!productId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({
        message: "Validation Error: Missing or invalid inputs",
        success: false,
        status: 400,
      });
    }
    const userIdFromCookie = req.cookies.get("_id")?.value;
    if (!userIdFromCookie || !mongoose.Types.ObjectId.isValid(userIdFromCookie)) {
      return NextResponse.json({
        message: "Authentication Error: Invalid or missing userId in cookies",
        success: false,
        status: 401, // Unauthorized
      });
    }
    // Convert userId to ObjectId
    const userId = new mongoose.Types.ObjectId(userIdFromCookie);
    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({
        message: "Validation Error: Invalid productId format",
        success: false,
        status: 400,
      });
    }
    const productObjectId = new Object(productId);
    const cartProduct = await CartModel.findOneAndUpdate(
      { productId: productObjectId, userId }, // Ensure the product belongs to the user
      { $set: { quantity } }, // Update the quantity
      { new: true, upsert: false } // Return the updated document, do not create a new one
    );
    if (!cartProduct) {
      return NextResponse.json({
        message: "Cart item not found for this user",
        success: false,
        status: 404,
      });
    }
    return NextResponse.json({
      message: "Cart item updated successfully",
      success: true,
      data: cartProduct,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
      status: 500,
    });
  }
}
