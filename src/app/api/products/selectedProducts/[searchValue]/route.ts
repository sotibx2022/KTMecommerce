import { getProductsByKeyword } from "@/app/services/apiFunctions/apiFunctions";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import categoryText2Id from "@/app/services/apiFunctions/categoryText2Id";
import subCategoryText2Id from "@/app/services/apiFunctions/subCatText2Id";
import { IProductCreate, IProductDisplay } from "@/app/types/products";
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
    let products: IProductCreate[] = [];
    let totalProductsCount: number = 0;
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
    } else {
      console.log('9. Starting filter-based search');
      let filterQuery: any = {};
      if (category) {
        console.log('10. Processing category filter:', category);
        const categoryId = await categoryText2Id(category);
        console.log('11. categoryText2Id returned:', categoryId);
        if (categoryId) {
          filterQuery.categoryId = categoryId;
        }
      }
      if (subcategory) {
        console.log('12. Processing subcategory filter:', subcategory);
        const subCategoryId = await subCategoryText2Id(subcategory);
        console.log('13. subCategoryText2Id returned:', subCategoryId);
        if (subCategoryId) {
          filterQuery.subCategoryId = subCategoryId;
        }
      }
      console.log('16. Final filter query:', JSON.stringify(filterQuery, null, 2));
      console.log('17. Counting documents with filter');
      totalProductsCount = await productModel.countDocuments(filterQuery);
      console.log('18. Total documents count:', totalProductsCount);
      console.log('19. Fetching products with pagination');
      products = await productModel
        .find(filterQuery)
        .select('_id brand stockAvailability image productDescription productName overallRating url_slug price')
        .skip((page - 1) * limit)
        .limit(limit);
      console.log('20. Products found:', products.length);
      if (products.length > 0) {
        console.log('21. Returning successful filter search results');
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
        console.log('22. No products found matching filters');
        return NextResponse.json({
          message: "No products found matching the filters",
          status: 404,
          success: false,
        });
      }
    }
  } catch (error) {
    console.log('23. ERROR CAUGHT IN GET HANDLER');
    console.error("Error details:", error);
    return NextResponse.json({
      message: "Error occurred while fetching products",
      status: 500,
      success: false,
    });
  }
}