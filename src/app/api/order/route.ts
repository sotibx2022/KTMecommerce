import { connectToDB } from "@/config/db";
import DeliveryDetailsModel from "@/models/deliveryDetails.model";
import { NotificationModel } from "@/models/notification.model";
import OrderModel from "@/models/orders.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  await connectToDB();
  try {
    const { userEmail, items, status, paymentMethod, shippingAddress, shippingPerson,orderSummary } = await req.json();
    // Validate required fields
    if (!userEmail || !items || !status || !paymentMethod || !shippingAddress || !shippingPerson || !orderSummary) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    // Create and save order
    const user = await UserModel.findOne({email:userEmail})
    const order = new OrderModel({
      userEmail,
      items,
      status,
      paymentMethod,
      shippingAddress,
      shippingPerson,
      orderSummary
    });
    await order.save();
    const newNotification = new NotificationModel({
      userId:user?._id,
      title:"Order Placed",
      description:`You placed Order for ${order.items.length} items.`,
      category:"OrderCreated",
    })
    await newNotification.save();
    const newDeliveryDetails = new DeliveryDetailsModel({
      shippingAddress,
      userId:user?._id
    })
    newDeliveryDetails.save()
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
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}