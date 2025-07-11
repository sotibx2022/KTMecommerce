import { fetchAllOrders } from "@/app/services/queryFunctions/orders";
import { OrderDetailsProps } from "@/app/types/orders";
import { useQuery } from "@tanstack/react-query"
 export const useOrders = (userId:string)=>{
    return useQuery<OrderDetailsProps[]>({
    queryKey: ['orders', userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("Email is required");
      }
      return fetchAllOrders(userId);
    },
    enabled: !!userId
  });
}