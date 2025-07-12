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
// Interface for user data
export interface IUserSafeData {
  fullName: string;
  profileImage?: string;
  _id: string;
  accountStatus?: string;
  passwordHistory: boolean;
}
// Context props interface
interface UserDetailsContextProps {
  userDetails: IUserSafeData | null;
  setUserDetails: React.Dispatch<React.SetStateAction<IUserSafeData | null>>;
  userDetailsLoading: boolean;
}
// Create context
const UserDetailsContext = createContext<UserDetailsContextProps | undefined>(undefined);
// Props for provider
interface UserDetailsProviderProps {
  children: ReactNode;
}
const UserDetailsContextComponent: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUserSafeData | null>(null);
  const [userDetailsLoading, setUserDetailsLoading] = useState<boolean>(true);
  // Check if we're on the client
  const isClient = typeof window !== "undefined";
  // Check token and clean up localStorage if needed
  useEffect(() => {
    if (!isClient) return;
    const userToken = Cookies.get('userToken');
    if (!userToken) {
      localStorage.removeItem('userSafeData');
      setUserDetails(null);
    }
  }, [isClient]);
  // Only enable the query if we have a token and no cached data
  const shouldFetchUser = Boolean(
    isClient &&
    Cookies.get('userToken') &&
    !localStorage.getItem('userSafeData')
  );
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    staleTime: 30 * 60 * 1000,
    enabled: shouldFetchUser,
  });
  // Load from localStorage if available
  useEffect(() => {
    if (!isClient) return;
    const userToken = Cookies.get('userToken');
    const userSafeData = localStorage.getItem('userSafeData');
    if (userToken && userSafeData) {
        const parsedData: IUserSafeData = JSON.parse(userSafeData);
        setUserDetails(parsedData);
    }else{
localStorage.removeItem('userSafeData');
    }
    setUserDetailsLoading(false);
  }, [isClient]);
  // Update localStorage when new data is fetched
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