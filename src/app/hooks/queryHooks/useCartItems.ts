import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { fetchCartFromDatabase } from "@/app/services/apiFunctions/cartItems";
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users";
import { ICartItem } from "@/app/types/cart";
import { useQuery } from "@tanstack/react-query";
export const useCartItems = () => {
  const { userDetails } = useUserDetails();
  const userId = userDetails?._id;
  return useQuery<APIResponseSuccess<ICartItem[]> | APIResponseError>({
    queryKey: ['cartItems'],
    queryFn: fetchCartFromDatabase,
    staleTime: 30 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!userId, // Only fetch if userId exists
  });
};