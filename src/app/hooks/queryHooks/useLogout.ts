"use client"
import { DisplayContext } from "@/app/context/DisplayComponents";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const { setUserDetails } = useUserDetails();
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
        await Promise.all([
          queryClient.setQueryData(['user'], null),
          queryClient.setQueryData(['cartItems'], null),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
          queryClient.invalidateQueries({ queryKey: ['cartItems'] }),
        ]);
        toast.success(response.message);
        router.push('/');
      } catch (error) {
      } finally {
        setVisibleComponent('');
      }
    },
    onError: (error: Error) => {
      setVisibleComponent('');
      toast.error(error.message || "Failed to log out");
    },
    onSettled: () => {
      // Ensure loading is always removed
      setVisibleComponent('');
    }
  });
};