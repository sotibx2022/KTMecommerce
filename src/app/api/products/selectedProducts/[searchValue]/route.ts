import { getProductsByKeyword } from '@/app/services/apiFunctions/apiFunctions';
import { connectToDB } from '@/config/db';
import { categoriesModel } from '@/models/categories.model';
import { productModel } from '@/models/products.model';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  await connectToDB();
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const keyword = searchParams.get('keyword');
   if(keyword){
    const {message,status, success,products} = await getProductsByKeyword(keyword);
    return NextResponse.json({message,status,success,products})
   }else{
    return NextResponse.json({ message: 'No keyword provided in search' });
   }
  } catch (error) {
    return NextResponse.json({
      error: 'An error occurred while extracting parameters',
    });
  }
}