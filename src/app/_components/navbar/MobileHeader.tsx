"use client";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DisplayContext } from "@/app/context/DisplayComponents";
import SkletonText from "../skeletontext/SkletonText";
import LogoComponent from "../logoComponent/LogoComponent";
const MobileHeader = () => {
  const { setVisibleComponent } = useContext(DisplayContext);
  return (
    <header className="flex lg:hidden bg-background w-full">
      <div className="container flex justify-between items-center">
        <div className="logoImage">
         <LogoComponent/>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[20px] h-[20px] flex items-center justify-end">
            <FontAwesomeIcon
              icon={faBars}
              className="text-primaryDark cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12"
              onClick={() => setVisibleComponent('responsiveHeader')}
              size='lg'
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default MobileHeader;