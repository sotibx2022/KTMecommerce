"use client"
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { logoutUser } from "@/app/services/apiFunctions/logoutUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
     const context = useContext(UserDetailsContext);
       if (!context) {
         throw new Error("The User Details context is not working.");
       }
       const { userDetails,setUserDetails } = context;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async (response) => {
      if (response.success) {
        toast.success(response.message);
        queryClient.setQueryData(['user'], null); // Should set to null when logging out
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        setUserDetails(null);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};