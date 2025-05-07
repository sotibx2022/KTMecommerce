import { remarksModel } from "@/models/remarks.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        const userEmail = req.headers.get('userEmail');
        if (!userEmail) {
            return NextResponse.json(
                { success: false, message: "User email is required in headers" },
                { status: 400 }
            );
        }
        const remarks = await remarksModel.find({ 'reviewedBy.email': userEmail });
        return NextResponse.json(
            { success: true, data: remarks },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching remarks:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}