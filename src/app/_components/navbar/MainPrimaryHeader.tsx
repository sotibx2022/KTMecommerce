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
      if (event.data === 'logout') {
        // Clear user context
        setUserDetails(null);
        // Clear React Query cache
        queryClient.setQueryData(['user'], null);
        queryClient.setQueryData(['cartItems'], null);
        // Optional: clear persisted Redux state
        localStorage.removeItem('persist:root');
        // Redirect to homepage or login
        router.push('/');
      }
    };
    // Add listener
    authChannel.addEventListener('message', handleLogout);
    // Cleanup on unmount
    return () => authChannel.removeEventListener('message', handleLogout);
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
