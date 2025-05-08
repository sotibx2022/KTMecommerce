"use client";
import React, { createContext, ReactNode, useState } from "react";
import { IUser } from "../types/user";
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
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
export {UserDetailsContextComponent, UserDetailsContext}