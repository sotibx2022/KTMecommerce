import { getProductsByCategory, getProductsByKeyword } from "@/app/services/apiFunctions/apiFunctions";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    if (keyword) {
      const { products, totalItems, totalPages } = await getProductsByKeyword(keyword, page, limit);
      if (products.length > 0) {
        return NextResponse.json({
          pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            limit: limit,
          },
          products,
        });
      } else {
        return NextResponse.json({ message: "No products found with provided keyword." });
      }
    } else if (category || subcategory) {
      const { products, totalItems, totalPages } = await getProductsByCategory(category, subcategory, page, limit);
      if (products.length > 0) {
        return NextResponse.json({
          message: "Products found",
          status: 200,
          success: true,
          pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            limit: limit,
          },
          products,
        });
      } else {
        return NextResponse.json({
          message: "No products found matching the category/subcategory",
          status: 404,
          success: false,
        });
      }
    } else {
      return NextResponse.json({
        message: "Please provide either keyword or category/subcategory for search",
        status: 400,
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while fetching products",
      status: 500,
      success: false,
    });
  }
}
