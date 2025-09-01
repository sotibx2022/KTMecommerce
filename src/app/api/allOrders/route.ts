import TotalOrders from "@/app/admin/orders/ordersComponents/TotalOrders";
import { validateAdmin } from "@/app/services/apiFunctions/validateAdmin";
import { connectToDB } from "@/config/db";
import OrderModel from "@/models/orders.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await validateAdmin(req);
    await connectToDB();
    const url = new URL(req.url);
    const queryString = url.searchParams.get("orderStatus");
    const page = url.searchParams.get('pageNumber');
    const pageNumber = page ? parseInt(page) : 1;
    const pageSize = 10;
    // Build filter conditionally
    const filter = queryString ? { status: queryString } : {};
    const totalOrders = await OrderModel.countDocuments(filter)
    const results = await OrderModel.find(filter).limit(10).skip((pageNumber - 1) * pageSize);
    if (!results || results.length === 0) {
      return NextResponse.json(
        { message: "No orders found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Orders found successfully",
      success: true,
      status: 200,
      data: results,
      pagination: {
        currentPage: pageNumber,
        pageSize: pageSize,
        totalOrders: totalOrders,
        totalPages: Math.ceil(totalOrders / pageSize)
      }
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
