import { SpecificProducts } from "@/app/services/apiFunctions/productsQuery";
import { IProductDisplay } from "@/app/types/products";
import { useQuery } from "@tanstack/react-query"
export const useSpecificCataegory = (categoryType:string)=>{
    return useQuery<IProductDisplay[]>({
        queryKey: ['categoryType',categoryType],
        queryFn: () => SpecificProducts(categoryType),
        enabled:!!categoryType,
        staleTime: 1 * 60 * 60 * 1000,
      });
}