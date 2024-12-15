import { categoriesModel } from "@/models/categories.model";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const searchValue = pathSegments.pop();
    if (!searchValue) {
      return NextResponse.json(
        { statusCode: 400, success: false, message: "No search value provided", data: null },
        { status: 400 }
      );
    }
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;
    const escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Step 1: Attempt to find the category
    const category = await categoriesModel.findOne({
      category_name: { $regex: new RegExp(`^${escapedSearchValue}$`, "i") },
    });
    let categoryId = category?._id;
    // Step 2: If no category, search in subcategories
    if (!category) {
      const categoryforSubCategory = await categoriesModel.findOne({
        "subcategories.category_name": { $regex: escapedSearchValue, $options: "i" },
      });
      if (categoryforSubCategory?.subcategories?.length) {
        const matchingSubcategory = categoryforSubCategory.subcategories.find((subcategory) =>
          new RegExp(`${escapedSearchValue}`, "i").test(subcategory.category_name)
        );
        if (matchingSubcategory) {
          categoryId = matchingSubcategory._id.toString(); // Convert ObjectId to string
          const products = await productModel.find({ subCategoryId: categoryId });
          return NextResponse.json({
            message: "Products found with subcategory",
            status: 200,
            success: true,
            data: products,
          });
        } else {
          return NextResponse.json(
            { message: "No matching subcategory found", statusCode: 404, success: false, data: null },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          { message: "No category or subcategory found", statusCode: 404, success: false, data: null },
          { status: 404 }
        );
      }
    }
    // Step 3: Fetch products based on categoryId
    const productsByCategory = await productModel.find({ categoryId }).skip(skip).limit(limit);
    if (!productsByCategory.length) {
      return NextResponse.json(
        { statusCode: 404, success: false, message: "No products found", data: null },
        { status: 404 }
      );
    }
    // Step 4: Return response with pagination
    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Products found",
      data: productsByCategory,
      pagination: {
        currentPage: page,
        totalItems: productsByCategory.length,
        totalPages: Math.ceil(productsByCategory.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { statusCode: 500, success: false, message: "An internal error occurred", data: null },
      { status: 500 }
    );
  }
}
