import { connectToDB } from "@/config/db";
import { remarksModel } from "@/models/remarks.model";
import { NextResponse } from "next/server";
export async function GET() {
    await connectToDB();
    const allRemarks = await remarksModel.find({ reviewSentiment: "Neutral" });
    return NextResponse.json({ allRemarks })
}