import { connectToDB } from "@/config/db";
import { CartModel } from "@/models/carts.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { Types } from "mongoose";
import UserModel from "@/models/users.model";
import { createNotifications } from "./createNotifications";
export async function POST(req: NextRequest) {
  try {
    console.log("📦 [POST] Add items to cart API called");
    // Connect to DB
    await connectToDB();
    console.log("✅ Connected to MongoDB");
    // Get userId from cookie
    const userId = await getUserIdFromCookies(req);
    console.log("🔐 Retrieved userId from cookies:", userId);
    if (!userId) {
      console.warn("❌ User ID not found in cookies");
      return NextResponse.json(
        { message: "User ID not found", success: false },
        { status: 401 }
      );
    }
    // Fetch user details
    const currentUser = await UserModel.findById(userId).select('fullName email');
    console.log("👤 Current user info:", currentUser);
    // Parse request body
    const requestBody = await req.json();
    console.log("📨 Raw request body received:", requestBody);
    const items = Array.isArray(requestBody) ? requestBody : [requestBody];
    console.log(`🧾 Parsed items array (${items.length} items):`, items);
    // Insert cart items
    await Promise.all(
      items.map(async (item, index) => {
        const {
          productId,
          productName,
          image,
          price,
          brand,
          quantity = 1,
          wishersId
        } = item;
        console.log(`🛒 Adding item [${index + 1}]:`, {
          productId,
          productName,
          brand,
          price,
          quantity,
          wishersId
        });
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
        console.log(`✅ Item [${index + 1}] saved to cart`);
      })
    );
    // Notify the wisher
    const wisher = await UserModel.findById(items[0].wishersId).select('fullName');
    console.log("📢 Wisher user fetched:", wisher);
    createNotifications(
      items[0].wishersId,
      currentUser?.fullName || currentUser?.email || "An User",
      items.length,
      userId,
      wisher?.fullName || "An User"
    );
    console.log("🔔 Notification sent for cart action");
    return NextResponse.json(
      { message: "Items added to cart", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding items to cart:", error);
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
