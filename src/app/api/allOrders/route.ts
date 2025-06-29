import { connectToDB } from "@/config/db";
import OrderModel from "@/models/orders.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectToDB(); // Await DB connection if it's async
    const orders = await OrderModel.find();
    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { message: "No orders found" },
        { status: 404 }
      );
    }
    return NextResponse.json({message:"Orders Found successfully",success:true,status:200, data:orders});
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
