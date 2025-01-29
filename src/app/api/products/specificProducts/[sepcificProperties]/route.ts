import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const property = url.pathname.split("/").pop();
  const validProperties = ["isNewArrivals", "isTrendingNow", "isTopSell", "isOfferItem"];
  if (!property || !validProperties.includes(property)) {
    return NextResponse.json(
      {
        message: "Invalid property specified.",
        success: false,
        status: 400,
      },
    );
  }
  const query = { [property]: true };
  try {
    const productsWithProperty = await productModel.find(query);
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
    return NextResponse.json(
      {
        message: "Products retrieved successfully.",
        success: true,
        status: 200,
        products: productsWithProperty,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while fetching products.",
        success: false,
        status: 500,
      },
    );
  }
}
