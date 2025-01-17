import { NextRequest, NextResponse } from "next/server";
import { CartModel } from "@/models/carts.model";
import { Types } from "mongoose";
export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const _id = req.cookies.get("_id")?.value;
  const userId = new Object(_id)
  if (!productId) {
    return NextResponse.json(
      { message: "Missing productId in request body", status: 400, success: false },
      { status: 400 }
    );
  }
  try {
    const productObjectId = new Object(productId);
    const cartItem = await CartModel.findOneAndDelete({ userId,productId: productObjectId });
    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found", status: 404, success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Cart Item Successfully Deleted",
      status: 200,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", status: 500, success: false },
      { status: 500 }
    );
  }
}
