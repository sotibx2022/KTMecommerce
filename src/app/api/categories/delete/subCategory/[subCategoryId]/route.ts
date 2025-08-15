import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const url = new URL(req.url);
        const pathSegments = url.pathname.split('/');
        const parentCategoryId = pathSegments.pop();
        const { subCategoryId } = await req.json();
        // 1. Verify admin authorization
        const authorizationResponse = await checkAdminAuthorization(req);
        const { message, success, status } = authorizationResponse;
        if (!success) {
            return NextResponse.json(
                { message, success, status: status || 401 },
                { status: status || 401 }
            );
        }
        // 2. Validate category ID format
        if (!parentCategoryId || !subCategoryId) {
            return NextResponse.json(
                { message: "Category ID and SubCategory ID are required.", success: false },
                { status: 400 }
            );
        }
        // 3. Find and update the parent category to remove the subcategory
        const parentCategory = await Category.findById(parentCategoryId);
        if (!parentCategory) {
            return NextResponse.json(
                { message: "Parent category not found", success: false },
                { status: 404 }
            );
        }
        // Find the index of the subcategory to remove
        const subCategoryIndex = parentCategory.subCategories.findIndex(
            (subCat: any) => subCat._id.toString() === subCategoryId
        );
        if (subCategoryIndex === -1) {
            return NextResponse.json(
                { message: "Subcategory not found", success: false },
                { status: 404 }
            );
        }
        // Remove the subcategory from the array
        const deletedSubCategory = parentCategory.subCategories.splice(subCategoryIndex, 1)[0];
        // Save the updated parent category
        await parentCategory.save();
        // 4. Return success response
        return NextResponse.json(
            {
                message: "Subcategory deleted successfully",
                success: true,
                deletedSubCategory // Return the deleted subcategory document
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Subcategory deletion error:", error);
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
};