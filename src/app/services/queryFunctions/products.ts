import { config } from "@/config/configuration";
import axios from "axios";
import { APIResponseError, APIResponseSuccess } from "./users";
import { IProductDisplay } from "@/app/types/products";
export const getAllProducts = async () => {
  const response = await axios.get(`${config.websiteUrl}/api/products`);
  return response.data.products;
};
export const getSingleProduct = async (productId: string):Promise<APIResponseSuccess<IProductDisplay>> => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
};
export interface SearchParams {
  keyword?: string | undefined;
  category?: string | undefined;
  subcategory?: string | undefined; 
  page?:number | undefined;
}
export const getSelectedProducts = async ({
  keyword,
  category,
  subcategory,
}: SearchParams) => {
  try {
    let url = `/api/allProducts/displayProducts/advanceSearch?`;
    if (keyword && keyword.trim() !== "") url += `keyword=${encodeURIComponent(keyword)}&`;
    if (category && category.trim() !== "") url += `category=${encodeURIComponent(category)}&`;
    if (subcategory && subcategory.trim() !== "") url += `subCategory=${encodeURIComponent(subcategory)}&`;
    url += `t=${Date.now()}`;
    const response = await axios.get(url);
    return response.data || []; // Ensure a valid return value
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array on error
  }
};
