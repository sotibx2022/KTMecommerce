import { useContext } from "react";
import SecondaryButton from "../../secondaryButton/SecondaryButton";
import NonRegisteredUsersOption from "../NonRegisteredUsersOption";
import { useLogout } from "@/app/hooks/queryHooks/useLogout";
import Link from "next/link";
import SkletonText from "../../skeletontext/SkletonText";
import RegisteredUserView from "./RegisteredUserView";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
export const UserSection = () => {
  const { userDetails,userDetailsLoading } = useUserDetails();
  if(userDetailsLoading){
    return(
      <div className="flex gap-4">
        <SkletonText/>
        <SkletonText/>
      </div>
    )
  }
  return (
    <div className="userSpecificArea shadow-primaryLight my-4 py-4 px-4">
      <h3 className="text-lg font-semibold mb-3 text-primaryDark">Navigate To Proceed</h3>
     {userDetailsLoading?<div className="flex gap-4">
        <SkletonText/>
        <SkletonText/>
      </div>:userDetails?<RegisteredUserView userDetails={userDetails}/>:<NonRegisteredUsersOption/>}
    </div>
  );
};