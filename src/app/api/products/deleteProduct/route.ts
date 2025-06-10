import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "Product ID is required",
        status: 400
      });
    }
    const productObjectId = new Object(productId);
    const deleteResult = await productModel.deleteOne({ _id: productObjectId });
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
        status: 404
      });
    }
    return NextResponse.json({
      success: true,
      message: "Product deleted successfully", 
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500
    });
  }
}