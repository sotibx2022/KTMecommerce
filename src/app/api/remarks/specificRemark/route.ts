import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromCookies(req);
    const productId = req.headers.get("productId");
    if (!userId || !productId) {
      return NextResponse.json(
        { message: "Missing required parameters", success: false },
        { status: 400 }
      );
    }
    const remark = await remarksModel.findOne({
      "productIdentifier.productId": productId,
      "reviewedBy.userId": userId,
    });
    if (!remark) {
      return NextResponse.json(
        { message: "Remark not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Specific Remark Found",
        success: true,
        data: remark,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const reviewAction = req.headers.get("reviewAction") as string;
    const reviewId = req.headers.get("reviewId") as string;
    if (!reviewAction || !reviewId) {
      return NextResponse.json(
        { message: "Missing required parameters", success: false },
        { status: 400 }
      );
    }
    let message: string;
    let status: number;
    if (reviewAction === "approve") {
      const targetReview = await remarksModel.findOneAndUpdate(
        { _id: reviewId },
        { reviewSentiment: "Positive" },
        { new: true }
      );
      if (!targetReview) {
        return NextResponse.json(
          { message: "Review not found", success: false },
          { status: 404 }
        );
      }
      message = "Review Approved";
      status = 200;
    } else if (reviewAction === "delete") {
      const targetReview = await remarksModel.findOneAndDelete({ _id: reviewId });
      if (!targetReview) {
        return NextResponse.json(
          { message: "Review not found", success: false },
          { status: 404 }
        );
      }
      message = "Review Deleted";
      status = 204;
    } else {
      return NextResponse.json(
        { message: "Invalid reviewAction value", success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message, success: true },
      { status }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
