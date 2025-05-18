import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  connectToDB();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const property = searchParams.get('validProperty');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const validProperties = ["isNewArrivals", "isTrendingNow", "isTopSell", "isOfferItem"];
  if (!property || !validProperties.includes(property)) {
    return NextResponse.json(
      { message: "Invalid property.", success: false },
      { status: 400 }
    );
  }
  try {
    const products = await productModel
      .find({ [property]: true })
      .select('_id brand stockAvailability image productDescription productName overallRating url_slug price')
      .lean()
      .skip((page - 1) * limit)
      .limit(limit);
    if (!products.length) {
      return NextResponse.json(
        { message: `No products found for ${property}.`, success: true },
        { status: 404 }
      );
    }
    const totalItems = await productModel.countDocuments({ [property]: true });
    const totalPages = Math.ceil(totalItems / limit);
    return NextResponse.json({
      message: "Products fetched successfully.",
      success: true,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
        limit: limit,
      },
      products: products,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error.", success: false },
      { status: 500 }
    );
  }
}