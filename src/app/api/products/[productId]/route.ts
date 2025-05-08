import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Extract the product ID from the URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const productId = pathSegments.pop(); // Assuming the productId is the last segment
    console.log(productId);
    // Validate the productId
    if (!productId) {
      return NextResponse.json({
        message: "Product ID is missing from the URL.",
        status: 400,
        success: false,
      });
    }
    // Find the product in the database
    const singleProduct = await productModel
    .findOne({ _id: productId })
    .select('_id brand price stockAvailability image productDescription productFeatures productName overallRating')
    .lean();
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
      data:singleProduct,
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
