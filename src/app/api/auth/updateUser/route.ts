import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest, res:NextResponse){
    const {fullName,email,fullAddress, phoneNumber,profileURL} = await req.json();
    const user= await UserModel.findOne({email});
    if(!user){
        return NextResponse.json({message:"There is no user found with provided email", success:false, status:401})
    }else{
        // upload image to the cloudinary.
    }
}