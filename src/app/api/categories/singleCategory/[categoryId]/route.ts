import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { getPublicId } from "@/app/services/helperFunctions/uploadImageHelpers";
import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
import { deleteSingleCategory } from "../deleteSingleCategory";
import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
export async function GET(request: NextRequest) {
    try {
        // 1. Connect to database
        await connectToDB();
        // 2. Extract category ID from URL
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const categoryId = pathSegments.pop();
        // 3. Validate category ID
        if (!categoryId || !/^[0-9a-fA-F]{24}$/.test(categoryId)) {
            return NextResponse.json(
                { message: "Invalid category ID format", success: false },
                { status: 400 }
            );
        }
        // 4. Query the category
        const existingCategory = await Category.findOne({ _id: categoryId }).lean();
        if (!existingCategory) {
            return NextResponse.json(
                { message: "Category not found", success: false },
                { status: 404 }
            );
        }
        // 5. Return successful response
        return NextResponse.json(
            {
                message: "Category retrieved successfully",
                data: existingCategory,
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
}
export async function POST(req: NextRequest) {
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
        const categoryName = formData.get('categoryName')?.toString()?.trim() || '';
        const metaTitle = formData.get('metaTitle')?.toString()?.trim() || '';
        const metaDescription = formData.get('metaDescription')?.toString()?.trim() || '';
        const file = formData.get('file') as File | null;
        // 5. Validate all required fields
        if (!categoryName || !metaTitle || !metaDescription || !file) {
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
            `IconOf${categoryName}Category`,
            publicId
        );
        if (!success || !profileUrl) {
            return NextResponse.json(
                { message: "Image upload failed", success: false },
                { status: 500 }
            );
        }
        // 8. Update category
        existingCategory.category_name = categoryName;
        existingCategory.image_url = profileUrl;
        existingCategory.meta_title = metaTitle;
        existingCategory.meta_description = metaDescription;
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