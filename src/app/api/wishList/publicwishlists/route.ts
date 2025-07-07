import { connectToDB } from "@/config/db";
import { WishListModel } from "@/models/wishList.model";
import "@/models/products.model"; // Ensure the product model is registered
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/users.model";
const JWT_SECRET = process.env.TOKENSECRET!;
export async function GET(req: NextRequest) {
  console.log('---------- STARTING WISHLIST GET REQUEST ----------');
  try {
    console.log('[1] Attempting to connect to DB...');
    await connectToDB();
    console.log('[1] Successfully connected to DB');
    console.log('[2] Checking authorization header...');
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error('[2] Missing or invalid Authorization header');
      return NextResponse.json(
        { message: "Missing or invalid Authorization header", success: false },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    console.log('[3] Extracted token from header');
    let decoded: any;
    try {
      console.log('[4] Attempting to verify JWT token...');
      decoded = jwt.verify(token, JWT_SECRET);
      console.log('[4] Token verified successfully. Decoded:', decoded);
    } catch (err) {
      console.error('[4] Token verification failed:', err);
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 403 }
      );
    }
    const userId = decoded.userId;
    console.log('[5] Extracted userId from token:', userId);
    if (!userId || typeof userId !== "string" || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      console.error('[5] Invalid userId format:', userId);
      return NextResponse.json(
        { message: "Invalid or missing user ID in token", success: false },
        { status: 400 }
      );
    }
    console.log('[6] Attempting to find wishlist items for userId:', userId);
    const wishListItems = await WishListModel.find({ userId }).populate({
      path: "productId",
      select: "productDescription stockAvailability isNewArrivals isTrendingNow isTopSell isOfferItem overallRating",
    });
    console.log('[6] Wishlist items query result:', wishListItems);
    console.log('[7] Attempting to find user details for userId:', userId);
    const wishersDetails = await UserModel.findById(userId).select("email fullName profileImage");
   const updatedWishlistDetails = wishListItems.map((singleWishList) => ({
  ...singleWishList,         // Spread existing properties
  wishersId: userId          // Add new property
}));
    console.log('[7] User details query result:', wishersDetails);
    const wishListDetails = {
      updatedWishlistDetails,
      wishersDetails,
    };
    console.log('[8] Combined response data:', wishListDetails);
    console.log('[9] Returning successful response');
    return NextResponse.json(
      {
        message: "Wish List items retrieved successfully",
        success: true,
        data: wishListDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ERROR] Caught in catch block:', error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    console.log('---------- ENDING WISHLIST GET REQUEST ----------');
  }
}