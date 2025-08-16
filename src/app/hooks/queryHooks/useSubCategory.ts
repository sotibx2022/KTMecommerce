import { useInitialCategories } from "@/app/data/categoriesData";
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
export interface ISubCategoryData {
  category_name: string;
}
export interface ISubCategoryDatas {
  _id: string;
  subcategories: ISubCategoryData[];
}
export const useSubCategory = (categoryValue?: string) => {
  const {data:navItems,isPending} = useInitialCategories();
  const initialCategories = navItems?.data??[];
  const categoryExists = useMemo(() => {
    if (!categoryValue) return false; // early exit if undefined/null
    return initialCategories.some(
      (category) =>
        category.category_name.toLowerCase() === categoryValue.toLowerCase()
    );
  }, [categoryValue]);
  const fetchSubCategories = async (): Promise<
    APIResponseSuccess<ISubCategoryDatas> | APIResponseError
  > => {
    const response = await axios.get(`/api/categories/${categoryValue}`);
    return response.data;
  };
  return useQuery({
    queryKey: ['subCategory', categoryValue],
    queryFn: fetchSubCategories,
    enabled: !!categoryValue && categoryExists,
  });
};
