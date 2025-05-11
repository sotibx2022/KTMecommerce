import { getProductsByCategory, getProductsByKeyword } from "@/app/services/apiFunctions/apiFunctions";
import { NextRequest,NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    console.log('1. Starting GET request handler');
    const url = new URL(request.url);
    console.log('2. URL:', url.toString());
    const searchParams = new URLSearchParams(url.search);
    console.log('3. Search params:', Object.fromEntries(searchParams.entries()));
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    console.log('4. Parsed parameters:', {
      keyword, category, subcategory, 
      page, limit
    });
    if (keyword) {
      console.log('5. Keyword search detected, calling getProductsByKeyword');
      const { products, totalItems, totalPages } = await getProductsByKeyword(keyword, page, limit);
      console.log('6. getProductsByKeyword returned:', { 
        productsCount: products.length, 
        totalItems, 
        totalPages 
      });
      if (products.length > 0) {
        console.log('7. Returning successful keyword search results');
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
        console.log('8. No products found for keyword search');
        return NextResponse.json({ message: "No products found with provided keyword." });
      }
    } else if (category || subcategory) {
      console.log('9. Category/subcategory search detected, calling getProductsByCategory');
      const { products, totalItems, totalPages } = await getProductsByCategory(category, subcategory, page, limit);
      console.log('10. getProductsByCategory returned:', {
        productsCount: products.length,
        totalItems,
        totalPages
      });
      if (products.length > 0) {
        console.log('11. Returning successful category search results');
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
        console.log('12. No products found matching category/subcategory');
        return NextResponse.json({
          message: "No products found matching the category/subcategory",
          status: 404,
          success: false,
        });
      }
    } else {
      console.log('13. No search parameters provided');
      return NextResponse.json({
        message: "Please provide either keyword or category/subcategory for search",
        status: 400,
        success: false,
      });
    }
  } catch (error) {
    console.log('14. ERROR CAUGHT IN GET HANDLER');
    console.error("Error details:", error);
    return NextResponse.json({
      message: "Error occurred while fetching products",
      status: 500,
      success: false,
    });
  }
}