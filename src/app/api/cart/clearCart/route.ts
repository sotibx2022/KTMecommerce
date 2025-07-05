import { CartModel } from "@/models/carts.model";
import UserModel from "@/models/users.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    const objectUserId = new Object(userId);
    const user = await UserModel.findOne({ _id: objectUserId });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const result = await CartModel.deleteMany({ userId: objectUserId });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No cart items found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Cart items deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}