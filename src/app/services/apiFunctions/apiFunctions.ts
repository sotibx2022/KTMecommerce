import { Product } from '@/app/types/products';
import { connectToDB } from '@/config/db';
import { categoriesModel } from '@/models/categories.model';
import { productModel } from '@/models/products.model';
import categoryText2Id from './categoryText2Id';
import subCategoryText2Id from './subCatText2Id';
export async function getProductsByKeyword(keyword: string): Promise<Product[]> { 
  try {
    await connectToDB();
    // Category search
const categoryId = await categoryText2Id(keyword);
if(categoryId){
  return await productModel.find({ categoryId });  
}
const subCategoryId = await subCategoryText2Id(keyword)
if(subCategoryId){
  return await productModel.find({ subCategoryId });  
}
    // Full-text search
    return await productModel.find({
      $or: [
        { productName: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
        { productDescription: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
        { productBrand: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
      ],
    });
  } catch (error) {
    console.error('Error fetching products on the basis of keyword.', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}