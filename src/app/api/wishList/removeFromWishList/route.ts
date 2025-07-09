import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { WishListModel } from "@/models/wishList.model";
import { Types } from "mongoose";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const requestBody = await req.json();
    const productId = requestBody.productId;
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    const userIdString = userId.toString();
    if (!Types.ObjectId.isValid(userIdString)) {
      return NextResponse.json(
        { message: "Invalid user ID format", status: 400, success: false },
        { status: 400 }
      );
    }
    const objectUserId = new Types.ObjectId(userIdString);
    if (!productId) {
      return NextResponse.json(
        { message: "Missing productId in request body", status: 400, success: false },
        { status: 400 }
      );
    }
    try {
      if (!Types.ObjectId.isValid(productId)) {
        return NextResponse.json(
          { message: "Invalid product ID format", status: 400, success: false },
          { status: 400 }
        );
      }
      const productObjectId = new Types.ObjectId(productId);
      const cartItem = await WishListModel.findOneAndDelete({ 
        userId: objectUserId,
        productId: productObjectId 
      });
      if (!cartItem) {
        return NextResponse.json(
          { message: "WishList item not found", status: 404, success: false },
          { status: 404 }
        );
      }
      return NextResponse.json({
        message: "WishList Item Successfully Deleted",
        status: 200,
        success: true,
      });
    } catch (dbError) {
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
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        status: 500, 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}