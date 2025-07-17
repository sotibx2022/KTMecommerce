import { connectToDB } from "@/config/db";
import OrderModel from "@/models/orders.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const url = new URL(req.url);
        const pathSegments = url.pathname.split("/");
        const orderId = pathSegments.pop();
        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }
        const orderDetails = await OrderModel.findOne({ _id: new Types.ObjectId(orderId) });
        if (!orderDetails) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ orderDetails });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
