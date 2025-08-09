import CategoryModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const {data} = await req.json();
    console.log(data);
    return NextResponse.json({ data })
}