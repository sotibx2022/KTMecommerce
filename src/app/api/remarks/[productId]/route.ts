import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import updateRating from "@/app/services/apiFunctions/updateOverallRating";
import { analyzeRemarks } from "../addRemarks/analyzeRemark";
export async function POST(req: NextRequest) {
  try {
    const { action, productId, userId, reviewDescription } = await req.json();
    if (!action || !productId || !userId) {
      return NextResponse.json(
        { message: "Required fields missing", success: false },
        { status: 400 }
      );
    }
    // Convert IDs to ObjectId for matching
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const remark = await remarksModel.findOne({
      'productIdentifier.productId': productObjectId,
      'reviewedBy.userId': userObjectId
    });
    if (!remark) {
      return NextResponse.json(
        { message: "Remark not found", success: false },
        { status: 404 }
      );
    }
    switch (action) {
      case 'delete':
        await remark.deleteOne();
        await updateRating(productId);
        return NextResponse.json(
          { message: "Deleted successfully", success: true },
          { status: 200 }
        );
      case 'edit':
        if (!reviewDescription) {
          return NextResponse.json(
            { message: "Updated content required", success: false },
            { status: 400 }
          );
        }
        // Run sentiment analyzer
        const productName = remark.productIdentifier.productName;
        const rating = parseInt(remark.rating as any) || 3; // fallback rating if not available
        const reviewSentiment = await analyzeRemarks(productName, reviewDescription, rating);
        // If negative, reject without saving
        if (reviewSentiment === 'Negative') {
          return NextResponse.json(
            {
              message: "Your review was rejected by the analyzer. Please provide constructive, product-related feedback.",
              success: false,
            },
            { status: 422 }
          );
        }
        // Otherwise, update and save
        remark.reviewDescription = reviewDescription;
        remark.reviewSentiment = reviewSentiment as 'Positive' | 'Neutral'
        await remark.save();
        await updateRating(productId);
        return NextResponse.json(
          {
            message: "Updated successfully",
            success: true,
            data: remark,
          },
          { status: 200 }
        );
      default:
        return NextResponse.json(
          { message: "Invalid action", success: false },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", success: false, error: error.message },
      { status: 500 }
    );
  }
}
