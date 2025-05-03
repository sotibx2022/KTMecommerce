import { productModel } from "@/models/products.model";
import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { 
      reviewedBy,
      reviewDescription,
      productId,
      rating,
      reviewerImage 
    } = requestBody;
    const productObjectId = new Object(productId);
    const product = await productModel.findById(productObjectId);
    // Validate required fields
    if (!reviewedBy || !reviewDescription || !productId || !rating) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    const remark = new remarksModel({
      reviewedBy,
      reviewDescription,
      productId: productObjectId,
      rating,
      reviewerImage,
    });
    await remark.save();
    return NextResponse.json(
      { 
        message: "Review submitted successfully", 
        success: true, 
        data: remark 
      },
      { status: 201 }
    );
  } catch (error: any) {
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