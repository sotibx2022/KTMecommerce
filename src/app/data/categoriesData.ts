import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@/app/types/categories"; // adjust import path
import { fetchInitialCategories } from "./fetchInitialCategories";
export type CategoriesResponse = {
  message: string;
  status: number;
  success: boolean;
  data: Category[];
};
export const useInitialCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ["initialCategories"],
    queryFn: fetchInitialCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
