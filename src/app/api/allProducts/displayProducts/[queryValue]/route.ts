import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { returnQueryParams } from "./returnQueryParams";
import { connectToDB } from "@/config/db";
export async function GET(req: NextRequest) {
    await connectToDB();
    try {
        const url = new URL(req.url);
        const params = returnQueryParams(url);
        const {
            keyword,
            category,
            subCategory,
            stock,
            variant,
            isNewArrival,
            isTrendingNow,
            isTopSell,
            isOfferItem,
            isRegular,
            page,
            limit,
            rating,
            price,
            minPrice,
            maxPrice,
            created,
            updated
        } = params;
        // 1. Build $match stage with proper AND/OR logic
        const matchStage: any = {};
        // Keyword search
        if (keyword) {
            const keywordRegex = new RegExp(keyword, 'i');
            matchStage.$or = [
                { productName: keywordRegex },
                { productDescription: keywordRegex },
                { categoryName: keywordRegex },
                { subCategoryName: keywordRegex },
                { brand: keywordRegex }
            ];
        }
        // Category/Subcategory filters (AND)
        if (category) {
            matchStage.categoryName = { $regex: new RegExp(`^${category}$`, 'i') };
        }
        if (subCategory) {
            matchStage.subCategoryName = { $regex: new RegExp(`^${subCategory}$`, 'i') };
        }
        // Boolean flags
        if (isNewArrival !== undefined) {
            matchStage.isNewArrivals = isNewArrival === 'true';
        }
        if (isTrendingNow !== undefined) {
            matchStage.isTrendingNow = isTrendingNow === 'true';
        }
        if (isTopSell !== undefined) {
            matchStage.isTopSell = isTopSell === 'true';
        }
        if (isOfferItem !== undefined) {
            matchStage.isOfferItem = isOfferItem === 'true';
        }
        if (isRegular !== undefined) {
            matchStage.isRegular = isRegular === 'true';
        }
        // Stock filter
        if (stock !== undefined) {
            matchStage.inStock = stock === 'true';
        }
        // Variant filter
        if (variant) {
            matchStage["variants.name"] = { $regex: new RegExp(variant, "i") };
        }
        // Price range filtering
        if (minPrice || maxPrice) {
            matchStage.price = {};
            if (minPrice) matchStage.price.$gte = Number(minPrice);
            if (maxPrice) matchStage.price.$lte = Number(maxPrice);
        }
        // 2. Sort stage
        const sortStage: any = {};
        if (rating !== undefined)
            sortStage.overallRating = rating === 'ascending' ? 1 : -1;
        if (price !== undefined)
            sortStage.price = price === 'ascending' ? 1 : -1;
        if (created !== undefined)
            sortStage.createdAt = created === "ascending" ? 1 : -1;
        if (updated !== undefined)
            sortStage.updatedAt = updated === "ascending" ? 1 : -1;
        // 3. Build aggregation pipeline
        const pipeline: any[] = [
            { $match: matchStage }
        ];
        // Add $sort if defined
        if (Object.keys(sortStage).length > 0) {
            pipeline.push({ $sort: sortStage });
        } else {
            pipeline.push({ $sort: { _id: 1 } }); // Default sort
        }
        pipeline.push({
            $facet: {
                metadata: [
                    { $count: "total" },
                    {
                        $addFields: {
                            page: Number(page) || 1,
                            limit: Number(limit) || 10
                        }
                    }
                ],
                data: [
                    { $skip: ((Number(page) || 1) - 1) * (Number(limit) || 10) },
                    { $limit: Number(limit) || 10 },
                    { $project: { productFeatures: 0, url_slug: 0 } }
                ]
            }
        });
        const [result] = await productModel.aggregate(pipeline);
        return NextResponse.json({
            message: "Products fetched successfully",
            success: true,
            data: {
                pagination: {
                    currentPage: result?.metadata?.[0]?.page || 1,
                    pageSize: result?.metadata?.[0]?.limit || 10,
                    totalProducts: result?.metadata?.[0]?.total || 0,
                    totalPages: Math.ceil(
                        (result?.metadata?.[0]?.total || 0) /
                        (result?.metadata?.[0]?.limit || 10)
                    )
                },
                products: result?.data || []
            }
        });
    } catch (error) {
        console.error("Error fetching products.", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
