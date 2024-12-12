import { categoriesModel } from "@/models/categories.model";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    // Parse the search value (category name) from the URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const searchValue = pathSegments.pop();
    if (!searchValue) {
      return NextResponse.json(
        {
          statusCode: 400,
          success: false,
          message: "There is no search value",
          data: null,
        },
        { status: 400 }
      );
    }
    // Parse page number and page size from query params (default values: page 1, limit 20)
    const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(url.searchParams.get("limit") || "20", 10); // Default to 20 items per page
    const skip = (page - 1) * limit; // Number of items to skip based on page
    // Step 1: Find the category by its name (case-insensitive)
    const category = await categoriesModel.findOne({
      category_name: { $regex: new RegExp(`^${searchValue}$`, "i") }, // Case-insensitive match
    });
    // Step 2: Handle scenarios where no category is found
    if (!category) {
      // Search products directly by name, brand, or description (case-insensitive)
      const productsOnName = await productModel.find({
        productName: { $regex: new RegExp(searchValue, "i") },
      }).skip(skip).limit(limit); // Paginate
      const productsOnBrand = await productModel.find({
        brand: { $regex: new RegExp(searchValue, "i") },
      }).skip(skip).limit(limit); // Paginate
      const productsOnDescription = await productModel.find({
        productDescription: { $regex: new RegExp(searchValue, "i") },
      }).skip(skip).limit(limit); // Paginate
      // Consolidate all products into a single array
      const allProducts = [
        ...productsOnName,
        ...productsOnBrand,
        ...productsOnDescription,
      ];
      // If no products are found based on product details
      if (allProducts.length === 0) {
        return NextResponse.json(
          {
            statusCode: 404,
            success: false,
            message: "No products found matching the search value",
            data: null,
          },
          { status: 404 }
        );
      }
      // If products are found, return them along with pagination details
      return NextResponse.json({
        statusCode: 200,
        success: true,
        message: "Products found based on product details",
        data: allProducts,
        pagination: {
          currentPage: page,
          totalItems: allProducts.length, // You can also send the total items count from DB if needed
          totalPages: Math.ceil(allProducts.length / limit),
        },
      });
    }
    // Step 3: If category exists, fetch products linked to the category with pagination
    const productsByCategory = await productModel
      .find({ categoryId: category._id }) // Match products with the categoryId
      .skip(skip) // Skip products based on the page
      .limit(limit) // Limit the number of products to 20
    // If no products are found for the category
    if (productsByCategory.length === 0) {
      return NextResponse.json(
        {
          statusCode: 404,
          success: false,
          message: "No products found for the given category",
          data: null,
        },
        { status: 404 }
      );
    }
    // Step 4: Return the products found for the category along with pagination details
    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Selected products found",
      data: productsByCategory,
      pagination: {
        currentPage: page,
        totalItems: productsByCategory.length, // Adjust totalItems based on actual count
        totalPages: Math.ceil(productsByCategory.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        statusCode: 500,
        success: false,
        message: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
}
