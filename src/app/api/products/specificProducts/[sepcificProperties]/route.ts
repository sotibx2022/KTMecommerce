import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  connectToDB();
  console.log('------ START OF GET REQUEST ------');
  console.log('Request URL:', req.url);
  // api/products/specificProducts/advanceCategories?validProperty=isNewArrivals&page=1
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  console.log('Raw search params:', searchParams.toString());
  const property = searchParams.get('validProperty');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit')||'12',10);
  console.log('Extracted parameters:', {
    property,
    page,
    limit
  });
  const validProperties = ["isNewArrivals", "isTrendingNow", "isTopSell", "isOfferItem"];
  console.log('Valid properties list:', validProperties);
  if (!property || !validProperties.includes(property)) {
    console.error('Invalid property error:', property);
    return NextResponse.json(
      { message: "Invalid property.", success: false },
      { status: 400 }
    );
  }
  try {
    console.log('Attempting to query database...');
    console.log('Query filter:', { [property]: true });
    const products = await productModel
      .find({ [property]: true })
      .select('_id brand stockAvailability image productDescription productName overallRating url_slug price')
      .lean() // Faster plain objects
      .skip((page-1)*limit)
      .limit(limit);
    console.log('Products found:', products.length);
    if (!products.length) {
      console.warn('No products found for property:', property);
      return NextResponse.json(
        { message: `No products found for ${property}.`, success: true },
        { status: 404 }
      );
    }
    console.log('Counting total items...');
    const totalItems = await productModel.countDocuments({[property]:true});
    console.log('Total items count:', totalItems);
    const totalPages = Math.ceil(totalItems/limit);
    console.log('Calculated pagination:', {
      currentPage: page,
      totalPages,
      totalItems,
      limit
    });
    console.log('------ END OF GET REQUEST (SUCCESS) ------');
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
    console.error('------ ERROR IN GET REQUEST ------');
    console.error('Error details:', error);
    console.error('Error stack:', (error as Error).stack);
    console.error('------ END OF ERROR ------');
    return NextResponse.json(
      { message: "Server error.", success: false },
      { status: 500 }
    );
  }
}