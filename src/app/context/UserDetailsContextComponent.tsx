"use client";
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect
} from "react";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
import { useQuery } from "@tanstack/react-query";
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
// Context provider component
const UserDetailsContextComponent: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUserSafeData | null>(null);
  const [userDetailsLoading, setUserDetailsLoading] = useState<boolean>(true);
  // Only enable the query on client-side
  const isClient = typeof window !== "undefined";
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    staleTime: 30 * 60 * 1000,
    enabled: isClient && !localStorage.getItem('userSafeData')
  });
  // Load from localStorage if available
  useEffect(() => {
    if (!isClient) return;
    const userSafeData: IUserSafeData | null = JSON.parse(localStorage.getItem('userSafeData') || 'null');
    if (userSafeData) {
      setUserDetails(userSafeData);
      setUserDetailsLoading(false);
    }
  }, [isClient]);
  // Update localStorage when data is fetched
  useEffect(() => {
    if (!isClient || !query.data) return;
    const safeUserData: IUserSafeData = {
      fullName: query.data.fullName,
      profileImage: query.data.profileImage,
      _id: query.data._id.toString(),
      accountStatus: query.data.accountStatus,
      passwordHistory: query.data.passwordHistory ? true : false
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
