import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import { startOfMonth } from 'date-fns';
export async function GET(req: NextRequest) {
    try {
        // Connect to database
        await connectToDB();
        // Fetch all data in parallel for better performance
        const [
            activeProducts,
            inactiveProducts,
            lowStockProducts,
            outOfStockProducts,
            newThisMonthProducts,
            ratingResult,
            totalReviews
        ] = await Promise.all([
            productModel.countDocuments({ status: 'active' }),
            productModel.countDocuments({ status: 'inActive' }),
            productModel.countDocuments({ remainingStock: { $lt: 5 } }),
            productModel.countDocuments({ remainingStock: { $eq: 0 } }),
            productModel.countDocuments({
                createdAt: {
                    $gte: startOfMonth(new Date()),
                    $lte: new Date()
                }
            }),
            productModel.aggregate([
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$overallRating" }
                    }
                }
            ]),
            remarksModel.countDocuments()
        ]);
        const overallRating = ratingResult[0]?.averageRating || 0;
        return NextResponse.json({
            message: "Products summary data retrieved successfully",
            success: true,
            productsSummaryData: {
                activeProducts,
                inactiveProducts,
                lowStockProducts,
                outOfStockProducts,
                newThisMonthProducts,
                overallRating,
                totalReviews
            }
        });
    } catch (error: any) {
        console.error("Error in GET /api/products/summary:", error);
        return NextResponse.json(
            { 
                message: error.message || "Failed to fetch products summary",
                success: false 
            },
            { status: 500 }
        );
    }
}