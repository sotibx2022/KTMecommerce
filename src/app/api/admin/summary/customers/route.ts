import { validateAdmin } from "@/app/services/apiFunctions/validateAdmin";
import { connectToDB } from "@/config/db";
import AdminModel from "@/models/admin.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        await validateAdmin(req)
        await connectToDB();
        const results = await UserModel.aggregate([
            {
                $group: {
                    _id: '$accountStatus',
                    count: { $sum: 1 }
                }
            }
        ])
        const customerObject: Record<string, number> = {}
        results.forEach((result) => {
            customerObject[result._id] = result.count
        })
        const customerDatas = {
            totalCustomers: Object.values(customerObject).reduce((a, b) => a + b, 0),
            registeredCustomers: customerObject["registered"] || 0,
            activeCustomers: customerObject["customer"] || 0,
            updatedCustomers: customerObject["updated"] || 0,
        };
        return NextResponse.json({
            message: "Customer data retrieved successfully",
            success: true,
            customerDatas
        });
    } catch (error: any) {
        console.error("Error in GET /api/customers/summary:", error);
        return NextResponse.json(
            {
                message: error.message || "Failed to fetch customer data",
                success: false
            },
            { status: 500 }
        );
    }
}