"use client"
import { DisplayContext } from "@/app/context/DisplayComponents";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { setUserDetails } = context;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      setVisibleComponent('loadingComponent');
      const response = await axios.get('/api/auth/logoutUser');
      return response.data;
    },
    onSuccess: async (response) => {
      try {
        setVisibleComponent('')
        setUserDetails(null);
        localStorage.removeItem('userSafeData');
        await Promise.all([
          queryClient.setQueryData(['user'], null),
          queryClient.setQueryData(['cartItems'], null),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
          queryClient.invalidateQueries({ queryKey: ['cartItems'] }),
        ]);
        toast.success(response.message);
        router.push('/');
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