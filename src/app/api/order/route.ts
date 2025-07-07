import { connectToDB } from "@/config/db";
import DeliveryDetailsModel from "@/models/deliveryDetails.model";
import { NotificationModel } from "@/models/notification.model";
import OrderModel from "@/models/orders.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  console.log("Starting POST /api/orders"); // Debug line 1
  try {
    console.log("Attempting to connect to DB..."); // Debug line 2
    await connectToDB();
    console.log("DB connection successful"); // Debug line 3
    console.log("Parsing request body..."); // Debug line 4
    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody, null, 2)); // Debug line 5
    const { userEmail, items, status, paymentMethod, shippingAddress, shippingPerson, orderSummary } = requestBody;
    // Validate required fields
    console.log("Validating required fields..."); // Debug line 6
    if (!userEmail || !items || !status || !paymentMethod || !shippingAddress || !shippingPerson || !orderSummary) {
      console.error("Missing required fields:", {
        userEmail: !!userEmail,
        items: !!items,
        status: !!status,
        paymentMethod: !!paymentMethod,
        shippingAddress: !!shippingAddress,
        shippingPerson: !!shippingPerson,
        orderSummary: !!orderSummary
      }); // Debug line 7
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    console.log("Checking items array..."); // Debug line 8
    if (!items.length) {
      console.error("Items array is empty"); // Debug line 9
      return NextResponse.json(
        { message: "Items array cannot be empty", success: false },
        { status: 400 }
      );
    }
    console.log("Getting wishersId from first item..."); // Debug line 10
    const wishersId = items[0]?.wishersId;
    if (!wishersId) {
      console.error("No wishersId found in first item"); // Debug line 11
      return NextResponse.json(
        { message: "First item must contain wishersId", success: false },
        { status: 400 }
      );
    }
    console.log(`Fetching wishersName for id: ${wishersId}`); // Debug line 12
    const wishersName = await UserModel.findById(wishersId).select('fullName');
    if (!wishersName) {
      console.error(`No user found with wishersId: ${wishersId}`); // Debug line 13
      return NextResponse.json(
        { message: "Invalid wishersId provided", success: false },
        { status: 400 }
      );
    }
    console.log("Getting userId from cookies..."); // Debug line 14
    const userId = await getUserIdFromCookies(req);
    if (!userId) {
      console.error("No userId found in cookies"); // Debug line 15
      return NextResponse.json(
        { message: "User authentication required", success: false },
        { status: 401 }
      );
    }
    console.log(`Fetching userName for id: ${userId}`); // Debug line 16
    const userName = await UserModel.findById(userId).select('fullName');
    if (!userName) {
      console.error(`No user found with userId: ${userId}`); // Debug line 17
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    console.log(`Looking up user by email: ${userEmail}`); // Debug line 18
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      console.error(`No user found with email: ${userEmail}`); // Debug line 19
      return NextResponse.json(
        { message: "User email not found", success: false },
        { status: 404 }
      );
    }
    console.log("Creating new order..."); // Debug line 20
    const order = new OrderModel({
      userEmail,
      items,
      status,
      paymentMethod,
      shippingAddress,
      shippingPerson,
      orderSummary
    });
    console.log("Order object created:", JSON.stringify(order, null, 2)); // Debug line 21
    console.log("Saving order..."); // Debug line 22
    await order.save();
    console.log("Order saved successfully"); // Debug line 23
    console.log("Creating notifications..."); // Debug line 24
    const newNotification = new NotificationModel({
      userId: user._id,
      title: "Order Placed",
      description: `You placed Order for ${order.items.length} items for ${wishersName.fullName}`,
      category: "OrderCreated",
    });
    const secondNotification = new NotificationModel({
      userId: wishersId,
      title: "Order Placed",
      description: `Your Public Wishlist Items were Ordered by ${userName.fullName} ${order.items.length} items.`,
      category: "OrderCreated",
    });
    console.log("Saving notifications..."); // Debug line 25
    await Promise.all([
      newNotification.save(),
      secondNotification.save()
    ]);
    console.log("Notifications saved successfully"); // Debug line 26
    console.log("Creating delivery details..."); // Debug line 27
    const newDeliveryDetails = new DeliveryDetailsModel({
      shippingAddress,
      userId: user._id
    });
    await newDeliveryDetails.save();
    console.log("Delivery details saved successfully"); // Debug line 28
    console.log("Order process completed successfully"); // Debug line 29
    return NextResponse.json(
      {
        message: "Order created successfully",
        success: true,
        data: order
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/orders:", error); // Debug line 30
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      }); // Debug line 31
    }
    return NextResponse.json(
      { message: "Internal server error", success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}