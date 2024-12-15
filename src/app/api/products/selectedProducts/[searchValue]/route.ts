import { categoriesModel } from "@/models/categories.model";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    console.log("Received GET request.");
    const url = new URL(request.url);
    console.log("Parsed URL:", url.href);
    const pathSegments = url.pathname.split("/");
    console.log("Path segments:", pathSegments);
    const searchValue = pathSegments.pop();
    console.log("Extracted search value:", searchValue);
    if (!searchValue) {
      console.log("No search value provided.");
      return NextResponse.json(
        { statusCode: 400, success: false, message: "No search value provided", data: null },
        { status: 400 }
      );
    }
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;
    console.log("Pagination details - Page:", page, "Limit:", limit, "Skip:", skip);
    const escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    console.log("Escaped search value:", escapedSearchValue);
    // Step 1: Attempt to find the category
    const category = await categoriesModel.findOne({
      category_name: { $regex: new RegExp(`^${escapedSearchValue}$`, "i") }
    });
    console.log("Category found:", category);
    let categoryId = category?._id;
    // Step 2: If no category, search in subcategories
    if (!category) {
      console.log("No category found, searching in subcategories...");
      const categoryforSubCategory = await categoriesModel.findOne({
        "subcategories.category_name": { $regex: escapedSearchValue, $options: "i" }
      });
      console.log("Category for subcategory found:", categoryforSubCategory);
      if (categoryforSubCategory?.subcategories?.length) {
        console.log("Subcategories found:", categoryforSubCategory.subcategories);
        const matchingSubcategory = categoryforSubCategory.subcategories.find(subcategory =>
          new RegExp(`${escapedSearchValue}`, "i").test(subcategory.category_name)
        );
        console.log("Matching subcategory:", matchingSubcategory);
        if (matchingSubcategory) {
          categoryId = matchingSubcategory._id.toString(); // Convert ObjectId to string
          console.log("Converted subCategoryId to string:", categoryId);
          const products = await productModel.find({ subCategoryId: categoryId });
          console.log("Products found with subCategoryId:", products);
          return NextResponse.json({
            message: "Products found with subcategory",
            status: 200,
            success: true,
            data: products
          });
        } else {
          console.log("No matching subcategory found.");
          return NextResponse.json(
            { message: "No matching subcategory found", statusCode: 404, success: false, data: null },
            { status: 404 }
          );
        }
      } else {
        console.log("No subcategories found.");
        return NextResponse.json(
          { message: "No category or subcategory found", statusCode: 404, success: false, data: null },
          { status: 404 }
        );
      }
    }
    // Step 3: Fetch products based on categoryId
    console.log("Fetching products for categoryId:", categoryId);
    const productsByCategory = await productModel.find({ categoryId }).skip(skip).limit(limit);
    console.log("Products found:", productsByCategory);
    if (!productsByCategory.length) {
      console.log("No products found for the given category.");
      return NextResponse.json(
        { statusCode: 404, success: false, message: "No products found", data: null },
        { status: 404 }
      );
    }
    // Step 4: Return response with pagination
    console.log("Returning products with pagination...");
    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Products found",
      data: productsByCategory,
      pagination: {
        currentPage: page,
        totalItems: productsByCategory.length,
        totalPages: Math.ceil(productsByCategory.length / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { statusCode: 500, success: false, message: "An internal error occurred", data: null },
      { status: 500 }
    );
  }
}
