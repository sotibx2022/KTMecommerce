import OrderModel from "@/models/orders.model";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/config/db";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
export async function POST(req: NextRequest) {
  await connectToDB()
  try {
    const { userEmail } = await req.json();
    const userId = await getUserIdFromCookies(req)
    if (!userEmail) {
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }
    const query = { userEmail,wishersId:userId };
    const orders = await OrderModel.find(query);
    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { message: "No orders found", success: true, data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json({
      message: "Orders found successfully",
      success: true,
      data: orders,
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        message: error.message || "Failed to fetch orders",
        success: false,
        errorDetails: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}