import { fetchAllOrders } from "@/app/services/queryFunctions/orders";
import { OrderDetailsProps } from "@/app/types/orders";
import { useQuery } from "@tanstack/react-query"
 export const useOrders = (userEmail:string)=>{
    return useQuery<OrderDetailsProps[]>({
    queryKey: ['orders', userEmail],
    queryFn: () => {
      if (!userEmail) {
        throw new Error("Email is required");
      }
      return fetchAllOrders(userEmail);
    },
    enabled: !!userEmail
  });
}