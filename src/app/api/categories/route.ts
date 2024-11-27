import { connectToDB } from "@/config/db";
import { categoriesModel } from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest, response:NextResponse){
    try{
        await connectToDB()
        const categories = await categoriesModel.find();
        if(categories.length>0){
            return NextResponse.json({message:"categoreis were found", categories});
        }else{
            return NextResponse.json({message:"error to find the categories."})
        }
    }
    catch{
        return NextResponse.json({message:"there are no categories yet."})
    }
}