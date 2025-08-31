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
     staleTime: Infinity,     // 🛑 Data never becomes stale
    gcTime: Infinity,        // 🛑 Data is never garbage collected
    refetchOnMount: false,   // 🛑
    refetchOnWindowFocus: false, // 🛑
    refetchOnReconnect: false,   // 🛑
    retry: false,   
  });
};
