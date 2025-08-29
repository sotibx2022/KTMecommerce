import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import updateRating from "@/app/services/apiFunctions/updateOverallRating";
import { analyzeRemarks } from "../addRemarks/analyzeRemark";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const productId = pathSegments.pop();
    const userId = await getUserIdFromCookies(req);
    const { action, reviewDescription } = await req.json();
    // Validate required fields
    if (!action || !productId || !userId) {
      return NextResponse.json(
        { message: "Required fields missing", success: false },
        { status: 400 }
      );
    }
    // Convert IDs to ObjectId for DB lookup
    const productObjectId = new mongoose.Types.ObjectId(productId as string);
    const userObjectId = new mongoose.Types.ObjectId(userId as string);
    // Fetch existing remark
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
        const productName = remark.productIdentifier.productName;
        const rating = parseInt(remark.rating as string) || 3;
        const reviewSentiment = await analyzeRemarks(productName, reviewDescription, rating);
        if (reviewSentiment === 'Negative') {
          return NextResponse.json(
            {
              message: "Your review was rejected by the analyzer. Please provide constructive, product-related feedback.",
              success: false,
            },
            { status: 422 }
          );
        }
        remark.reviewDescription = reviewDescription;
        remark.reviewSentiment = reviewSentiment as 'Positive' | 'Neutral';
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
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const productId = pathSegments.pop();
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID format", success: false },
        { status: 400 }
      );
    }
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const remarks = await remarksModel.find({
      'productIdentifier.productId': productObjectId,
      reviewSentiment: 'Positive'
    });
    return NextResponse.json({
      message: "Remarks found successfully",
      success: true,
      data: remarks,
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to fetch remarks",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}