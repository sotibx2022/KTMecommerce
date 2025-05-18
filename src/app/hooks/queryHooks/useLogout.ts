"use client"
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { setUserDetails } = context;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: async () => {
      toast.success("Logged out successfully");
      queryClient.setQueryData(['user'], null);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      setUserDetails(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to log out");
    },
  });
};