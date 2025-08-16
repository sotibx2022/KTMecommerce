import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const categories = await Category.find()
      .lean()
      .select("category_name subcategories");
    const data = categories.map((cat: any) => ({
      category_name: cat.category_name,
      subcategories: cat.subcategories.map((sub: any) => ({
        category_name: sub.category_name,
      })),
    }));
    return NextResponse.json({
      message: "Categories found successfully",
      status: 200,
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error fetching categories",
      status: 500,
      success: false,
    });
  }
}
