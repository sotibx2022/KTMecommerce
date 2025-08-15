import { findCategoryObjfromCategoryText } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const authorizationResponse = await checkAdminAuthorization(req);
    const { message, success: authorizationCheckSuccess, status } = authorizationResponse;
    if (!authorizationCheckSuccess) {
      return NextResponse.json(
        { message, authorizationCheckSuccess, status: status || 401 },
        { status: status || 401 }
      );
    }
    const formData = await req.formData();
    const subCategoryName = formData.get('subCategoryName') as string;
    const parentCategory = formData.get('parentCategory') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const file = formData.get('file') as File;
    if (!subCategoryName || !metaTitle || !metaDescription || !file || !parentCategory) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }
    const { success, profileUrl } = await uploadImage(
      file,
      "CategoryImage",
      file.type,
      `IconOf${subCategoryName}Category`
    );
    if (!success || !profileUrl) {
      return NextResponse.json(
        { message: "Failed to upload image", success: false },
        { status: 500 }
      );
    }
    const categoryId = await findCategoryObjfromCategoryText(parentCategory);
    const newSubCategory = new Category({
      parentCategory: parentCategory,
      parentCategoryId: categoryId.toString(),
      category_name: subCategoryName,
      image_url: profileUrl,
      meta_title: metaTitle,
      meta_description: metaDescription,
    });
    const savedCategory = await newSubCategory.save();
    if (!savedCategory) {
      throw new Error("Failed to save category");
    }
    return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
        data: savedCategory
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Internal server error",
        success: false
      },
      { status: 500 }
    );
  }
}