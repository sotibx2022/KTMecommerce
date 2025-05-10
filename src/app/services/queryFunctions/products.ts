import { config } from "@/config/configuration";
import axios from "axios";
import { APIResponseError, APIResponseSuccess } from "./users";
import { IProductDisplay } from "@/app/types/products";
export const getAllProducts = async () => {
  const response = await axios.get(`${config.websiteUrl}/api/products`);
  return response.data.products;
};
export const getSingleProduct = async (productId: string):Promise<APIResponseSuccess<IProductDisplay>|APIResponseError> => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
};
export interface SearchParams {
  item?:string |undefined;
  keyword?: string | undefined;
  category?: string | undefined;
  subcategory?: string | undefined; // subcategory is optional
  minprice?: number | undefined; // minprice is optional
  maxprice?: number | undefined; // maxprice is optional
  rating?: number | undefined; // rating is optional
  page?:number | undefined;
}
export const getSelectedProducts = async ({
  item,
  keyword,
  category,
  subcategory,
  minprice,
  maxprice,
  rating,
}: SearchParams) => {
  try {
    // Construct the URL
    let url = `/api/products/selectedProducts/`;
    if (item && item.trim()!=="") url += `item=${encodeURIComponent(item)}&`;
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
    return response.data || []; // Ensure a valid return value
  } catch (error) {
    return []; // Return an empty array on error
  }
};
