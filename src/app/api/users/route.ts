import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const url = new URL(req.url);
        const status = url.searchParams.get('status');
        const createdSorting = url.searchParams.get('createdSorting');
        let filterQuery: any = {};
        let sortQuery: any = {};
        if (status && status !== "status") {
            filterQuery.accountStatus = status;
        }
        if (createdSorting && createdSorting !== "normal") {
            sortQuery.createdAt = createdSorting === "ascending" ? 1 : -1;
        }
        let allUsers;
        // If no filters and no sorting, do a simple find()
        if (Object.keys(filterQuery).length === 0 && Object.keys(sortQuery).length === 0) {
            allUsers = await UserModel.find({});
        } else if (Object.keys(sortQuery).length === 0) {
            // Filter only, no sorting
            allUsers = await UserModel.find(filterQuery);
        } else if (Object.keys(filterQuery).length === 0) {
            // Sorting only, no filter
            allUsers = await UserModel.find({}).sort(sortQuery);
        } else {
            // Both filter and sort are present, use aggregate for flexibility
            allUsers = await UserModel.aggregate([
                { $match: filterQuery },
                { $sort: sortQuery }
            ]);
        }
        return NextResponse.json({
            success: true,
            message: "Users fetched successfully",
            data: allUsers
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        }, { status: 500 });
    }
}
