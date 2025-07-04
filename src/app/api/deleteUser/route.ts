import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../auth/authFunctions/getUserIdFromCookies";
import UserModel from "@/models/users.model";
export async function POST(req: NextRequest) {
    console.log('[DELETE USER] Endpoint hit - Starting account deletion process');
    try {
        console.log('[DELETE USER] Attempting to connect to database...');
        await connectToDB();
        console.log('[DELETE USER] Successfully connected to database');
        console.log('[DELETE USER] Retrieving user ID from cookies...');
        const userId = await getUserIdFromCookies(req);
        console.log('[DELETE USER] Retrieved user ID:', userId);
        if (!userId) {
            console.warn('[DELETE USER] No user ID found in cookies - unauthorized request');
            return NextResponse.json(
                { message: "Unauthorized: No user ID found", success: false },
                { status: 401 }
            );
        }
        console.log(`[DELETE USER] Attempting to delete user with ID: ${userId}`);
        const result = await UserModel.deleteOne({ _id: userId });
        console.log('[DELETE USER] Deletion result:', {
            deletedCount: result.deletedCount,
            acknowledged: result.acknowledged
        });
        if (result.deletedCount === 0) {
            console.warn(`[DELETE USER] No user found with ID: ${userId}`);
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }
        console.log('[DELETE USER] Account successfully deleted');
        return NextResponse.json(
            {
                message: "Account deleted successfully",
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('[DELETE USER] Error during account deletion:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
        });
        return NextResponse.json(
            {
                message: "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
}