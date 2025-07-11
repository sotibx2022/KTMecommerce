import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { productModel } from "@/models/products.model";
import updateRating from "@/app/services/apiFunctions/updateOverallRating";
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
    const remarks = await remarksModel.find({ 'productIdentifier.productId': productObjectId });
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
export async function POST(req: NextRequest) {
  try {
    const { action, productId, userId, reviewDescription } = await req.json();
    if (!action || !productId || !userId) {
      return NextResponse.json(
        { message: "Required fields missing", success: false },
        { status: 400 }
      );
    }
    const productObjectId = new Object(productId)
    const remark = await remarksModel.findOne({
      'productIdentifier.productId': productObjectId,
      'reviewedBy.userId': userId
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
        remark.reviewDescription = reviewDescription;
        await remark.save();
        await updateRating(productId);
        return NextResponse.json(
          { message: "Updated successfully", success: true, data: remark },
          { status: 200 }
        );
      default:
        return NextResponse.json(
          { message: "Invalid action", success: false },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}