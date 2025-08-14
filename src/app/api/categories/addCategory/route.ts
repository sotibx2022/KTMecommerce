import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
const formData = await req.formData();
const categoryName = formData.get('categoryName') as string;
const metaTitle = formData.get('metaTitle') as string;
const metaDescription = formData.get('metaDescription') as string;
const file = formData.get('file') as File;
console.log(categoryName,metaTitle,metaDescription,file);
return NextResponse.json({message:"success"})
}