import { connectToDB } from "@/config/db";
import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await connectToDB();
    // Extract subcategory name from URL
    const url = new URL(req.url);
    const subCategoryName = url.pathname.split("/").pop();
    // Validate subcategory name
    if (!subCategoryName) {
      return NextResponse.json(
        { error: "Subcategory name is required" },
        { status: 400 }
      );
    }
    // Find category in database
  const category = await CategoryModel.findOne({ 
  category_name: { 
    $regex: new RegExp(`^${subCategoryName}$`, "i") 
  } 
})
.select('subcategories.category_name').lean();
    // Handle case when category is not found
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    // Return successful response
    return NextResponse.json({ 
      success: true,
      data: category
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}