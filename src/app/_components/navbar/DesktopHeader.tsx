"use client";
import React, { useContext } from "react";
import LinkComponent from "../linkComponent/LinkComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DisplayContext } from "@/app/context/DisplayComponents";
import RegisteredUsersOption from "./RegisteredUsersOption";
import NonRegisteredUsersOption from "./NonRegisteredUsersOption";
import SkletonText from "../skeletontext/SkletonText";
import { navigationLinks } from "@/app/data/navigationLinks";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { useDispatch } from "react-redux";
import { clearCartItems } from "@/app/redux/cartSlice";
import { clearWishListItems } from "@/app/redux/wishListSlice";
const DesktopHeader = () => {
  const { setVisibleComponent } = useContext(DisplayContext);
  const { userDetails, userDetailsLoading } = useUserDetails();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!userDetails) {
      dispatch(clearCartItems());
      dispatch(clearWishListItems());
    }
  }, [userDetails, dispatch]);
  return (
    <header className="hidden lg:flex bg-primaryDark w-full">
      <div className="container flex justify-between items-center">
        <ul className="flex justify-center gap-4">
          {navigationLinks.map((link, index) => (
            <li className="text-background" key={index}>
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
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