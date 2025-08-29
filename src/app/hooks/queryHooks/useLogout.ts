"use client"
import { DisplayContext } from "@/app/context/DisplayComponents";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { authChannel } from "@/config/broadcastChannel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const { setUserDetails } = useUserDetails();
  const { setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      setVisibleComponent('loadingComponent');
      const response = await axios.get('/api/auth/logoutUser');
      return response.data;
    },
    onSuccess: (response) => {
  setUserDetails(null); // clear context first
  queryClient.setQueryData(['user'], null);
  queryClient.setQueryData(['cartItems'], null);
  queryClient.setQueryData(['wishlistItems'], null);
  localStorage.removeItem('persist:root'); // clear redux persist
  authChannel.postMessage('logout'); // notify other tabs
  toast.success(response.message);
  router.push('/'); // navigate after clearing state
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to log out");
    },
    onSettled: () => {
      setVisibleComponent('');
    },
  });
};
