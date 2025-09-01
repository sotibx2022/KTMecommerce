import { findCategoryNamefromCategoryId, findCategoryObjfromCategoryText } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { getPublicId } from "@/app/services/helperFunctions/uploadImageHelpers";
import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
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
export async function POST(req:NextRequest){
   try {
          await checkAdminAuthorization(req);
          // 1. Connect to database
          await connectToDB();
          // 2. Extract category ID from URL
          const url = new URL(req.url);
          const pathSegments = url.pathname.split('/');
          const categoryId = pathSegments.pop();
          // 3. Validate category ID format
          if (!categoryId || !/^[0-9a-fA-F]{24}$/.test(categoryId)) {
              return NextResponse.json(
                  { message: "Invalid category ID format", success: false },
                  { status: 400 }
              );
          }
          // 4. Parse and validate form data
          const formData = await req.formData();
          const subCategoryName = formData.get('categoryName')?.toString()?.trim() || '';
          const metaTitle = formData.get('metaTitle')?.toString()?.trim() || '';
          const metaDescription = formData.get('metaDescription')?.toString()?.trim() || '';
          const file = formData.get('file') as File | null;
          const parentCategory=formData.get('parentCategory')?.toString().trim() || ""
          // 5. Validate all required fields
          if (!subCategoryName || !metaTitle || !metaDescription || !file || parentCategory) {
              return NextResponse.json(
                  { message: "All fields are required", success: false },
                  { status: 400 }
              );
          }
          // 6. Check if category exists
          const existingCategory = await Category.findOne({ _id: categoryId });
          if (!existingCategory) {
              return NextResponse.json(
                  { message: "Category not found", success: false },
                  { status: 404 }
              );
          }
          // 7. Handle image upload (with existing image replacement)
          const publicId = getPublicId(existingCategory.image_url) as string;
          const { success, profileUrl } = await uploadImage(
              file,
              "CategoryImage",
              file.type,
              `IconOf${subCategoryName}Category`,
              publicId
          );
          if (!success || !profileUrl) {
              return NextResponse.json(
                  { message: "Image upload failed", success: false },
                  { status: 500 }
              );
          }
          const parentCategoryId = await findCategoryObjfromCategoryText(parentCategory)
          // 8. Update category
          existingCategory.category_name = subCategoryName;
          existingCategory.image_url = profileUrl;
          existingCategory.meta_title = metaTitle;
          existingCategory.meta_description = metaDescription;
          existingCategory.parentCategory=parentCategory;
          existingCategory.parentCategoryId= parentCategoryId;
          await existingCategory.save();
          // 9. Return success response
          return NextResponse.json(
              {
                  message: "Category updated successfully",
                  data: existingCategory,
                  success: true
              },
              { status: 200 }
          );
      } catch (error) {
          console.error("Category update error:", error);
          return NextResponse.json(
              {
                  message: "Internal server error",
                  success: false
              },
              { status: 500 }
          );
      }
}