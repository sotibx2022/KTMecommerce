import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
connectToDB();
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const property = url.pathname.split("/").pop();
  const validProperties = ["isNewArrivals", "isTrendingNow", "isTopSell", "isOfferItem"];
  if (!property || !validProperties.includes(property)) {
    return NextResponse.json(
      { message: "Invalid property.", success: false },
      { status: 400 }
    );
  }
  try {
    const products = await productModel
      .find({ [property]: true }, { name: 1,productName:1, image: 1 }) // Projection
      .lean() // Faster plain objects
      .limit(8);
    if (!products.length) {
      return NextResponse.json(
        { message: `No products found for ${property}.`, success: true },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Products fetched successfully.",
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error.", success: false },
      { status: 500 }
    );
  }
}