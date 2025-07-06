import { IWishListItem } from "@/app/types/wishlist";
import { connectToDB } from "@/config/db";
import { WishListModel } from "@/models/wishList.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const cookieUserId = await getUserIdFromCookies(req);
    const userId = cookieUserId;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }
    const wishListItems = await WishListModel.find({ userId });
    if (!wishListItems || wishListItems.length === 0) {
      return NextResponse.json(
        { message: "No WishList items found", success: true, data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Wish List items retrieved successfully",
        success: true,
        data: wishListItems
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