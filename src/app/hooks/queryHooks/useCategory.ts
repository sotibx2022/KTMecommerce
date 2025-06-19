"use client"
import { getAllCategories } from "@/app/services/queryFunctions/categoreis";
import { useQuery } from "@tanstack/react-query";
export const useCategories = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: getAllCategories,
      staleTime: 24 * 60 * 60 * 1000,
    });
  };