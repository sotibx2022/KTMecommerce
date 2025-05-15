import { connectToDB } from "@/config/db";
import categoryText2Id from "./categoryText2Id";
import subCategoryText2Id from "./subCatText2Id";
import { productModel } from "@/models/products.model";
import { IProductCreate } from "@/app/types/products";
export async function getProductsByKeyword(
  keyword: string,
  page: number = 1,
  limit: number = 10
): Promise<{ products: IProductCreate[], totalItems: number, totalPages: number }> {
  try {
    await connectToDB();
    let filterQuery: any = {};
    const categoryId = await categoryText2Id(keyword);
    if (categoryId) {
      filterQuery.categoryId = categoryId;
    }
    const subCategoryId = await subCategoryText2Id(keyword);
    if (subCategoryId) {
      filterQuery.subCategoryId = subCategoryId;
    }
    if (!categoryId && !subCategoryId) {
      filterQuery = {
        $or: [
          { productName: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { productDescription: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { productBrand: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
        ],
      };
    }
    const totalItems = await productModel.countDocuments(filterQuery);
    const products = await productModel
      .find(filterQuery)
      .skip((page - 1) * limit)
      .lean()
      .limit(limit);
      
    const totalPages = Math.ceil(totalItems / limit);
    return { products, totalItems, totalPages };
  } catch (error) {
    console.error('Error fetching products on the basis of keyword.', error);
    throw error;
  }
}
export async function getProductsByCategory(
  category: string | null,
  subCategory: string | null,
  page: number = 1,
  limit: number = 10
): Promise<{ products: IProductCreate[]; totalItems: number; totalPages: number }> {
  try {
    await connectToDB();
    let filterQuery: any = {};
    if (category) {
      const categoryId = await categoryText2Id(category);
      if (categoryId) {
        filterQuery.categoryId = categoryId;
      }
    }
    if (subCategory) {
      const subCategoryId = await subCategoryText2Id(subCategory);
      if (subCategoryId) {
        filterQuery.subCategoryId = subCategoryId;
      }
    }
    const totalItems = await productModel.countDocuments(filterQuery);
    const products = await productModel
      .find(filterQuery)
      .select('_id brand stockAvailability image productDescription productName overallRating url_slug price')
      .skip((page - 1) * limit)
      .lean()
      .limit(limit);
    const totalPages = Math.ceil(totalItems / limit);
    return { products, totalItems, totalPages };
  } catch (error) {
    console.error('Error fetching products by category/subcategory.', error);
    throw error;
  }
}
