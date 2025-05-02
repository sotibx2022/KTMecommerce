import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req: NextRequest) {
  console.log('1. GET /api/remarks endpoint hit');
  try {
    // Parse the URL and extract productId
    console.log('2. Parsing request URL');
    const url = new URL(req.url);
    console.log('3. Full URL:', url.toString());
    const pathSegments = url.pathname.split('/');
    console.log('4. Path segments:', pathSegments);
    const productId = pathSegments.pop();
    console.log('5. Extracted productId:', productId);
    if (!productId) {
      console.error('6. Error: No productId found in URL');
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }
    // Validate and convert to ObjectId
    console.log('7. Validating productId format');
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error('8. Error: Invalid productId format:', productId);
      return NextResponse.json(
        { message: "Invalid product ID format", success: false },
        { status: 400 }
      );
    }
    const productObjectId = new mongoose.Types.ObjectId(productId);
    console.log('9. Converted to ObjectId:', productObjectId);
    // Query the database
    console.log('10. Querying database for remarks');
    const remarks = await remarksModel.find({ productId: productObjectId });
    console.log('11. Found remarks count:', remarks.length);
    console.log('12. Sample remark:', remarks[0] ? JSON.stringify(remarks[0]) : 'No remarks found');
    return NextResponse.json({
      message: "Remarks found successfully",
      success: true,
      data: remarks,  // Changed from 'remarks' to 'data' for consistent API response
      status: 200
    });
  } catch (error: any) {
    console.error('13. ERROR CAUGHT:', error);
    console.error('14. Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
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