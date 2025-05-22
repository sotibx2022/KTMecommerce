"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import LinkComponent from "../linkComponent/LinkComponent";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { DisplayComponents, DisplayContext } from "@/app/context/DisplayComponents";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import RegisteredUsersOption from "./RegisteredUsersOption";
import NonRegisteredUsersOption from "./NonRegisteredUsersOption";
import ResponsiveHeader from "./responsiveHeader/ResponsiveHeader";
import LoginComponent from "../authComponent/LoginComponent";
import RegisterComponent from "../authComponent/RegisterComponent";
import PureSearch from "../pureSearch/PureSearch";
import { navigationLinks } from "@/app/data/navigationLinks";
const MainPrimaryHeader: React.FC = () => {
  const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
  const context = useContext(UserDetailsContext);
  if(!context){
    throw new Error("The User Details context is not working.")
  }
  const {userDetails} = context;
  const responsiveHeaderRef = useRef<HTMLDivElement | null>(null); // Ref for the responsive header
  const setResponsiveHeader=()=>{
    setVisibleComponent('responsiveHeader');
  }
  return (
    <>
          <section className="headerRow bg-background lg:bg-primaryDark">
            <div className="container flex justify-between items-center">
            <div className="logoImage lg:hidden">
            <img
              src="../assets/brand/logo.png"
              alt="Brand Logo"
              className="w-auto h-[50px] min-w-[150px]"
            />
            </div>
            <div className="hiddenElements hidden lg:flex justify-between w-[90%]">
              <ul className="flex justify-center items-center gap-4">
          {navigationLinks.map((link, index) => (
            <li className="text-background" key={index}>
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
<div className="flex justify-center items-center gap-4">
            <div className="flex items-center h-[2rem] w-auto gap-2">
              {userDetails? <RegisteredUsersOption/>:<NonRegisteredUsersOption/>}
            </div>
          </div>
            </div>
            <div className="ResponsiveIcon w-[20px] h-[20px] flex items-center justify-end">
              <FontAwesomeIcon
            icon={faBars}
            className="text-primaryDark cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12 lg:text-background"
            onClick={setResponsiveHeader}
            size='lg'
          />
            </div>
     </div>
          </section>
     {visibleComponent === "responsiveHeader" && <ResponsiveHeader />}
     {visibleComponent === "login" && <LoginComponent />}
     {visibleComponent === "register" && <RegisterComponent />}
     {visibleComponent === "pureSearch" && <PureSearch />}
     </>
  );
};
export default MainPrimaryHeader;
