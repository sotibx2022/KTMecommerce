import { useContext } from "react";
import SecondaryButton from "../../secondaryButton/SecondaryButton";
import NonRegisteredUsersOption from "../NonRegisteredUsersOption";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { useLogout } from "@/app/hooks/queryHooks/useLogout";
import Link from "next/link";
import SkletonText from "../../skeletontext/SkletonText";
import RegisteredUserView from "./RegisteredUserView";
interface UserSectionProps {
}
export const UserSection = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails,userDetailsLoading } = context;
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
     {userDetailsLoading?<div className="flex gap-4">
        <SkletonText/>
        <SkletonText/>
      </div>:userDetails?<RegisteredUserView userDetails={userDetails}/>:<NonRegisteredUsersOption/>}
    </div>
  );
};