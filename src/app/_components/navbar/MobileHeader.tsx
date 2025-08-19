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
    <header className="flex lg:hidden  w-full py-2  sticky  top-0 z-50"
      style={{ background: 'var(--backgroundGradientWithHelper)' }}>
      <div className="container flex justify-between items-center">
        <div className="logoImage">
          <img src='/assets/brand/mobilelogo.png' alt="mobilelogo" width={50} />
        </div>
        <div className="flex items-center gap-4">
          {userDetailsLoading ? <div className="flex gap-4 w-[30px] h-[30px] rounded-md bg-primaryLight animate-pulse">
          </div> : userDetails ?
            <div className="registeredUser flex flex-col gap-2 px-4">
              <div className="imageArea flex gap-2">
                {userDetails.profileImage ? (
                  <img
                    src={userDetails.profileImage}
                    alt="User Profile"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                ) : (
                  <div className="flex gap-1 items-center relative cursor-pointer"
                    onMouseEnter={() => setShowUserOptions(true)}
                    onMouseLeave={() => setShowUserOptions(false)}
                  > <h1 className="text-primaryDark uppercase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full border-2 border-helper"
                  >
                      {(userDetails.fullName||userDetails.email)?.charAt(0).toUpperCase()}
                    </h1>
                    <h2 className="primaryParagraph">Account</h2>
                    <FontAwesomeIcon
                      icon={showUserOptions ? faCaretUp : faCaretDown}
                    />
                    {showUserOptions && <UserOptions />}
                  </div>
                )}
              </div>
            </div>
            : <User className="text-primaryDark cursor-pointer" onClick={() => setVisibleComponent('register')}
            />}
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