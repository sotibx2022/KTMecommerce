"use client";
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect
} from "react";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
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
  const isClient = typeof window !== "undefined";
  useEffect(() => {
    if (!isClient) return;
    const userToken = Cookies.get('userToken');
    if (!userToken) {
      localStorage.removeItem('userSafeData');
      setUserDetails(null);
    }
  }, [isClient]);
  const currentToken = isClient ? Cookies.get('userToken') : null;
  const hasLocalData = isClient ? Boolean(localStorage.getItem('userSafeData')) : false;
  const shouldFetchUser = Boolean(isClient && currentToken && !hasLocalData);
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    staleTime: 30 * 60 * 1000,
    enabled: shouldFetchUser,
  });
  useEffect(() => {
    if (!isClient) return;
    const userToken = Cookies.get('userToken');
    const userSafeData = localStorage.getItem('userSafeData');
    if (userToken && userSafeData) {
      try {
        const parsedData: IUserSafeData = JSON.parse(userSafeData);
        setUserDetails(parsedData);
      } catch (error) {
        localStorage.removeItem('userSafeData');
      }
    } else {
      localStorage.removeItem('userSafeData');
    }
    setUserDetailsLoading(false);
  }, [isClient]);
  useEffect(() => {
    if (!isClient || !query.data) return;
    const safeUserData: IUserSafeData = {
      fullName: query.data.fullName,
      profileImage: query.data.profileImage,
      _id: query.data._id.toString(),
      accountStatus: query.data.accountStatus,
      passwordHistory: Boolean(query.data.passwordHistory)
    };
    localStorage.setItem('userSafeData', JSON.stringify(safeUserData));
    setUserDetails(safeUserData);
    setUserDetailsLoading(false);
  }, [query.data, isClient]);
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails, userDetailsLoading }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
export { UserDetailsContextComponent, UserDetailsContext };