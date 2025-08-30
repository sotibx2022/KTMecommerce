import { connectToDB } from "@/config/db";
import { remarksModel } from "@/models/remarks.model";
import { NextResponse } from "next/server";
export async function GET() {
    await connectToDB();
    const allRemarks = await remarksModel.find({ reviewSentiment: "Neutral" });
    const totalRemarks = await remarksModel.countDocuments();
    const averageResult = await remarksModel.aggregate([{
        $addFields:{"ratingNumber":{$toDouble:"$rating"}}
    },
{$group:{_id:null,"averageRating":{$avg:"$ratingNumber"}}}])
const averageRating = averageResult[0].averageRating || 0
    return NextResponse.json({ allRemarks,totalRemarks,averageRating })
}