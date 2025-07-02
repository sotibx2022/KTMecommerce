import { IWishListItem } from "@/app/types/wishlist";
import { connectToDB } from "@/config/db";
import { WishListModel } from "@/models/wishList.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
  try {
    connectToDB();
     const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }
    // Validate userId format
    try {
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid User ID format", success: false },
        { status: 400 }
      );
    }
    // Find cart items with proper error handling
    const wishListItems = await WishListModel.find({ userId: userId });
    const transformedWishList = wishListItems.map((item:IWishListItem)=>{
      return{
        ...item,
      productId:item.productId.toString(),
      userId:item.userId?.toString()
      }
    })
    if (!wishListItems || wishListItems.length === 0) {
      return NextResponse.json(
        { 
          message: "No WishList items found for this user", 
          success: true, 
          data: [] 
        },
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