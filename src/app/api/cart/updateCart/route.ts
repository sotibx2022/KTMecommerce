import { CartModel } from "@/models/carts.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { connectToDB } from "@/config/db";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    connectToDB()
    const data = await req.json();
    const { productId, quantity } = data;
    if (!productId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({
        message: "Validation Error: Missing or invalid inputs",
        success: false,
        status: 400,
      });
    }
 const userId = await getUserIdFromCookies(req)
     if (!userId) {
       return NextResponse.json(
         { message: "Unauthorized", success: false },
         { status: 401 }
       );
     }
     const objectUserId = new Object(userId);
    if (!objectUserId) {
      return NextResponse.json({
        message: "Authentication Error: Invalid or missing userId in cookies",
        success: false,
        status: 401, // Unauthorized
      });
    }
    const productObjectId = new Object(productId);
    const cartProduct = await CartModel.findOneAndUpdate(
      { productId: productObjectId, userId:objectUserId }, // Ensure the product belongs to the user
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
