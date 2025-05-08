import { getProductsByKeyword } from "@/app/services/apiFunctions/apiFunctions";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import categoryText2Id from "@/app/services/apiFunctions/categoryText2Id";
import subCategoryText2Id from "@/app/services/apiFunctions/subCatText2Id";
import { IProductCreate, IProductDisplay } from "@/app/types/products";
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const minPrice = searchParams.get('minprice');
    const maxPrice = searchParams.get('maxprice');
    const rating = searchParams.get('rating');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    let products: IProductCreate[] = [];
    let totalProductsCount: number = 0;
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
    } else {
      let filterQuery: any = {};
      if (category) {
        const categoryId = await categoryText2Id(category);
        if (categoryId) {
          filterQuery.categoryId = categoryId;
        }
      }
      if (subcategory) {
        const subCategoryId = await subCategoryText2Id(subcategory);
        if (subCategoryId) {
          filterQuery.subCategoryId = subCategoryId;
        }
      }
      if (minPrice && maxPrice) {
        filterQuery.price = {
          $gte: parseFloat(minPrice),
          $lte: parseFloat(maxPrice),
        };
      }
      if (rating) {
        filterQuery.overallRating = { $gte: parseFloat(rating) };
      }
      totalProductsCount = await productModel.countDocuments(filterQuery);
      products = await productModel
      .find(filterQuery)
      .select('_id brand stockAvailability image productDescription productName overallRating url_slug price')
      .skip((page - 1) * limit)
      .limit(limit);
      if (products.length > 0) {
        return NextResponse.json({
          message: "Products found",
          status: 200,
          success: true,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalProductsCount / limit),
            totalItems: totalProductsCount,
            limit: limit,
          },
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
