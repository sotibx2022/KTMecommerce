import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // Establish connection to the database
    await connectToDB();
    // Retrieve all products from the database
    const products = await productModel.find();
    // Check if products are found
    if (products && products.length > 0) {
      return NextResponse.json({
        message: "Products found successfully",
        success: true,
        status: 200,
        products,
      });
    } else {
      return NextResponse.json({
        message: "No products found",
        success: false,
        status: 404,
        products: [],
      });
    }
  } catch (error: unknown) {
    // Error handling with type assertion
    if (error instanceof Error) {
      return NextResponse.json({
        message: "Error fetching products",
        success: false,
        status: 500,
        error: error.message,
      });
    }
    // Handle the case when the error is not an instance of Error
    return NextResponse.json({
      message: "Unknown error occurred",
      success: false,
      status: 500,
      error: "Unknown error",
    });
  }
}
