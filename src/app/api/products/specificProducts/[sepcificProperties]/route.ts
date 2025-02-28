import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const property = url.pathname.split("/").pop();
  const validProperties = ["isNewArrivals", "isTrendingNow", "isTopSell", "isOfferItem"];
  // Validate property in URL
  if (!property || !validProperties.includes(property)) {
    return NextResponse.json({
      message: "Invalid property specified.",
      success: false,
      status: 400,
    });
  }
  const query = { [property]: true };
  console.log("Query being sent to database:", query); // Log the query
  try {
    // Fetch products with the specified property
    const productsWithProperty = await productModel.find(query).limit(8); // Removed maxTimeMS for testing
    console.log("Products retrieved:", productsWithProperty); // Log the result
    if (!productsWithProperty.length) {
      return NextResponse.json(
        {
          message: `No products found with ${property} set to true.`,
          success: true,
          status: 404,
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Products retrieved successfully.",
      success: true,
      status: 200,
      products: productsWithProperty,
    });
  } catch (error) {
    // Detailed error logging
    console.error("Database query error:", error);
    return NextResponse.json({
      message: "An error occurred while fetching products.",
      success: false,
      status: 500,
    });
  }
}
