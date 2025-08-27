"use client"
import { DisplayContext } from "@/app/context/DisplayComponents";
import { authChannel } from "@/config/broadcastChannel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
export const useLogout = () => {
  const { setVisibleComponent } = useContext(DisplayContext);
  return useMutation({
    mutationFn: async () => {
      setVisibleComponent('loadingComponent');
      const response = await axios.get('/api/auth/logoutUser');
      return response.data;
    },
    onSuccess: (response) => {
      // Broadcast logout to all tabs
      authChannel.postMessage('logout');
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to log out");
    },
    onSettled: () => {
      setVisibleComponent('');
    },
  });
};
