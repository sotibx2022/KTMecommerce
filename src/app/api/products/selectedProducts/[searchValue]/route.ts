import { getProductsByKeyword } from "@/app/services/apiFunctions/apiFunctions";
import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/types/products";
import categoryText2Id from "@/app/services/apiFunctions/categoryText2Id";
import subCategoryText2Id from "@/app/services/apiFunctions/subCatText2Id";
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectToDB(); // Connect to the database
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    // Extract query parameters
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const minPrice = searchParams.get('minprice');
    const maxPrice = searchParams.get('maxprice');
    const rating = searchParams.get('rating');
    let products: Product[] = [];
    // If keyword is provided, search using it
    if (keyword) {
      products = await getProductsByKeyword(keyword);
      if (products.length > 0) {
        return NextResponse.json({ products });
      } else {
        return NextResponse.json({ message: "No products found with provided keyword." });
      }
    } else {
      let filterQuery: any = {}; // Initialize an empty filter query object
      // If category is provided, resolve categoryId
      if (category) {
        const categoryId = await categoryText2Id(category);
        if (categoryId) {
          filterQuery.categoryId = categoryId; // Set categoryId in filter query
        }
      }
      // If subcategory is provided, resolve subCategoryId
      if (subcategory) {
        const subCategoryId = await subCategoryText2Id(subcategory);
        if (subCategoryId) {
          filterQuery.subCategoryId = subCategoryId; // Set subCategoryId in filter query
        }
      }
      // If price range is provided, add to the filter query
      if (minPrice && maxPrice) {
        filterQuery.price = {
          $gte: parseFloat(minPrice),
          $lte: parseFloat(maxPrice),
        }; // Price filter
      }
      // If rating is provided, add rating to the filter query
      if (rating) {
        filterQuery.overallRating = { $gte: parseFloat(rating) }; // Rating filter
      }
      // Fetch products based on the filter query
      products = await productModel.find(filterQuery);
      // Return appropriate response based on whether products are found
      if (products.length > 0) {
        return NextResponse.json({
          message: "Products found",
          status: 200,
          success: true,
          products,
        });
      } else {
        return NextResponse.json({
          message: "No products found matching the filters",
          status: 404,
          success: false,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      message: "Error occurred while fetching products",
      status: 500,
      success: false,
    });
  }
}
