import { connectToDB } from "@/config/db";
import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    await connectToDB();
    const url = new URL(req.url);
    const parentCategory = url.searchParams.get("parentCategory");
    // Build aggregation pipeline
    const pipeline: any[] = [
        { $unwind: "$subcategories" },
        {
            $project: {
                _id: { $ifNull: ["$subcategories._id", "notavailable"] },
                category_name: "$subcategories.category_name",
                image_url: "$subcategories.image_url",
                parentCategoryName: "$category_name",
                parentCategoryId: { $ifNull: ["$_id", "notavailable"] },
            },
        },
    ];
    // Optional filter stage if parentCategory is provided
    if (parentCategory) {
        pipeline.push({ $match: { parentCategoryName: parentCategory } });
    }
    const subcategories = await CategoryModel.aggregate(pipeline);
    return NextResponse.json({
        message: "Array of subcategories",
        subcategories,
    });
}
