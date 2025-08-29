import updateRating from "@/app/services/apiFunctions/updateOverallRating";
import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import { analyzeRemarks } from "./analyzeRemark";
import { ObjectId } from "mongodb";
import { productModel } from "@/models/products.model";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const requestBody = await req.json();
    const userId = await getUserIdFromCookies(req);
    const { reviewedBy, reviewDescription, productIdentifier, rating, reviewerImage } = requestBody;
    const { productId, productName, productImage } = productIdentifier || {};
    // Validation
    if (!reviewedBy || !reviewDescription || !productId || !rating) {
      return NextResponse.json({ message: "Missing required fields", success: false }, { status: 400 });
    }
    const reviewerObject = { ...reviewedBy, userId: userId?.toString() };
    const productObjectId = new ObjectId(productId as string);
    const userObjectId = new ObjectId(userId as string);
    const product = await productModel.findById(productObjectId);
    if (!product) {
      return NextResponse.json({ message: "Product not found", success: false }, { status: 404 });
    }
    // Check if user already reviewed this product
    const existingReview = await remarksModel.findOne({
      "reviewedBy.userId": userObjectId,
      "productIdentifier.productId": productObjectId,
    });
    if (existingReview) {
      return NextResponse.json({ message: "Only one review allowed per product", success: false }, { status: 400 });
    }
    // Analyze sentiment
    const reviewSentiment = await analyzeRemarks(productName, reviewDescription, rating);
    // Prepare user-friendly message
    let userMessage = "";
    let statusCode = 200;
    let successFlag = true;
    if (reviewSentiment === "Negative") {
      return NextResponse.json({
        message: "Your review was rejected by the analyzer. Please provide constructive, product-related feedback.",
        success: false,
      }, { status: 422 });
    } else if (reviewSentiment === "Neutral") {
      userMessage = "Your review submitted for approval by Admin";
      statusCode = 200;
      successFlag = true;
    } else {
      userMessage = "Thank you for your positive review!";
      statusCode = 200;
      successFlag = true;
    }
    // Save remark
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
      reviewSentiment,
    });
    await remark.save();
    // Update product rating
    await updateRating(productId);
    return NextResponse.json({ message: userMessage, success: successFlag, data: remark }, { status: statusCode });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to submit review", success: false, error: error.message }, { status: 500 });
  }
}
