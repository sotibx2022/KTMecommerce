import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req: NextRequest) {
  try {
    // Parse the URL and extract productId
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const productId = pathSegments.pop();
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }
    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID format", success: false },
        { status: 400 }
      );
    }
    const productObjectId = new mongoose.Types.ObjectId(productId);
    // Query the database
    const remarks = await remarksModel.find({ productId: productObjectId });
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