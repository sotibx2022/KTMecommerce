import { useContext } from "react";
import SecondaryButton from "../../secondaryButton/SecondaryButton";
import NonRegisteredUsersOption from "../NonRegisteredUsersOption";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import { useLogout } from "@/app/hooks/queryHooks/useLogout";
interface UserSectionProps {
}
export const UserSection = () => {
  const context = useContext(UserDetailsContext);
  const logout = useLogout()
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  return (
    <div className="userSpecificArea shadow-primaryLight my-4 py-4 px-4">
      {userDetails ? (
        <div className="registeredUser flex justify-between items-center px-4">
          <div className="imageArea flex gap-2">
            {userDetails.profileImage ? (
              <img
                src={userDetails.profileImage}
                alt="User Profile"
                className="w-[30px] h-[30px] rounded-full"
              />
            ) : (
              <h1 className="text-primaryDark uppercase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full">
                {userDetails.fullName.split("")[0].toUpperCase()}
              </h1>
            )}
            <p className="text-primaryDark capitalize flex gap-2">
              <span className="text-helper">Welcome</span> 
              {userDetails.fullName.split(" ")[0]}
            </p>
          </div>
          <SecondaryButton text="Log Out" onClick={logout.mutate} />
        </div>
      ) : (
        <NonRegisteredUsersOption />
      )}
    </div>
  );
};