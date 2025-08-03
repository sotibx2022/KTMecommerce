import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        // Create response object
        const response = NextResponse.json(
            { success: true, message: "Logout successful" },
            { status: 200 }
        );
        // Delete the adminDetails cookie
        response.cookies.delete('adminDetails');
        return response;
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Logout failed" },
            { status: 500 }
        );
    }
}