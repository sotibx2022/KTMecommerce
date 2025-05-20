import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { fetchCartFromDatabase } from "@/app/services/apiFunctions/cartItems";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
// In `useCartItems` hook
export const useCartItems = () => {
    const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error("The User Details context is not working.")
    }
    const {userDetails} = context;
    const userId = userDetails?._id;
    return useQuery({
      queryKey: ['cartItems'],
      queryFn: fetchCartFromDatabase,
      staleTime: 0,
      gcTime: 30 * 60 * 1000,
      enabled: !!userId, // Only fetch if userId exists
    });
  };