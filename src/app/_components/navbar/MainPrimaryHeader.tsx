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
const links = [
  { href: "/", text: "Home" },
  { href: "/pages/carreers", text: "Careers" },
  { href: "/pages/help", text: "Help" },
  { href: "/pages/terms", text: "Terms" },
  { href: "/pages/contact", text: "Contact Us" },
];
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
    <div className="bg-background lg:bg-primaryDark">
      <nav className="container flex justify-between items-center py-1">
        <ul className="hidden lg:flex justify-center items-center gap-4">
          {links.map((link, index) => (
            <li className="text-background" key={index}>
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
        <div className="flex gap-4 items-center">
          <div className="hidden lg:flex justify-center items-center gap-4">
            <div className="flex items-center h-[2rem] w-auto gap-2">
              {userDetails? <RegisteredUsersOption/>:<NonRegisteredUsersOption/>}
            </div>
          </div>
          <div className="sm:hidden">
            <img
              src="../assets/brand/logo.png"
              alt="Brand Logo"
              className="w-auto h-[50px] min-w-[150px] filter-1"
            />
          </div>
          <FontAwesomeIcon
            icon={faBars}
            className="text-primaryDark cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12 lg:text-background"
            onClick={setResponsiveHeader}
          />
        </div>
      </nav>
     </div>
     {visibleComponent === "responsiveHeader" && <ResponsiveHeader />}
     {visibleComponent === "login" && <LoginComponent />}
     {visibleComponent === "register" && <RegisterComponent />}
     {visibleComponent === "pureSearch" && <PureSearch />}
     </>
  );
};
export default MainPrimaryHeader;
