import { SpecificProducts } from "@/app/services/apiFunctions/productsQuery";
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users";
import { IProductDisplay } from "@/app/types/products";
import { useQuery } from "@tanstack/react-query"
interface CategoryItems{
  products:IProductDisplay[],
  pagination: {
            currentPage: number,
            totalPages: number,
            totalItems: number,
            limit: number,
          },
}
export const useSpecificCataegory = (categoryType:string,page:number,limit:number)=>{
    return useQuery<APIResponseSuccess<CategoryItems>|APIResponseError>({
        queryKey: ['categoryType',categoryType],
        queryFn: () => SpecificProducts(categoryType,page.toString(),limit.toString()),
        enabled:!!categoryType,
        staleTime: 1 * 60 * 60 * 1000,
      });
}