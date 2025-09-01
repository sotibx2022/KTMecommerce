import { connectToDB } from "@/config/db";
import OrderModel from "@/models/orders.model";
import { NextRequest, NextResponse } from "next/server";
import {
    subDays,
    startOfDay,
    endOfDay,
} from "date-fns";
import { getOrdersByTime } from "./ordersByTime";
import { validateAdmin } from "@/app/services/apiFunctions/validateAdmin";
export async function GET(req: NextRequest) {
    await connectToDB();
    await validateAdmin(req);
    const now = new Date();
    // Today
    const startOfToday = startOfDay(now);
    const endOfToday = endOfDay(now);
    // Last 7 days
    const startOfLast7Days = startOfDay(subDays(now, 6)); // includes today
    const endOfLast7Days = endOfDay(now);
    // Last 30 days
    const startOfLast30Days = startOfDay(subDays(now, 29)); // includes today
    const endOfLast30Days = endOfDay(now);
    // Fetch results
    const [todayStats, last7DaysStats, last30DaysStats] = await Promise.all([
        getOrdersByTime(startOfToday, endOfToday),
        getOrdersByTime(startOfLast7Days, endOfLast7Days),
        getOrdersByTime(startOfLast30Days, endOfLast30Days),
    ]);
    const orderedCount = await OrderModel.countDocuments({ status: 'ordered' });
    const paidCount = await OrderModel.countDocuments({ status: 'Paid' });
    const unpaidCount = await OrderModel.countDocuments({ status: 'Unpaid' });
    const confirmedCount = await OrderModel.countDocuments({ status: 'confirmed' });
    const deliveredCount = await OrderModel.countDocuments({ status: 'delivered' });
    const cancelledCount = await OrderModel.countDocuments({ status: 'cancelled' });
    return NextResponse.json({
        today: todayStats,
        last7Days: last7DaysStats,
        last30Days: last30DaysStats,
        orderedCount,
        paidCount,
        unpaidCount,
        confirmedCount,
        deliveredCount,
        cancelledCount,
    });
}
