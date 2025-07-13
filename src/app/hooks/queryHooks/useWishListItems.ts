import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { fetchWishListFromDashboard } from "@/app/services/apiFunctions/cartItems";
import { useQuery } from "@tanstack/react-query";
export const useWishListItems = () => {
    const {userDetails} = useUserDetails()
    const userId = userDetails?._id;
    return useQuery({
      queryKey: ['wishListItems'],
      queryFn: fetchWishListFromDashboard,
      staleTime: 0,
      gcTime: 30 * 60 * 1000,
      enabled: !!userId, // Only fetch if userId exists
    });
  };