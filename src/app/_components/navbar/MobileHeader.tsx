"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { DisplayContext } from "@/app/context/DisplayComponents";
import SkletonText from "../skeletontext/SkletonText";
import NonRegisteredUsersOption from "./NonRegisteredUsersOption";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import UserOptions from "./UserOptions";
import { User } from "lucide-react";
const MobileHeader = () => {
  const { setVisibleComponent } = useContext(DisplayContext);
  const { userDetails, userDetailsLoading } = useUserDetails();
  const [showUserOptions, setShowUserOptions] = useState(false);
  return (
    <header
      className="flex lg:hidden w-full py-2 sticky top-0 z-50"
      style={{ background: "var(--backgroundGradientWithHelper)" }}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="logoImage">
          <img src="/assets/brand/mobilelogo.png" alt="mobilelogo" width={50} />
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* User details */}
          {userDetailsLoading ? (
            <div className="flex gap-4 w-[30px] h-[30px] rounded-md bg-primaryLight animate-pulse" />
          ) : userDetails ? (
            <div className="registeredUser flex flex-col gap-2 px-4">
              <div
                className="flex gap-2 items-center relative cursor-pointer"
                onMouseEnter={() => setShowUserOptions(true)}
                onMouseLeave={() => setShowUserOptions(false)}
              >
                {/* Profile Image or Initial */}
                {userDetails.profileImage ? (
                  <img
                    src={userDetails.profileImage}
                    alt="User Profile"
                    className="w-[30px] h-[30px] rounded-full border-2 border-helper"
                  />
                ) : (
                  <h1 className="text-primaryDark uppercase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full border-2 border-helper">
                    {(userDetails.fullName || userDetails.email)
                      ?.charAt(0)
                      .toUpperCase()}
                  </h1>
                )}
                {/* Account label + caret */}
                <h2 className="primaryParagraph">Account</h2>
                <FontAwesomeIcon
                  icon={showUserOptions ? faCaretUp : faCaretDown}
                />
                {/* Dropdown options */}
                {showUserOptions && <UserOptions />}
              </div>
            </div>
          ) : (
            <User
              className="text-primaryDark cursor-pointer"
              onClick={() => setVisibleComponent("register")}
            />
          )}
          {/* Menu (bars) */}
          <div className="w-[20px] h-[20px] flex items-center justify-end">
            <FontAwesomeIcon
              icon={faBars}
              className="text-primaryDark cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12"
              onClick={() => setVisibleComponent("responsiveHeader")}
              size="lg"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default MobileHeader;
