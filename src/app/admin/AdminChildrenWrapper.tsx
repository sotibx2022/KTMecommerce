"use client"
import React, { useContext } from 'react';
import { generateClassName } from '../services/helperFunctions/generateClassNames';
import { ThemeProviderContext } from '../context/ThemeProvider';
interface IAdminChildrenWrapperProps {
  children: React.ReactNode;
}
const AdminChildrenWrapper: React.FC<IAdminChildrenWrapperProps> = ({ children }) => {
    const context = useContext(ThemeProviderContext);
    if(!context){
        throw new Error("THeme context is not defined here.")
    }
    const {theme} = context
  return (
    <div className={`${generateClassName(theme)}`}>{children}</div> 
  );
};
export default AdminChildrenWrapper;