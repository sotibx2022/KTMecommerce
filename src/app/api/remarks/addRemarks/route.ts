import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  console.log('1. Review POST endpoint hit');
  try {
    console.log('2. Attempting to parse request body');
    const requestBody = await req.json();
    console.log('3. Request body parsed:', JSON.stringify(requestBody, null, 2));
    const { 
      reviewedBy,
      reviewDescription,
      productId,
      rating,
      reviewerImage 
    } = requestBody;
    const productObjectId = new Object(productId)
    console.log('4. Destructured values:', {
      reviewedBy,
      reviewDescription,
      productId,
      rating,
      reviewerImage
    });
    // Validate required fields
    console.log('5. Validating required fields');
    if (!reviewedBy) {
      console.error('5a. reviewedBy is missing');
    }
    if (!reviewDescription) {
      console.error('5b. reviewDescription is missing');
    }
    if (!productId) {
      console.error('5c. productId is missing');
    }
    if (!rating) {
      console.error('5d. rating is missing');
    }
    if (!reviewedBy || !reviewDescription || !productId || !rating) {
      console.log('6. Validation failed - missing required fields');
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    console.log('7. All required fields present, creating new remark');
    const remark = new remarksModel({
      reviewedBy,
      reviewDescription,
      productId:productObjectId,
      rating,
      reviewerImage,
    });
    console.log('8. Remark object created:', JSON.stringify(remark, null, 2));
    console.log('9. Attempting to save to database');
    await remark.save();
    console.log('10. Remark successfully saved to database');
    return NextResponse.json(
      { 
        message: "Review submitted successfully", 
        success: true, 
        data: remark 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('ERROR CAUGHT:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        message: "Failed to submit review", 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}