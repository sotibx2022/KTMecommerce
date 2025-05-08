import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
      // Fetch a single category document to inspect its structure
      const category = await CategoryModel.find();
      if (!category) {
        return NextResponse.json({ message: "No categories found" });
      }
      return NextResponse.json({ message: "Category structure", category });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching category" });
    }
  }
