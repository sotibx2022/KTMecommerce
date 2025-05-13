"use client";
import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { IUser } from "../types/user";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
import { useQuery } from "@tanstack/react-query";
interface UserDetailsContextProps {
  userDetails: IUser | null;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser | null>>;
}
const UserDetailsContext = createContext<UserDetailsContextProps | undefined>(undefined);
interface UserDetailsProviderProps {
  children: ReactNode;
}
const UserDetailsContextComponent: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
const query = useQuery({ 
  queryKey: ['user'], 
  queryFn: getUserDetails
})
useEffect(() => {
  if (query.data) {
    setUserDetails(query.data)
  }
}, [query.data])
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
export {UserDetailsContextComponent, UserDetailsContext}