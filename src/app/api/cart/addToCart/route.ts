import { connectToDB } from "@/config/db";
import { CartModel } from "@/models/carts.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { Types } from "mongoose";
import UserModel from "@/models/users.model";
import { createNotifications } from "./createNotifications";
export async function POST(req: NextRequest) {
  try {
    // Connect to DB
    await connectToDB();
    // Get userId from cookie
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found", success: false },
        { status: 401 }
      );
    }
    const currentUser = await UserModel.findById(userId).select('fullName email');
    const requestBody = await req.json();
    const items = Array.isArray(requestBody) ? requestBody : [requestBody];
    await Promise.all(
      items.map(async (item) => {
        const {
          productId,
          productName,
          image,
          price,
          brand,
          quantity = 1,
          wishersId
        } = item;
        const newCart = new CartModel({
          userId: new Types.ObjectId(userId),
          productId,
          productName,
          brand,
          category: brand,
          price,
          image,
          quantity,
          wishersId
        });
        await newCart.save();
        if (item.wishersId.toString() === userId.toString()) {
          const wisher = await UserModel.findById(items[0].wishersId).select('fullName');
          createNotifications(
            item.wishersId,
            currentUser?.fullName || currentUser?.email || "An User",
            productName,
            userId,
            wisher?.fullName || "An User"
          );
        }
      })
    );
    // Notify the wisher
    return NextResponse.json(
      { message: "Items added to cart", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
