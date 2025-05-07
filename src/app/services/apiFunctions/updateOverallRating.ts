import { productModel } from "@/models/products.model";
const updateRating = async (productId: string): Promise<void> => {
  try {
    const product = await productModel.findById(productId);
    if (product) {
      await product.updateOverallRating();
    }
  } catch (error) {
    console.error(`Error updating rating for product ${productId}:`, error);
  }
};
export default updateRating;