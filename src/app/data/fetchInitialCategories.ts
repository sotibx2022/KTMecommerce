import axios from "axios";
import { CategoriesResponse } from "./categoriesData";
import { config } from "@/config/configuration";
export const fetchInitialCategories = async () => {
  const response = await axios.get<CategoriesResponse>(
    `${config.websiteUrl}/api/categories/initialCategories` // Removed the extra $ and '
  );
  return response.data;
}