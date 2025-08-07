import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { returnQueryParams } from "./returnQueryParams";
import { connectToDB } from "@/config/db";
export async function GET(req: NextRequest) {
    connectToDB();
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
        // 1. Build $match stage (filters)
        const matchStage: any = {};
        if (keyword) {
            matchStage.$or = [
                { productName: new RegExp(keyword, 'i') },
                { categoryName: new RegExp(keyword, 'i') }
            ];
        }
        if (category) {
            matchStage.categoryName = new RegExp(category, 'i');
        }
         if (minPrice || maxPrice) {
            if (minPrice) {
                matchStage.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                matchStage.price.$lte = Number(maxPrice);
            }
        }
          if (subCategory) {
            matchStage.subCategoryName = new RegExp(subCategory, 'i');
        }
        if (variant) {
            matchStage.variant = variant;
        }
        if (stock !== undefined) {
            matchStage.stockAvailability = stock;
        }
        if (isNewArrival !== undefined) {
            matchStage.isNewArrivals = true;
        }
        if (isTrendingNow !== undefined) {
            matchStage.isTrendingNow = true;
        }
        if (isTopSell !== undefined) {
            matchStage.isTopSell = true;
        }
        if (isOfferItem !== undefined) {
            matchStage.isOfferItem = true;
        }
        if (isRegular !== undefined) {
            matchStage.$and = [
                { isTrendingNow: false },
                { isNewArrivals: false },
                { isTopSell: false },
                { isOfferItem: false }
            ];
        }
        const sortStage: any = {};
       if (rating !== undefined) {
            sortStage.overallRating = (rating === 'ascending') ? 1 : -1;
        }
        if (price !== undefined) {
            sortStage.price = (price === 'ascending') ? 1 : -1;
        }
        if (created) {
            sortStage.createdAt = (created === "ascending") ? 1 : -1;
        }
        if ((updated)) {
            sortStage.updatedAt =(((updated)) === "ascending") ? 1 : -1;
        }
        const pipeline = [
            { $match: matchStage },
            { $sort: sortStage },
            {
                $facet: {
                    metadata: [
                        { $count: "total" },
                        {
                            $addFields: {
                                page: Number(params.page) || 1,
                                limit: Number(params.limit) || 10
                            }
                        }
                    ],
                    data: [
                        { $skip: (Number(params.page) - 1) * (Number(params.limit) || 10) },
                        { $limit: Number(params.limit) || 10 },
                        { $project: { productFeatures: 0 } } // Exclude fields
                    ]
                }
            },
            { $unwind: "$metadata" }, // Flatten the metadata
        ];
        const [result] = await productModel.aggregate(pipeline);
        return NextResponse.json({
            message: "Products fetched successfully",
            success: true,
            data: {
                pagination: {
                    currentPage: result?.metadata?.page || 1,
                    pageSize: result?.metadata?.limit || 10,
                    totalProducts: result?.metadata?.total || 0,
                    totalPages: Math.ceil(
                        (result?.metadata?.total || 0) /
                        (result?.metadata?.limit || 10))
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