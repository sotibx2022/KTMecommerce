"use client";
import React, { useContext } from "react";
import LinkComponent from "../linkComponent/LinkComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import RegisteredUsersOption from "./RegisteredUsersOption";
import NonRegisteredUsersOption from "./NonRegisteredUsersOption";
import SkletonText from "../skeletontext/SkletonText";
import { navigationLinks } from "@/app/data/navigationLinks";
const DesktopHeader = () => {
  const { setVisibleComponent } = useContext(DisplayContext);
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails, userDetailsLoading } = context;
  return (
    <header className="hidden lg:flex bg-primaryDark w-full">
      <div className="container flex justify-between items-center">
        <ul className="flex justify-center  gap-4">
          {navigationLinks.map((link, index) => (
            <li className="text-background" key={index}>
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="flex items-center h-[2rem] gap-2">
            {userDetailsLoading ? (
              <div className="gap-2 flex">
                <SkletonText />
                <SkletonText />
              </div>
            ) : userDetails ? (
              <RegisteredUsersOption />
            ) : (
              <NonRegisteredUsersOption />
            )}
          </div>
          <div className="w-[20px] h-[20px] flex items-center justify-end">
            <FontAwesomeIcon
              icon={faBars}
              className="text-background cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12"
              onClick={() => setVisibleComponent('responsiveHeader')}
              size='lg'
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default DesktopHeader;