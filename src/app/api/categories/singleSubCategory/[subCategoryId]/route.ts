import { connectToDB } from "@/config/db";
import Category, { ISubcategory } from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(request: NextRequest) {
    try {
        console.log("1. Starting GET request for subcategory");
        await connectToDB();
        console.log("2. Successfully connected to database");
        // Extract subCategoryId from URL
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const subCategoryId = pathSegments.pop();
        console.log(`3. Extracted subCategoryId: ${subCategoryId}`);
        // Validate ID format
        if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
            console.log("4. Validation failed - Invalid subcategory ID format");
            return NextResponse.json(
                { message: "Invalid subcategory ID format", success: false },
                { status: 400 }
            );
        }
        console.log("5. Starting aggregation pipeline...");
        const result = await Category.aggregate([
            // Match all categories that contain subcategories
            { $match: { subcategories: { $exists: true, $ne: [] } } },
            // Unwind to deconstruct the subcategories array
            { $unwind: "$subcategories" },
            // Match only the specific subcategory we want
            { $match: { "subcategories._id": new mongoose.Types.ObjectId(subCategoryId) } },
            // Replace root to promote the subcategory to top level
            { $replaceRoot: { newRoot: "$subcategories" } },
            // Optionally add parent category reference
            {
                $addFields: {
                    parentCategoryId: "$_id", // This would actually be the subcategory ID
                    // If you need the actual parent category ID, you would need to:
                    // parentCategoryId: "$_parent._id" (requires preserving parent in previous stages)
                }
            }
        ]);
        console.log(`6. Aggregation result: ${JSON.stringify(result, null, 2)}`);
        if (result.length === 0) {
            console.log("7. No matching subcategory found");
            return NextResponse.json(
                { message: "Subcategory not found", success: false },
                { status: 404 }
            );
        }
        console.log("8. Subcategory found successfully");
        return NextResponse.json(
            {
                message: "Subcategory retrieved successfully",
                data: result[0], // Return the first (and should be only) match
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("9. Error in GET request:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
}