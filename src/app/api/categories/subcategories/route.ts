interface ISubCategory {
    _id: string;
    category_name: string;
    image_url: string;
    parentCategoryName: string;
    parentCategoryId: string;
}
import categoryText2Id from "@/app/services/apiFunctions/categoryText2Id";
import { Category, Subcategory } from "@/app/types/categories";
import { connectToDB } from "@/config/db";
import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    connectToDB();
    const categories = await CategoryModel.find();
    let subcategories: ISubCategory[] = []
    categories.forEach((category: Category) => {
        category.subcategories.forEach((subCategory: Subcategory) => {
            subcategories.push({
                _id: subCategory._id ?? "notavailable",
                category_name: subCategory.category_name, // fixed case
                image_url: subCategory.image_url,
                parentCategoryName: category.category_name,
                parentCategoryId: category._id ?? "notavailable",
            });
        });
    });
    return NextResponse.json({ message: "THis is array of subcategories", subcategories });
}