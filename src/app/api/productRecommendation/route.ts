import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
import { classifyProductCategory } from "./classifyProductCategory";
import { classifyProductPrice } from "./classifyProductPrice";
import { connectToDB } from "@/config/db";
import { classifyProductModel } from "./classifyProductModel";
import { productModel } from "@/models/products.model";
export async function POST(req: NextRequest) {
    await connectToDB();
    const { productRecommendationText } = await req.json();
    // Fetch categories
    const categories = await CategoryModel.find().select("category_name");
    const validCategories = categories.map(c => c.category_name);
    // Classify main category
    const { categoryName: catName } = await classifyProductCategory(
        productRecommendationText,
        validCategories
    );
    if (
        catName === 'null' ||
        catName === null ||
        catName === "uncategorized"
    ) {
        return NextResponse.json({ message: "Please Refine Text,Product Not Found", success: false });
    }
    // Fetch subcategories
    const subCategoryDoc = await CategoryModel.findOne({ category_name: catName }).select("subcategories");
    if (!subCategoryDoc) {
        return NextResponse.json({ message: "Please Refine Text,Product Not Found", success: false });
    }
    let validSubcategories = subCategoryDoc.subcategories.map(
        (sc: { category_name: string }) => sc.category_name
    );
    // Classify subcategory
    const { categoryName: subCatName } = await classifyProductCategory(
        productRecommendationText,
        validSubcategories
    );
    // Price classification
    const { minPrice, maxPrice, priceOrder } = await classifyProductPrice(productRecommendationText);
    // Product model classification
    const productModelResult = await classifyProductModel(productRecommendationText);
    // Build match stage base
    const baseMatchStage: Record<string, any> = {
        categoryName: catName,
        subCategoryName: subCatName === 'uncategorized' ? validSubcategories[0] : subCatName
    };
    // Multi-word partial search - STRICT (all words must match)
    const words = productModelResult?.split(/\s+/).filter(Boolean);
    const strictConditions = words?.map(word => ({
        $or: [
            { productName: { $regex: word, $options: "i" } },
            { productDescription: { $regex: word, $options: "i" } }
        ]
    }));
    let matchStage: Record<string, any> = { ...baseMatchStage, $or: strictConditions };
    // Add price filter
    if (minPrice != null || maxPrice != null) {
        matchStage.price = {};
        if (minPrice != null) matchStage.price.$gte = minPrice;
        if (maxPrice != null) matchStage.price.$lte = maxPrice;
    }
    // Sort stage
    const sortStage: Record<string, 1 | -1> = {
        price: priceOrder === "desc" ? -1 : 1
    };
    // Run aggregation (strict search, random sample)
    let products = await productModel.aggregate([
        { $match: matchStage },
        { $sort: sortStage },
        { $sample: { size: 1 } }
    ]);
    if (!products || products.length === 0) {
        return NextResponse.json({ message: "Please Refine Text,Product Not Found", success: false });
    }
    return NextResponse.json({ message: "Best Matching Product found", data: products[0], success: true });
}
