import { connectToDB } from "@/config/db";
import OrderModel from "@/models/orders.model";
type OrdersResult = {
    revenue: number;
    totalOrders: number;
};
export const getOrdersByTime = async (
    startDate: Date,
    endDate: Date
): Promise<OrdersResult> => {
    await connectToDB();
    const matchStage = {
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        },
        status: { $in: ['ordered', 'paid', 'delivered', 'confirmed'] },
    };
    const groupStage = {
        $group: {
            _id: null,
            totalRevenue: { $sum: "$orderSummary.grossTotal" },
            totalOrders: { $sum: 1 },
        },
    };
    const aggregationPipeline = [
        { $match: matchStage },
        groupStage,
    ];
    const result = await OrderModel.aggregate(aggregationPipeline);
    // result is an array with one object if matches found, else empty array
    return {
        revenue: result[0]?.totalRevenue || 0,
        totalOrders: result[0]?.totalOrders || 0,
    };
};
