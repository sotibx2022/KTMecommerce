import { connectToDB } from "@/config/db";
import { WishListModel } from "@/models/wishList.model";
import "@/models/products.model"; // Ensure the product model is registered
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/users.model";
const JWT_SECRET = process.env.TOKENSECRET!;
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid Authorization header", success: false },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid token", success: false },
        { status: 403 }
      );
    }
    const userId = decoded.userId;
    if (!userId || typeof userId !== "string" || !/^[0-9a-fA-F]{24}$/.test(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing user ID in token", success: false },
        { status: 400 }
      );
    }
    const wishListItems = await WishListModel.find({ userId }).populate({
      path: "productId",
      select: "productDescription stockAvailability isNewArrivals isTrendingNow isTopSell isOfferItem overallRating",
    });
    const wishersDetails = await UserModel.findById(userId).select("email fullName profileImage");
    const updatedWishlistDetails = wishListItems.map((singleWishList) => ({
      ...singleWishList,         // Spread existing properties
      wishersId: userId          // Add new property
    }));
    const wishListDetails = {
      updatedWishlistDetails,
      wishersDetails,
    };
    return NextResponse.json(
      {
        message: "Wish List items retrieved successfully",
        success: true,
        data: wishListDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}