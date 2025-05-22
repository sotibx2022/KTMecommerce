"use client"
import { DisplayContext } from "@/app/context/DisplayComponents";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { setUserDetails } = context;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      setVisibleComponent('loadingComponent');
      await signOut({ redirect: false });
    },
    onSuccess: async () => {
      try {
        // Reset all relevant state first
        setUserDetails(null);
        // Invalidate queries in parallel for better performance
        await Promise.all([
          queryClient.setQueryData(['user'], null),
          queryClient.setQueryData(['cartItems'], null),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
          queryClient.invalidateQueries({ queryKey: ['cartItems'] }),
          // Add any other queries that need invalidation
        ]);
        toast.success("Logged out successfully");
      } catch (error) {
        console.error("Logout cleanup error:", error);
        toast.error("Logged out, but some cleanup failed");
      } finally {
        setVisibleComponent('');
      }
    },
    onError: (error: Error) => {
      setVisibleComponent('');
      toast.error(error.message || "Failed to log out");
      console.error("Logout error:", error);
    },
    onSettled: () => {
      // Ensure loading is always removed
      setVisibleComponent('');
    }
  });
};