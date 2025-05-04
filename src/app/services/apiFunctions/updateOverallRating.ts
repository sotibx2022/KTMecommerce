import { productModel } from "@/models/products.model";
const updateRating = async (productId: string): Promise<void> => {
  try {
    const product = await productModel.findById(productId);
    if (product) {
      await product.updateOverallRating();
    }
  } catch (error) {
    console.error(`Error updating rating for product ${productId}:`, error);
    // No need to rethrow if you don't want to handle errors in calling functions
  }
};
export default updateRating;