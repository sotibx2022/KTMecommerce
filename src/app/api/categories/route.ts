import { connectToDB } from "@/config/db";
import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
      await connectToDB();
      const category = await CategoryModel.find();
      if (!category) {
        return NextResponse.json({ message: "No categories found" });
      }
      return NextResponse.json({ message: "Category structure", category });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching category" });
    }
  }
