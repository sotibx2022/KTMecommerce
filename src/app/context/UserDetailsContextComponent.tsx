"use client";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect
} from "react";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
export interface IUserSafeData {
  fullName: string;
  profileImage?: string;
  _id: string;
  accountStatus?: string;
  passwordHistory: boolean;
}
interface UserDetailsContextProps {
  userDetails: IUserSafeData | null;
  setUserDetails: React.Dispatch<React.SetStateAction<IUserSafeData | null>>;
  userDetailsLoading: boolean;
}
const UserDetailsContext = createContext<UserDetailsContextProps | undefined>(undefined);
interface UserDetailsProviderProps {
  children: ReactNode;
}
const UserDetailsContextComponent: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUserSafeData | null>(null);
  const [userDetailsLoading, setUserDetailsLoading] = useState<boolean>(true);
const { data: userData, isPending } = useQuery({
  queryKey: ['user'],
  queryFn: getUserDetails,
  staleTime: 300000,
  gcTime: 1800000,
})
  useEffect(() => {
    if (userData) {
      const userSafeData = {
        fullName: userData?.fullName || "",
        profileImage: userData?.profileImage,
        _id: userData?._id.toString() || "",
        accountStatus: userData?.accountStatus,
        passwordHistory: userData?.passwordHistory && userData.passwordHistory.length>0 ? true : false,
      }
      setUserDetails(userSafeData)
    }
    if (isPending) {
      setUserDetailsLoading(true);
    } else {
      setUserDetailsLoading(false);
    }
  }, [userData, isPending])
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails, userDetailsLoading }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
// ✅ Correct way: Custom hook to access the context
const useUserDetails = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsContextComponent.");
  }
  return context;
};
export { UserDetailsContextComponent, useUserDetails };
