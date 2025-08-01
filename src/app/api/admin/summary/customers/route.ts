import { connectToDB } from "@/config/db";
import { NextRequest } from "next/server";
export async function GET(req:NextRequest){
    connectToDB()
}