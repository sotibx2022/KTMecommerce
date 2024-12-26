import { connectToDB } from '@/config/db';
import { categoriesModel } from '@/models/categories.model';
import { productModel } from '@/models/products.model';
interface SearchResponse {
  message: string;
  status: number;
  success: boolean;
  products: any[]; // Or a more specific type for your product model
}
export async function getProductsByKeyword(keyword: string): Promise<SearchResponse> {
  try {
    await connectToDB();
    // Category search
    const selectedCategory = await categoriesModel.findOne({
      category_name: { $regex: new RegExp(`.*${keyword}.*`, 'i') },
    });
    if (selectedCategory) {
      const categoryId = selectedCategory._id;
      const products = await productModel.find({ categoryId });
      if (products && products.length > 0) {
        return {
          message: "Products found successfully",
          status: 200,
          success: true,
          products,
        };
      } else {
        return {
          message: "No products found for this category",
          status: 404,
          success: false,
          products: [],
        };
      }
    }
    // Subcategory search
    const selectedSubCategory = await categoriesModel.findOne({
      "subcategories": {
        $elemMatch: {
          "subcategory_name": { $regex: new RegExp(`.*${keyword}.*`, 'i') },
        },
      },
    });
    if (selectedSubCategory) {
      const matchingSubCategory = selectedSubCategory?.subcategories?.find(
        (subCategory) =>
          subCategory.category_name.toLowerCase().includes(keyword.toLowerCase())
      );
      if (matchingSubCategory) {
        const subCategoryId = matchingSubCategory._id.toString();
        const products = await productModel.find({ subCategoryId });
        if (products && products.length > 0) {
          return {
            message: "Products found",
            status: 200,
            success: true,
            products,
          };
        } else {
          return {
            message: "No products found for this subcategory",
            status: 404,
            success: false,
            products: [],
          };
        }
      } else {
        // Full-text search
        const products = await productModel.find({
          $or: [
            { productName: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
            { productDescription: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
            { productBrand: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          ],
        });
        if (products && products.length > 0) {
          return {
            message: "Products found",
            status: 200,
            success: true,
            products,
          };
        } else {
          return {
            message: "No products found",
            status: 404,
            success: false,
            products: [],
          };
        }
      }
    } else {
      // Full-text search
      const products = await productModel.find({
        $or: [
          { productName: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { productDescription: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
          { productBrand: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
        ],
      });
      if (products && products.length > 0) {
        return {
          message: "Products found",
          status: 200,
          success: true,
          products,
        };
      } else {
        return {
          message: "No products found",
          status: 404,
          success: false,
          products: [],
        };
      }
    }
  } catch (error) {
    console.error('Error extracting parameters:', error);
    return {
      message: 'An error occurred while extracting parameters',
      status: 500,
      success: false,
      products: [],
    };
  }
}