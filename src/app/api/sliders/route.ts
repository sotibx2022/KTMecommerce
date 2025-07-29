import { connectToDB } from "@/config/db";
import { SliderModel } from "@/models/sliders.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const sliders = await SliderModel.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Sliders fetched successfully",
      data: sliders
    });
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Failed to fetch sliders",
      data: null
    }, { status: 500 });
  }
}