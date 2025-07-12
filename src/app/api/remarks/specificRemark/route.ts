import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
  try {
    console.log("📥 Incoming GET request to fetch specific remark");
    const userId = await getUserIdFromCookies(req);
    const productId = req.headers.get("productId");
    console.log("🔍 Extracted Headers:");
    console.log("  - userId:", userId);
    console.log("  - productId:", productId);
    // Validate required parameters
    if (!userId || !productId) {
      console.warn("⚠️ Missing required parameters");
      return NextResponse.json(
        { message: "Missing required parameters", success: false },
        { status: 400 }
      );
    }
    console.log("🔄 Converting productId to Object");
    console.log("🔎 Searching for remark with:");
    console.log("  - productIdentifier.productId:", productId);
    console.log("  - reviewedBy.id:", userId);
    // Query the database
    const remark = await remarksModel.findOne({
      "productIdentifier.productId": productId,
      "reviewedBy.userId": userId,
    });
    if (!remark) {
      console.warn("❌ Remark not found for given user and product");
      return NextResponse.json(
        { message: "Remark not found", success: false },
        { status: 404 }
      );
    }
    console.log("✅ Remark found:", remark);
    // Return successful response
    return NextResponse.json(
      {
        message: "Specific Remark Found",
        success: true,
        data: remark,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Internal server error:", error.message);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
