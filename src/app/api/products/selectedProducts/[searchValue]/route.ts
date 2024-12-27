import { getProductsByKeyword } from "@/app/services/apiFunctions/apiFunctions";
import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/types/products";
export async function GET(request: NextRequest, response: NextResponse) {
  await connectToDB();
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const minPrice = searchParams.get('minprice');
  const maxPrice = searchParams.get('maxprice');
  const rating = searchParams.get('rating');
  var products: Product[] = [];
if (keyword) {
  products = await getProductsByKeyword(keyword);
  if(products.length>0){
    return NextResponse.json({products})
  }else{
    return NextResponse.json({message:"There are no products found with provdied keyword."})
  }
}
}
