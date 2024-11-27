import { connectToDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest, response:NextResponse){
    try{
        await connectToDB()
        return NextResponse.json({message:"The connection is occured."})
    }
    catch{
        return NextResponse.json({message:"there are no categories yet."})
    }
}