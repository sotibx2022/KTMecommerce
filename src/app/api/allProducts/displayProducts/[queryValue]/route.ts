import { NextRequest, NextResponse } from "next/server";
import { returnQueryParams } from "./returnQueryParams";
import { productModel } from "@/models/products.model";
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
        const filterQuery: any = {};
        const sortOptions: any = {};
        // Basic filters
        if (category) {
            filterQuery.$or = [
                { categoryName: new RegExp(category, 'i') }
            ];
        }
        if (subCategory) {
            filterQuery.subCategoryName = new RegExp(subCategory, 'i');
        }
        if (variant) {
            filterQuery.variant = variant;
        }
        if (stock !== undefined) {
            filterQuery.stockAvailability = stock;
        }
        if (isNewArrival !== undefined) {
            filterQuery.isNewArrivals = true;
        }
        if (isTrendingNow !== undefined) {
            filterQuery.isTrendingNow = true;
        }
        if (isTopSell !== undefined) {
            filterQuery.isTopSell = true;
        }
        if (isOfferItem !== undefined) {
            filterQuery.isOfferItem = true;
        }
        if (isRegular !== undefined) {
            filterQuery.$and = [
                { isTrendingNow: false },
                { isNewArrivals: false },
                { isTopSell: false },
                { isOfferItem: false }
            ];
        }
        // Sorting options
        if (rating !== undefined) {
            sortOptions.overallRating = (rating === 'ascending') ? 1 : -1;
        }
        if (price !== undefined) {
            sortOptions.price = (price === 'ascending') ? 1 : -1;
        }
        if (created) {
            sortOptions.createdAt = (created === "ascending") ? 1 : -1;
        }
        if ((updated)) {
            sortOptions.updatedAt =(((updated)) === "ascending") ? 1 : -1;
        }
        // Price range filtering
        if (minPrice || maxPrice) {
            filterQuery.price = {};
            if (minPrice) {
                filterQuery.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                filterQuery.price.$lte = Number(maxPrice);
            }
        } else if (price === undefined && !minPrice && !maxPrice) {
            if (price) {
                filterQuery.price = Number(price);
            }
        }
        // Keyword search
        if (keyword) {
            const keywordRegex = new RegExp(keyword, 'i');
            filterQuery.$or = [
                { productName: keywordRegex },
                { categoryName: keywordRegex },
                { subCategoryName: keywordRegex }
            ]; 
        }
        // Pagination
        const currentPage = Number(page) || 1;
        const pageSize = Number(limit) || 10;
        const skip = (currentPage - 1) * pageSize;
        const allProducts = await productModel.find(filterQuery)
            .sort(sortOptions)
            .select('-productDescription -productFeatures')
            .skip(skip)
            .limit(pageSize)
            .lean();
        const totalProducts = await productModel.countDocuments(filterQuery);
        return NextResponse.json({ 
            message: "Products fetched successfully", 
            success: true, 
            data: { 
                pagination: { 
                    currentPage, 
                    pageSize, 
                    totalProducts, 
                    totalPages: Math.ceil(totalProducts / pageSize) 
                }, 
                products: allProducts 
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
