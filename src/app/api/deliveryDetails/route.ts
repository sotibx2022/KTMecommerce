import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
import DeliveryDetailsModel from "@/models/deliveryDetails.model";
import { connectToDB } from "@/config/db";
export async function POST(req: NextRequest) {
    try {
        connectToDB()
        const { shippingAddress } = await req.json();
        const { state, city, street } = shippingAddress || {};
        const userId = await getUserIdFromCookies(req);
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }
        if (!state || !city || !street) {
            return NextResponse.json(
                { message: "Missing required fields", success: false },
                { status: 400 }
            );
        }
        const deliveryDetailsExist = await DeliveryDetailsModel.findOne({ userId });
        if (deliveryDetailsExist) {
            deliveryDetailsExist.shippingAddress = shippingAddress;
            await deliveryDetailsExist.save();
            return NextResponse.json(
                { message: "Delivery address updated successfully", success: true },
                { status: 200 }
            );
        }
        const newDeliveryDetails = new DeliveryDetailsModel({
            shippingAddress,
            userId
        });
        await newDeliveryDetails.save();
        return NextResponse.json(
            { message: "Delivery address created successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const userId = await getUserIdFromCookies(req);
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }
        const deliveryDetails = await DeliveryDetailsModel.findOne({ userId });
        return NextResponse.json(
            {
                data: deliveryDetails,
                message: deliveryDetails ? "Delivery details found" : "No delivery details found",
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}