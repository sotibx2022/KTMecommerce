"use client";
import React, { useContext, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import ResponsiveHeader from "./responsiveHeader/ResponsiveHeader";
import LoginComponent from "../authComponent/LoginComponent";
import RegisterComponent from "../authComponent/RegisterComponent";
import PureSearch from "../pureSearch/PureSearch";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { authChannel } from "@/config/broadcastChannel";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const MainPrimaryHeader: React.FC = () => {
  const { setUserDetails } = useUserDetails();
  const { visibleComponent } = useContext(DisplayContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    const handleLogout = (event: MessageEvent) => {
      console.log("[BroadcastChannel] Received message:", event.data);
      if (event.data === 'logout') {
        console.log("[Logout] Clearing user context...");
        setUserDetails(null);
        console.log("[Logout] Clearing React Query cache for 'user' and 'cartItems'...");
        queryClient.setQueryData(['user'], null);
        queryClient.setQueryData(['cartItems'], null);
        console.log("[Logout] Removing persisted Redux state from localStorage...");
        localStorage.removeItem('persist:root');
        console.log("[Logout] Redirecting to homepage...");
        router.push('/');
      } else {
        console.log("[BroadcastChannel] Message ignored:", event.data);
      }
    };
    console.log("[MainPrimaryHeader] Adding BroadcastChannel listener for logout");
    authChannel.addEventListener('message', handleLogout);
    return () => {
      console.log("[MainPrimaryHeader] Removing BroadcastChannel listener");
      authChannel.removeEventListener('message', handleLogout);
    };
  }, [queryClient, router, setUserDetails]);
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      {visibleComponent === "responsiveHeader" && <ResponsiveHeader />}
      {visibleComponent === "login" && <LoginComponent />}
      {visibleComponent === "register" && <RegisterComponent />}
      {visibleComponent === "pureSearch" && <PureSearch />}
    </>
  );
};
export default MainPrimaryHeader;
