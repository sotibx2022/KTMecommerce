import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { WishListModel } from "@/models/wishList.model";
export async function POST(req: NextRequest) {
  const productId = await req.text()
 const token = await getToken({ req });
     if (!token?.id) {
       return NextResponse.json(
         { message: "Unauthorized", success: false },
         { status: 401 }
       );
     }
     const objectUserId = new Object(token.id);
  if (!productId) {
    return NextResponse.json(
      { message: "Missing productId in request body", status: 400, success: false },
      { status: 400 }
    );
  }
  try {
    const productObjectId = new Object(productId);
    const cartItem = await WishListModel.findOneAndDelete({ userId:objectUserId,productId: productObjectId });
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
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", status: 500, success: false },
      { status: 500 }
    );
  }
}
