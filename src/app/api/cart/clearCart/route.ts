import { CartModel } from "@/models/carts.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    console.log("🟡 [START] Clearing cart for current user...");
    const userId = await getUserIdFromCookies(req);
    console.log("🔑 Retrieved userId from cookies:", userId);
    if (!userId) {
      console.warn("❌ No userId found. Unauthorized access.");
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    // Validate and log conversion to ObjectId (note: 'new Object()' is likely incorrect)
    const objectUserId = userId; // assuming it's already a valid ObjectId
    console.log("🆔 Using userId for query:", objectUserId);
    const user = await UserModel.findOne({ _id: objectUserId });
    console.log("👤 User lookup result:", user);
    if (!user) {
      console.warn("❌ User not found in database.");
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    console.log("🗑️ Attempting to delete all cart items for user...");
    const result = await CartModel.deleteMany({ userId: objectUserId });
    console.log("📊 Deletion result:", result);
    if (result.deletedCount === 0) {
      console.warn("⚠️ No cart items found for deletion.");
      return NextResponse.json(
        { message: "No cart items found", success: false },
        { status: 404 }
      );
    }
    console.log("✅ Cart items deleted successfully.");
    return NextResponse.json(
      { message: "Cart items deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
