import { CartModel } from "@/models/carts.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  console.log("🚀 [Cart Clear] Request received at:", new Date().toISOString());
  try {
    console.log("⏳ [Cart Clear] Parsing request body...");
    const { userEmail } = await req.json();
    console.log("📧 [Cart Clear] Processing request for user email:", userEmail);
    console.log("🔍 [Cart Clear] Searching for user in database...");
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      console.warn("⚠️ [Cart Clear] User not found for email:", userEmail);
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    console.log("✅ [Cart Clear] User found - ID:", user._id);
    console.log("🗑️ [Cart Clear] Initiating cart deletion for user ID:", user._id);
    const result = await CartModel.deleteMany({ userId: user._id });
    console.log("📊 [Cart Clear] Deletion result:", {
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged
    });
    if (result.deletedCount === 0) {
      console.warn("⚠️ [Cart Clear] No cart items found for user ID:", user._id);
      return NextResponse.json(
        { message: "No cart items found", success: false },
        { status: 404 }
      );
    }
    console.log(`🎉 [Cart Clear] Successfully deleted ${result.deletedCount} cart items for user: ${userEmail} (ID: ${user._id})`);
    return NextResponse.json(
      { message: "Cart items deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 [Cart Clear] Critical error occurred:", {
      errorName: (error as Error).name,
      errorMessage: (error as Error).message,
      stackTrace: (error as Error).stack?.split("\n")[0],
      userEmail: (error as any).userEmail // Add error context if available
    });
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}