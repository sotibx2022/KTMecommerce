import updateRating from "@/app/services/apiFunctions/updateOverallRating";
import { productModel } from "@/models/products.model";
import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
  try {
    connectToDB()
    const requestBody = await req.json();
    const userId = await getUserIdFromCookies(req);
    const {
      reviewedBy,
      reviewDescription,
      productIdentifier,
      rating,
      reviewerImage,
    } = requestBody;
    const { productId, productName, productImage } = productIdentifier || {};
    const userEmail = reviewedBy?.email;
    // Validation checks
    if (!reviewedBy || !reviewDescription || !productId || !rating) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    const reviewerObject = {
      ...reviewedBy,
      userId: userId?.toString(),
    };
    const productObjectId = new Object(productId);
    const product = await productModel.findById(productObjectId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }
    const review = await remarksModel.findOne({
      "reviewedBy.userId": userId,
      productId: productId,
    });
    if (review) {
      return NextResponse.json({
        message: "Only single review allowed for the same product",
        success: false,
        status: 400,
      });
    }
    const remark = new remarksModel({
      reviewedBy: reviewerObject,
      reviewDescription,
      productIdentifier: {
        productId: productObjectId,
        productName,
        productImage,
      },
      rating,
      reviewerImage,
    });
    await remark.save();
    await updateRating(productIdentifier.productId);
    return NextResponse.json(
      {
        message: "Review submitted successfully",
        success: true,
        data: remark,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to submit review",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
