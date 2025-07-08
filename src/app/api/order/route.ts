import { connectToDB } from "@/config/db";
import DeliveryDetailsModel from "@/models/deliveryDetails.model";
import { NotificationModel } from "@/models/notification.model";
import OrderModel from "@/models/orders.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const requestBody = await req.json();
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
    if (
      !userEmail || !items || !status || !paymentMethod ||
      !shippingAddress || !shippingPerson || !orderSummary || !wishersId
    ) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    if (!items.length) {
      return NextResponse.json(
        { message: "Items array cannot be empty", success: false },
        { status: 400 }
      );
    }
    const wishersName = await UserModel.findById(wishersId).select("fullName");
    if (!wishersName) {
      return NextResponse.json(
        { message: "Invalid wishersId provided", success: false },
        { status: 400 }
      );
    }
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      return NextResponse.json(
        { message: "User authentication required", success: false },
        { status: 401 }
      );
    }
    const userName = await UserModel.findById(userId).select("fullName");
    if (!userName) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json(
        { message: "User email not found", success: false },
        { status: 404 }
      );
    }
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
    const newNotification = new NotificationModel({
      userId: user._id,
      title: "Order Placed",
      description: `You placed an order for ${order.items.length} item(s) for ${wishersName.fullName}`,
      category: "OrderCreated"
    });
    const secondNotification = new NotificationModel({
      userId: wishersId,
      title: "Order Placed",
      description: `Your Public Wishlist Items were ordered by ${userName.fullName}. Total items: ${order.items.length}`,
      category: "OrderCreated"
    });
    await Promise.all([
      newNotification.save(),
      secondNotification.save()
    ]);
    const newDeliveryDetails = new DeliveryDetailsModel({
      shippingAddress,
      userId: user._id
    });
    await newDeliveryDetails.save();
    return NextResponse.json(
      {
        message: "Order created successfully",
        success: true,
        data: order
      },
      { status: 201 }
    );
  } catch (error) {
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
