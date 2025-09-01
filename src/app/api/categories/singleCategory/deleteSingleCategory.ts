import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export const deleteSingleCategory = async (req: NextRequest, categoryId: string) => {
    try {
        // 1. Verify admin authorization
      await checkAdminAuthorization(req);
        // 2. Validate category ID format
        if (!categoryId || !/^[0-9a-fA-F]{24}$/.test(categoryId)) {
            return NextResponse.json(
                { message: "Invalid category ID format", success: false },
                { status: 400 }
            );
        }
        // 3. Delete category
        const deleteResult = await Category.findOneAndDelete({ _id: categoryId });
        if (!deleteResult) {
            return NextResponse.json(
                { message: "Category not found", success: false },
                { status: 404 }
            );
        }
        // 4. Return success response
        return NextResponse.json(
            {
                message: "Category deleted successfully",
                success: true,
                deletedCategory: deleteResult // Optional: Return deleted document
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Category deletion error:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
};