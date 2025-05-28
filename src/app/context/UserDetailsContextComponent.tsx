"use client";
import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { IUser } from "../types/user";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
import { useQuery } from "@tanstack/react-query";
interface UserDetailsContextProps {
  userDetails: IUser | null;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser | null>>;
  userDetailsLoading:boolean;
}
const UserDetailsContext = createContext<UserDetailsContextProps | undefined>(undefined);
interface UserDetailsProviderProps {
  children: ReactNode;
}
const UserDetailsContextComponent: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const[userDetailsLoading,setUserDetailsLoading] = useState<boolean>(true);
const query = useQuery({ 
  queryKey: ['user'], 
  queryFn: getUserDetails
})
useEffect(() => {
  if (query.data) {
    setUserDetails(query.data);
    setUserDetailsLoading(false);
  }
}, [query.data])
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails,userDetailsLoading }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
export {UserDetailsContextComponent, UserDetailsContext}