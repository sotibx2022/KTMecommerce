import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
export async function GET(request: NextRequest) {
  try {
    // Extract the product ID from the URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const productId = pathSegments.pop();
    // Validate the productId
    if (!productId) {
      return NextResponse.json({ message: "Product ID is missing.", status: 400, success: false });
    }
    // Check if it's a valid ObjectId
    if (!Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ message: "Invalid Product ID.", status: 400, success: false });
    }
    // Find the product in the database
    const productObjectId = new Types.ObjectId(productId);
    const singleProduct = await productModel.findOne({ _id: productObjectId }).lean();
    if (!singleProduct) {
      return NextResponse.json({ message: "Product not found.", status: 404, success: false });
    }
    // Return the product data
    return NextResponse.json({ message: "Single product found successfully.", status: 200, success: true, data: singleProduct });
  } catch (error) {
    console.error("Error fetching product.", error);
    return NextResponse.json({ message: "An error occurred while fetching the product.", status: 500, success: false });
  }
}
