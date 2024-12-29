import { Subcategory } from "@/app/types/categories";
import CategoryModel from "@/models/categories.model";
// Function to find category object from category text
export const findCategoryObjfromCategoryText = async (categoryText: string) => {
  try {
    // Find category by name
    const category = await CategoryModel.findOne({ category_name: categoryText });
    if (category) {
      return category;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error finding category: ${error}`);
    return null; // Return null if there's an error
  }
};
// Function to find subcategory object from category and subcategory text
export const findSubCatObjfromSubCatText = async (
  categoryText: string,
  subCategoryText: string
) => {
  try {
    // Find the category first by category name
    const category = await CategoryModel.findOne({ category_name: categoryText });
    // Check if category exists
    if (!category) {
      console.error(`Category ${categoryText} not found`);
      return null; // Return null if category doesn't exist
    }
    // Find the subcategory within the found category
    const subCategory = category.subcategories?.find(
      (subcategory:Subcategory) => subcategory.category_name === subCategoryText
    );
    // Return the subcategory if found, else return null
    return subCategory || null;
  } catch (error) {
    console.error(`Error finding subcategory: ${error}`);
    return null; // Return null if there's an error
  }
};
