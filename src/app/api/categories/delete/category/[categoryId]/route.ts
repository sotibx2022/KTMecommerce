import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        connectToDB()
        const url = new URL(req.url);
        const pathSegments = url.pathname.split('/');
        const categoryId = pathSegments.pop();
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