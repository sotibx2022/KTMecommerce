import { connectToDB } from "@/config/db";
import categoryText2Id from "./categoryText2Id";
import subCategoryText2Id from "./subCatText2Id";
import { productModel } from "@/models/products.model";
import { IProductCreate } from "@/app/types/products";
export async function getProductsByKeyword(keyword: string, page: number = 1, limit: number = 10): Promise<{ products: IProductCreate[], totalItems: number, totalPages: number }> { 
  try {
    await connectToDB();
    let filterQuery: any = {}; // Initialize an empty filter query object
    // Category search
    const categoryId = await categoryText2Id(keyword);
    if (categoryId) {
      filterQuery.categoryId = categoryId; // Add category filter to the query
    }
    // Subcategory search
    const subCategoryId = await subCategoryText2Id(keyword);
    if (subCategoryId) {
      filterQuery.subCategoryId = subCategoryId; // Add subcategory filter to the query
    }
    // Full-text search (for productName, productDescription, productBrand)
    if (!categoryId && !subCategoryId) {
      filterQuery = {
        $or: [
          { productName: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { productDescription: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { productBrand: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
        ],
      };
    }
    // Fetch total count of matching products (for pagination purposes)
    const totalItems = await productModel.countDocuments(filterQuery);
    // Fetch products based on the filter query, with pagination applied
    const products = await productModel
      .find(filterQuery)
      .skip((page - 1) * limit)  // Skip products from previous pages
      .limit(limit);  // Limit the number of products per page
    const totalPages = Math.ceil(totalItems / limit);  // Calculate total pages
    return { products, totalItems, totalPages };  // Return products and pagination data
  } catch (error) {
    console.error('Error fetching products on the basis of keyword.', error);
    throw error;  // Re-throw the error to be handled by the calling function
  }
}
