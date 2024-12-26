import { getProductsByKeyword } from '@/app/services/apiFunctions/apiFunctions';
import { connectToDB } from '@/config/db';
import { categoriesModel } from '@/models/categories.model';
import { productModel } from '@/models/products.model';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  await connectToDB();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const keyword = searchParams.get('keyword');
  if (keyword) {
    const { message, status, success, products } = await getProductsByKeyword(keyword);
    if(products.length>0){
      return NextResponse.json({ message, status, success, products });
    }
  } else {
    let filterQuery = {};
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subcategory');
    // Category search
    const selectedCategory = await categoriesModel.findOne({ category_name: category });
    // Subcategory search within the selected category
    let selectedSubCategory = null;
    if (selectedCategory) {
      selectedSubCategory = await categoriesModel.findOne({
        "subcategories": {
          $elemMatch: {
            "subcategory_name": { $regex: new RegExp(`.*${subCategory}.*`, 'i') },
          },
        },
      });
    }
    if (selectedSubCategory) {
      const matchingSubCategory = selectedSubCategory?.subcategories?.find(
        (sub) => sub.category_name === subCategory
      );
      if (matchingSubCategory) {
        const subCategoryId = matchingSubCategory._id.toString();
        const products = await productModel.find({ subCategoryId });
        return NextResponse.json({ products }); // Assuming you only want to return products for the matching subcategory
      }
    }
    // Handle no subcategory found within the category or no category provided
    const categoryId = selectedCategory?._id;
    filterQuery = { categoryId }; // Assuming you want to return products for the entire category if no subcategory is found
    return NextResponse.json({ message: 'No matching subcategory found' }); // Or a more informative message
  }
}