import { connectToDB } from "@/config/db";
import { CartModel } from "@/models/carts.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { Types } from "mongoose";
import { NotificationModel } from "@/models/notification.model";
import UserModel from "@/models/users.model";
export async function POST(req: NextRequest) {
  console.log("---------- STARTING CART ADDITION PROCESS ----------");
  try {
    console.log("[1] Attempting to connect to database...");
    await connectToDB();
    console.log("[1] Database connection established");
    console.log("[2] Retrieving user ID from cookies...");
    const userId = await getUserIdFromCookies(req);
    console.log(`[2] Retrieved user ID: ${userId}`);
    if (!userId) {
      console.error("[ERROR] No user ID found in cookies");
      return NextResponse.json(
        { message: "User ID not found", success: false },
        { status: 401 }
      );
    }
    console.log("[3] Fetching user details...");
    const userName = await UserModel.findById(userId).select('fullName');
    console.log(`[3] User fullName: ${userName?.fullName}`);
    console.log("[4] Parsing request body...");
    const requestBody = await req.json();
    console.log("[4] Raw request body:", JSON.stringify(requestBody, null, 2));
    const items = Array.isArray(requestBody) ? requestBody : [requestBody];
    console.log(`[5] Processing ${items.length} item(s)`);
    console.log("[6] Starting cart item processing...");
    await Promise.all(items.map(async (item, index) => {
      console.log(`[6.${index + 1}] Processing item ${index + 1}:`, item);
      const { productId, productName, image, price, brand, quantity = 1, wishersId } = item;
      console.log(`[6.${index + 1}.1] Extracted item details:`, {
        productId,
        productName,
        price,
        quantity,
        wishersId
      });
      const wishersName = await UserModel.findById(wishersId).select('fullName')
      console.log(`[6.${index + 1}.2] Creating new cart document...`);
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
      console.log(`[6.${index + 1}.2] Cart document created:`, newCart);
      await newCart.save();
      console.log(`[6.${index + 1}.3] Cart document saved successfully`);
      if (wishersId) {
        console.log(`[6.${index + 1}.4] wishersId detected (${wishersId}), creating notification...`);
        if(wishersId.toString()!== userId.toString()){
          const newNotification = new NotificationModel({
          userId: wishersId,
          title: "Public Wishlist Action",
          description: `${userName?.fullName || 'A user'} added your public ${items.length}items to cart`,
          category: "PublicWishList",
          read: false,
        });
        const secondNotification = new NotificationModel({
          userId:userId,
          title:"Public Wishlist Action",
          description:`You Added ${items.length} from Public WishList for ${wishersName?.fullName}`,
          category:'PublicWishList',
          read:false
        })
        await newNotification.save();
        await secondNotification.save()
        }
        console.log(`[6.${index + 1}.4] Notification saved successfully`);
      } else {
        console.log(`[6.${index + 1}.4] No wishersId, skipping notification`);
      }
    }));
    console.log("[7] All items processed successfully");
    return NextResponse.json(
      { message: "Items added to cart", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ERROR] Exception occurred:", error);
    console.error("[ERROR] Stack trace:", (error as Error).stack);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  } finally {
    console.log("---------- CART ADDITION PROCESS COMPLETED ----------");
  }
}