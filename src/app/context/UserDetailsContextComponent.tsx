"use client";
import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { IUser } from "../types/user";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
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
  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await getUserDetails(); 
      if (user) {
        setUserDetails(user);
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
export {UserDetailsContextComponent, UserDetailsContext}