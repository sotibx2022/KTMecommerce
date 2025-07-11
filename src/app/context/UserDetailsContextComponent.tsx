export interface IUserSafeData {
  fullName: string;
  profileImage?: string;
  _id:string;
  accountStatus?:string,
  passwordHistory:boolean,
}
"use client";
import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { getUserDetails } from "../services/helperFunctions/getUserDetails";
import { useQuery } from "@tanstack/react-query";
interface UserDetailsContextProps {
  userDetails: IUserSafeData | null;
  setUserDetails: React.Dispatch<React.SetStateAction<IUserSafeData | null>>;
  userDetailsLoading:boolean;
}
const UserDetailsContext = createContext<UserDetailsContextProps | undefined>(undefined);
interface UserDetailsProviderProps {
  children: ReactNode;
}
const UserDetailsContextComponent: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<IUserSafeData | null>(null);
  const[userDetailsLoading,setUserDetailsLoading] = useState<boolean>(true);
const query = useQuery({ 
  queryKey: ['user'], 
  queryFn: getUserDetails,
  staleTime: 30 * 60 * 1000,
  enabled:!localStorage.getItem('userSafeData')
})
useEffect(()=>{
 const userSafeData: IUserSafeData | null = JSON.parse(localStorage.getItem('userSafeData') || 'null');
  if(userSafeData){
    setUserDetails(userSafeData)
  }
},[])
useEffect(() => {
  if (query.data) {
    const safeUserData:IUserSafeData={
      fullName:query.data.fullName,
      profileImage:query.data.profileImage,
    _id:query.data._id.toString(),
    accountStatus:query.data.accountStatus,
    passwordHistory:query.data.passwordHistory ? true :false
    }
    localStorage.setItem('userSafeData',JSON.stringify(safeUserData))
    setUserDetails(safeUserData);
    setUserDetailsLoading(false);
  }else{
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