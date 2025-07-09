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
      !shippingAddress || !shippingPerson || !orderSummary
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
    const userId = await getUserIdFromCookies(req);
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
    const newDeliveryDetails = new DeliveryDetailsModel({
      shippingAddress,
      userId: userId
    });
    await newDeliveryDetails.save();
    for (const [index, item] of items.entries()) {
      if (userId?.toString() !== item.wishersId.toString()) {
        const wisher = await UserModel.findById(item.wishersId).select('fullName email');
        const user = await UserModel.findById(userId).select('fullName email');
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
      } else {
        const newNotification = new NotificationModel({
          userId: userId,
          title: "Order Placed",
          description: `Your Order Placed with ${items.length} items`,
          category: "OrderCreated"
        });
        await newNotification.save();
      }
    }
    return NextResponse.json(
      {
        message: "Order created successfully",
        success: true,
        data: order.toObject()
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