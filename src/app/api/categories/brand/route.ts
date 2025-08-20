import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const brandsArray = await Category.aggregate([
      // Step 1: unwind subcategories array so that each subcategories from all categories will be treated as individual documents.
      { $unwind: "$subcategories" },
      // Step 2: project only the needed fields where _id:0 means we dont need _id in the project.
      {
        $project: {
          _id: 0,
          brandName: "$subcategories.category_name",
          brandImageUrl: "$subcategories.image_url",
        },
      },
      // Step 3: optional - group by brand name to avoid duplicates, if there are any duplicated brands then we will take the first image of brand.
      {
        $group: {
          _id: "$brandName",
          brandImageUrl: { $first: "$brandImageUrl" },
        },
      },
      // Step 4: rename _id → brandName for clean response
      {
        $project: {
          _id: 0,
          brandName: "$_id",
          brandImageUrl: 1,
        },
      },
    ]);
    return NextResponse.json({
      message: "Brand Details found successfully",
      brandsArray: brandsArray,
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", success: false, status: 500 },
      { status: 500 }
    );
  }
}
