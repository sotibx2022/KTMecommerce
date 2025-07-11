import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('userEmail');
    const productId = req.headers.get('productId');
    // Validate required parameters
    if (!userId || !productId) {
      return NextResponse.json(
        { message: "Missing required parameters", success: false },
        { status: 400 }
      );
    }
    const productObjectId = new Object(productId);
    // Query the database
    const remark = await remarksModel.findOne({ 
      'productIdentifier.productId': productObjectId, 
      'reviewedBy.id': userId 
    });
    if (!remark) {
      return NextResponse.json(
        { message: "Remark not found", success: false },
        { status: 404 }
      );
    }
    // Return successful response
    return NextResponse.json({
      message: "Specific Remark Found",
      success: true,
      data: remark
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}