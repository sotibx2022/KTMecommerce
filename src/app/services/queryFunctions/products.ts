import axios from "axios";
export const getAllProducts = async () => {
  const response = await axios.get(`http://localhost:3000/api/products`);
  return response.data.products;
};
export const getSingleProduct = async (productId: string) => {
  const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
  return response.data.singleProduct;
};
export interface SearchParams {
  keyword?: string | undefined;
  category?: string | undefined;
  subcategory?: string | undefined; // subcategory is optional
  minprice?: number | undefined; // minprice is optional
  maxprice?: number | undefined; // maxprice is optional
  rating?: number | undefined; // rating is optional
}
export const getSelectedProducts = async ({
  keyword,
  category,
  subcategory,
  minprice,
  maxprice,
  rating,
}: SearchParams) => {
  try {
    // Construct the URL
    let url = "http://localhost:3000/api/products/selectedProducts/advanceSearch?";
    if (keyword && keyword.trim() !== "") url += `keyword=${encodeURIComponent(keyword)}&`;
    if (category && category.trim() !== "") url += `category=${encodeURIComponent(category)}&`;
    if (subcategory && subcategory.trim() !== "") url += `subcategory=${encodeURIComponent(subcategory)}&`;
    if (minprice !== undefined && !isNaN(minprice) && minprice !== null) url += `minprice=${minprice}&`;
    if (maxprice !== undefined && !isNaN(maxprice) && maxprice !== null) url += `maxprice=${maxprice}&`;
    if (rating !== undefined && !isNaN(rating) && rating !== null) url += `rating=${rating}&`;
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }
    // Make the API call
    const response = await axios.get(url);
    return response.data.products || []; // Ensure a valid return value
  } catch (error) {
    return []; // Return an empty array on error
  }
};
