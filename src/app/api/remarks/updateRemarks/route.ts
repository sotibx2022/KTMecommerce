import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import updateRating from "@/app/services/apiFunctions/updateOverallRating";
export async function POST(req: NextRequest) {
  try {
    // 1. Parse and validate incoming data
    const data = await req.json();
    const { userId, productIdentifier, reviewDescription, rating } = data ;
    const { productId } = productIdentifier;
    // 2. Validate required fields
    if (!userId || !productId) {
      return NextResponse.json(
        { message: "Both userEmail and productId are required", success: false },
        { status: 400 }
      );
    }
    if (!reviewDescription && !rating) {
      return NextResponse.json(
        { message: "Nothing to update - provide either reviewDescription or rating", success: false },
        { status: 400 }
      );
    }
    // 3. Convert productId to ObjectId
    const productObjectId = new Object(productId);
    // 4. Find the existing review
    const review = await remarksModel.findOne({ 
      'reviewedBy.userId': userId, 
      "productIdentifier.productId": productObjectId 
    });
    if (!review) {
      return NextResponse.json(
        { message: "No review found for this user and product", success: false },
        { status: 404 }
      );
    }
    if (reviewDescription === review.reviewDescription && rating === review.rating) {
      return NextResponse.json({ message: "Nothing to Update", status: 400, success: false });
    }
    // 5. Update the review fields
    if (reviewDescription) review.reviewDescription = reviewDescription;
    if (rating) review.rating = rating;
    // 6. Save the updated review
    await review.save();
    await updateRating(productId);
    // 7. Return success response
    return NextResponse.json(
      { 
        message: "Review updated successfully", 
        success: true,
        data: review 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        message: "Internal server error while updating review", 
        success: false 
      },
      { status: 500 }
    );
  }
}