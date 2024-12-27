import { categoriesModel } from "@/models/categories.model";
const categoryText2Id = async (categoryText: string): Promise<string | undefined> => {
  try {
    // Search for the category matching the text
    const selectedCategory = await categoriesModel.findOne({
      category_name: { $regex: new RegExp(`.*${categoryText}.*`, 'i') }, // Use categoryText, not keyword
    });
    // Return the category ID if found
    if (selectedCategory) {
      return selectedCategory._id.toString(); // Ensure the ID is returned as a string
    }
    // Return undefined if no category is found
    return undefined;
  } catch (error) {
    console.error("Error fetching category ID:", error);
    throw error; // Propagate the error to the caller
  }
};
export default categoryText2Id;
