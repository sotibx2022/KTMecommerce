import { Category, Subcategory } from "@/app/types/categories";
import { connectToDB } from "@/config/db";
import CategoryModel, { ISubcategory } from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    connectToDB()
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const parentCategory = params.get('parentCategory');
    const categories = await CategoryModel.find();
    let subcategories: Subcategory[] = []
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
    let filterCategory = [];
    if (parentCategory) {
        filterCategory = subcategories.filter((subCat) => {
            return subCat.parentCategoryName === parentCategory
        })
    } else {
        filterCategory = subcategories
    }
    return NextResponse.json({ message: "Array of subcategories is", filterCategory });
}