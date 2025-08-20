"use client";
import React, { useContext, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import ResponsiveHeader from "./responsiveHeader/ResponsiveHeader";
import LoginComponent from "../authComponent/LoginComponent";
import RegisterComponent from "../authComponent/RegisterComponent";
import PureSearch from "../pureSearch/PureSearch";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { useLogout } from "@/app/hooks/queryHooks/useLogout";
const MainPrimaryHeader: React.FC = () => {
  const { visibleComponent } = useContext(DisplayContext);
  const logout = useLogout()
  useEffect(() => {
    const handleEvent = (event: StorageEvent) => {
      if (event.key === 'logout') {
        logout.mutate();
        if(typeof window !== "undefined"){
          localStorage.removeItem('logout')
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener('storage', handleEvent);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('storage', handleEvent);
      }
    };
  }, []); // empty array: run once on mount
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
export default MainPrimaryHeader