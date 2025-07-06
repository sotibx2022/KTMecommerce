import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { WishListModel } from "@/models/wishList.model";
import { Types } from "mongoose";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
  console.log('---------- STARTING WISHLIST DELETE REQUEST ----------');
  try {
    console.log('[1] Attempting to connect to database...');
    await connectToDB();
    console.log('[1] Database connection successful');
    console.log('[2] Parsing request body...');
    const requestBody = await req.json();
    console.log('[2] Request body:', requestBody);
    const productId = requestBody.productId;
    console.log('[3] Extracted productId:', productId);
    console.log('[4] Getting user ID from cookies...');
    const userId = getUserIdFromCookies(req);
    console.log('[4] User ID from cookies:', userId);
    if (!userId) {
      console.error('[4] No user ID found in cookies - unauthorized');
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    console.log('[5] Converting user ID to string...');
    const userIdString = userId.toString();
    console.log('[5] User ID string:', userIdString);
    if (!Types.ObjectId.isValid(userIdString)) {
      console.error('[5] Invalid user ID format:', userIdString);
      return NextResponse.json(
        { message: "Invalid user ID format", status: 400, success: false },
        { status: 400 }
      );
    }
    console.log('[6] Creating ObjectId for user...');
    const objectUserId = new Types.ObjectId(userIdString);
    console.log('[6] User ObjectId:', objectUserId);
    if (!productId) {
      console.error('[6] Missing productId in request body');
      return NextResponse.json(
        { message: "Missing productId in request body", status: 400, success: false },
        { status: 400 }
      );
    }
    try {
      console.log('[7] Validating product ID format...');
      if (!Types.ObjectId.isValid(productId)) {
        console.error('[7] Invalid product ID format:', productId);
        return NextResponse.json(
          { message: "Invalid product ID format", status: 400, success: false },
          { status: 400 }
        );
      }
      console.log('[8] Creating ObjectId for product...');
      const productObjectId = new Types.ObjectId(productId);
      console.log('[8] Product ObjectId:', productObjectId);
      console.log('[9] Searching for wishlist item to delete...');
      console.log('[9] Search criteria:', { 
        userId: objectUserId,
        productId: productObjectId 
      });
      const cartItem = await WishListModel.findOneAndDelete({ 
        userId: objectUserId,
        productId: productObjectId 
      });
      console.log('[9] Deletion result:', cartItem);
      if (!cartItem) {
        console.error('[9] Wishlist item not found');
        return NextResponse.json(
          { message: "WishList item not found", status: 404, success: false },
          { status: 404 }
        );
      }
      console.log('[10] Successfully deleted wishlist item');
      return NextResponse.json({
        message: "WishList Item Successfully Deleted",
        status: 200,
        success: true,
      });
    } catch (dbError) {
      console.error('[DB ERROR] Database operation failed:', dbError);
      return NextResponse.json(
        { 
          message: "Internal Server Error", 
          status: 500, 
          success: false,
          error: dbError instanceof Error ? dbError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[TOP LEVEL ERROR] Request processing failed:', error);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        status: 500, 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    console.log('---------- ENDING WISHLIST DELETE REQUEST ----------');
  }
}