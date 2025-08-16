import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@/app/types/categories"; // adjust import path
type CategoriesResponse = {
  message: string;
  status: number;
  success: boolean;
  data: Category[];
};
export const useInitialCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ["initialCategories"],
    queryFn: async () => {
      const response = await axios.get<CategoriesResponse>(
        "/api/categories/initialCategories"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
