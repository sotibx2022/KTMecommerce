"use client"
import { DisplayContext } from "@/app/context/DisplayComponents";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { authChannel } from "@/config/broadcastChannel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const { setUserDetails } = useUserDetails();
  const { setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter()
  return useMutation({
    mutationFn: async () => {
      setVisibleComponent('loadingComponent');
      const response = await axios.get('/api/auth/logoutUser');
      return response.data;
    },
    onSuccess: (response) => {
      authChannel.postMessage('logout');
      toast.success(response.message);
      setUserDetails(null);
      router.push('/')
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to log out");
    },
    onSettled: () => {
      setVisibleComponent('');
    },
  });
};
