import axios from "axios";
import { CategoriesResponse } from "./categoriesData";
export const fetchInitialCategories = async()=>{
     const response = await axios.get<CategoriesResponse>(
        "/api/categories/initialCategories"
      );
      return response.data;
}