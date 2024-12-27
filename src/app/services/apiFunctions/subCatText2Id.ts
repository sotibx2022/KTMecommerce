import { categoriesModel } from "@/models/categories.model";
// Subcategory search
const subCategoryText2Id = async (subCategoryText: string): Promise<string | undefined> => {
  try {
    // Search for the category containing the subcategory text
    const selectedSubCategory = await categoriesModel.findOne({
      "subcategories": {
        $elemMatch: {
          "subcategory_name": { $regex: new RegExp(`.*${subCategoryText}.*`, 'i') },
        },
      },
    });
    // If a matching category is found
    if (selectedSubCategory) {
      // Find the matching subcategory
      const matchingSubCategory = selectedSubCategory.subcategories?.find(
        (subCategory) =>
          subCategory.category_name.toLowerCase().includes(subCategoryText.toLowerCase()) // Corrected to subcategory_name
      );
      // If a matching subcategory is found, return the subcategory ID
      if (matchingSubCategory) {
        return matchingSubCategory._id.toString();
      }
    }
    // Return undefined if no subcategory is found
    return undefined;
  } catch (error) {
    console.error("Error finding subcategory ID:", error);
    throw error; // Rethrow error for further handling if needed
  }
};
export default subCategoryText2Id;
