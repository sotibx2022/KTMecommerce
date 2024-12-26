import { connectToDB } from '@/config/db';
import { categoriesModel } from '@/models/categories.model';
import { productModel } from '@/models/products.model';
export async function getProductsByKeyword(keyword: string): Promise<any[]> { 
  try {
    await connectToDB();
    // Category search
    const selectedCategory = await categoriesModel.findOne({
      category_name: { $regex: new RegExp(`.*${keyword}.*`, 'i') },
    });
    if (selectedCategory) {
      const categoryId = selectedCategory._id;
      return await productModel.find({ categoryId }); 
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
        return await productModel.find({ subCategoryId }); 
      } 
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
    console.error('Error extracting parameters:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}