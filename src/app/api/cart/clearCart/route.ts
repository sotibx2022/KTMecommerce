import { CartModel } from "@/models/carts.model";
import UserModel from "@/models/users.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token?.id) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    const objectUserId = new Object(token.id);
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