import { connectToDB } from "@/config/db";
import AdminModel from "@/models/admin.model";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const [
            totalCustomers,
            registeredCustomers,
            activeCustomers,
            adminUsers
        ] = await Promise.all([
            UserModel.countDocuments(),
            UserModel.countDocuments({ accountStatus: 'registered' }),
            UserModel.countDocuments({ accountStatus: 'customer' }),
            AdminModel.countDocuments()
        ]);
        const customerDatas = {
            totalCustomers,
            registeredCustomers,
            activeCustomers,
            adminUsers
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