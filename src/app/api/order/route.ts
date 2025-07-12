import { connectToDB } from "@/config/db";
import DeliveryDetailsModel from "@/models/deliveryDetails.model";
import { NotificationModel } from "@/models/notification.model";
import OrderModel from "@/models/orders.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    console.log("🔌 Connecting to database...");
    await connectToDB();
    console.log("📦 Parsing request body...");
    const requestBody = await req.json();
    console.log("📥 Received Request Body:", requestBody);
    const {
      userEmail,
      items,
      status,
      paymentMethod,
      shippingAddress,
      shippingPerson,
      orderSummary,
      wishersId
    } = requestBody;
    console.log("✅ Extracted Fields:");
    console.log("  - userEmail:", userEmail);
    console.log("  - items:", items);
    console.log("  - status:", status);
    console.log("  - paymentMethod:", paymentMethod);
    console.log("  - shippingAddress:", shippingAddress);
    console.log("  - shippingPerson:", shippingPerson);
    console.log("  - orderSummary:", orderSummary);
    if (
      !userEmail || !items || !status || !paymentMethod ||
      !shippingAddress || !shippingPerson || !orderSummary
    ) {
      console.warn("⚠️ Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    if (!items.length) {
      console.warn("⚠️ Items array is empty");
      return NextResponse.json(
        { message: "Items array cannot be empty", success: false },
        { status: 400 }
      );
    }
    console.log("🔑 Getting userId from cookies...");
    const userId = await getUserIdFromCookies(req);
    console.log("👤 Resolved userId:", userId);
    console.log("📝 Creating new order...");
    const order = new OrderModel({
      userEmail,
      items,
      status,
      paymentMethod,
      shippingAddress,
      shippingPerson,
      orderSummary,
    });
    await order.save();
    console.log("✅ Order saved:", order._id);
    console.log("📬 Creating delivery details...");
    const newDeliveryDetails = new DeliveryDetailsModel({
      shippingAddress,
      userId: userId
    });
    await newDeliveryDetails.save();
    console.log("✅ Delivery details saved for user:", userId);
    console.log("🔔 Looping through items to create notifications...");
    for (const [index, item] of items.entries()) {
      console.log(`➡️ Processing item [${index}] with productName: ${item.productName}`);
      if (userId?.toString() !== item.wishersId.toString()) {
        console.log("🔄 Creating notifications for different wisher...");
        const wisher = await UserModel.findById(item.wishersId).select('fullName email');
        const user = await UserModel.findById(userId).select('fullName email');
        console.log("👤 Wisher Info:", wisher);
        console.log("👤 User Info:", user);
        const newNotification = new NotificationModel({
          userId: userId,
          title: "Order Placed",
          description: `ordered : ${item.productName}, requested By ${wisher?.fullName || wisher?.email}`,
          category: "OrderCreated"
        });
        const secondNotification = new NotificationModel({
          userId: item.wishersId,
          title: "Order Placed",
          description: `Your requested Product ${item.productName} was ordered by ${user?.fullName || user?.email}`,
          category: "OrderCreated"
        });
        await Promise.all([
          newNotification.save(),
          secondNotification.save()
        ]);
        console.log("✅ Dual notifications saved");
      } else {
        console.log("🔄 Creating notification for self-order...");
        const newNotification = new NotificationModel({
          userId: userId,
          title: "Order Placed",
          description: `Your Order Placed with ${items.length} items`,
          category: "OrderCreated"
        });
        await newNotification.save();
        console.log("✅ Notification saved for self-order");
      }
    }
    console.log("✅ All operations successful. Returning response...");
    return NextResponse.json(
      {
        message: "Order created successfully",
        success: true,
        data: order.toObject()
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Internal server error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
