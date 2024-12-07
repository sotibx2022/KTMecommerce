import { connectToDB } from "@/config/db";
import { product } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDB();
    // Extract the product ID from the URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const productId = pathSegments.pop(); // Assuming the productId is the last segment
    // Validate the productId
    if (!productId) {
      return NextResponse.json({
        message: "Product ID is missing from the URL.",
        status: 400,
        success: false,
      });
    }
    // Find the product in the database
    const singleProduct = await product.findOne({ _id: productId });
    if (!singleProduct) {
      return NextResponse.json({
        message: "Product not found.",
        status: 404,
        success: false,
      });
    }
    // Return the product data
    return NextResponse.json({
      message: "Single product found successfully",
      status: 200,
      success: true,
      singleProduct,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching product:", error);
    return NextResponse.json({
      message: "An error occurred while fetching the product.",
      status: 500,
      success: false,
    });
  }
}
