import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
import { classifyProductCategory } from "./classifyProductCategory";
export async function POST(req: NextRequest) {
    const { productRecommendationText } = await req.json();
    const categories = await CategoryModel.find().select("category_name");
    const validCategoris = categories.map((category, index) => {
        return category.category_name
    })
    const { categoryName:catName } = await classifyProductCategory(productRecommendationText, validCategoris);
    if (catName !== "uncategorized") {
        const subcategories = await CategoryModel.findOne({ category_name: catName }).select("subcategories");
        const subcategoriesArray = subcategories.subcategories
        const validSubcategories = subcategoriesArray.map((subCategory: { category_name: string; }, index: number) => {
            return subCategory.category_name
        })
        const {categoryName:subCatName} = await classifyProductCategory(productRecommendationText,validSubcategories);
        console.log("catName is :-",catName);
        console.log("subCategory is :-", subCatName)
    }
    return NextResponse.json({ message:"success" })
}