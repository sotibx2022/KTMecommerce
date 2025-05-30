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
            brand,
            stock,
            variant,
            isNewArrival,
            isTrendingNow,
            isTopSell,
            isOfferItem,
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
        if (brand) filterQuery.brand = brand;
        if (variant) filterQuery.variant = variant;
        if (stock !== undefined) filterQuery.stockAvailability = stock;
        if (isNewArrival !== undefined) filterQuery.isNewArrivals = true;
        if (isTrendingNow !== undefined) filterQuery.isTrendingNow = true;
        if (isTopSell !== undefined) filterQuery.isTopSell = true;
        if (isOfferItem !== undefined) filterQuery.isOfferItem = true;
        // Rating sorting
        if (rating !== undefined) {
            sortOptions.overallRating = (rating === 'ascending') ? 1 : -1;
        }
        // Price sorting and filtering
        if (price !== undefined) {
            sortOptions.price = (price === 'ascending') ? 1 : -1;
        }
        // Price range filtering
        if (minPrice || maxPrice) {
            filterQuery.price = {};
            if (minPrice) filterQuery.price.$gte = Number(minPrice);
            if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
        } else if (price === undefined && !minPrice && !maxPrice) {
            if (price) filterQuery.price = Number(price);
        }
        if(created){
           sortOptions.createdAt =  (created === "assending")? 1 :-1
        }
        if(updated){
sortOptions.updatedAt = (updated==="assending")?1:-1
        }
        if (keyword) {
  const keywordRegex = new RegExp(keyword, 'i'); // Case-insensitive regex
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
  .select('-productDescription -productFeatures') // Remove comma
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
                products: allProducts,
            }
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}