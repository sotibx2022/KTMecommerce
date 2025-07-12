import updateRating from "@/app/services/apiFunctions/updateOverallRating";
import { productModel } from "@/models/products.model";
import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    console.log("Starting POST request processing");
    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    const userId = await getUserIdFromCookies(req);
    console.log("Extracted userId from cookies:", userId);
    const {
      reviewedBy,
      reviewDescription,
      productIdentifier,
      rating,
      reviewerImage,
    } = requestBody;
    console.log("Destructured request body values:", {
      reviewedBy,
      reviewDescription,
      productIdentifier,
      rating,
      reviewerImage
    });
    const { productId, productName, productImage } = productIdentifier || {};
    console.log("Product identifier values:", {
      productId,
      productName,
      productImage
    });
    const userEmail = reviewedBy?.email;
    console.log("Reviewer email:", userEmail);
    // Validation checks
    if (!reviewedBy || !reviewDescription || !productId || !rating) {
      console.log("Validation failed - missing required fields:", {
        hasReviewedBy: !!reviewedBy,
        hasReviewDescription: !!reviewDescription,
        hasProductId: !!productId,
        hasRating: !!rating
      });
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    const reviewerObject = {
      ...reviewedBy,
      userId: userId?.toString(),
    };
    console.log("Reviewer object with userId:", reviewerObject);
    const productObjectId = new Object(productId);
    console.log("Product ID converted to ObjectId:", productObjectId);
    console.log("Attempting to find product in database");
    const product = await productModel.findById(productObjectId);
    if (!product) {
      console.log("Product not found in database");
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }
    console.log("Product found:", product);
    console.log("Checking for existing review by this user for this product");
    const review = await remarksModel.findOne({
      "reviewedBy.userId": userId,
      productId: productId,
    });
    if (review) {
      console.log("Existing review found:", review);
      return NextResponse.json({
        message: "Only single review allowed for the same product",
        success: false,
        status: 400,
      });
    }
    console.log("No existing review found - proceeding to create new review");
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
    console.log("New remark object created:", remark);
    console.log("Attempting to save remark to database");
    await remark.save();
    console.log("Remark saved successfully");
    console.log("Updating overall product rating");
    await updateRating(productIdentifier.productId);
    console.log("Overall rating updated");
    return NextResponse.json(
      {
        message: "Review submitted successfully",
        success: true,
        data: remark,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST request:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
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