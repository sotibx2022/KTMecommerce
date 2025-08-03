"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
interface IAdminDetailsProps {
    children: React.ReactNode
}
interface IAdminDetails {
    adminUserName: string,
    adminUserEmail: string,
    adminRole: string,
    adminFullName: string,
}
interface IAdminContextProps {
    adminDetails: IAdminDetails,
    setAdminDetails: React.Dispatch<React.SetStateAction<IAdminDetails>>,
    adminDetailsLoading: boolean,
    setAdminDetailsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const AdminContext = createContext<IAdminContextProps | undefined>(undefined)
const AdminDetailsContext: React.FC<IAdminDetailsProps> = ({ children }) => {
    const [adminDetails, setAdminDetails] = useState<IAdminDetails>({
        adminUserName: "",
        adminUserEmail: "",
        adminRole: "",
        adminFullName: "",
    })
    const [adminDetailsLoading, setAdminDetailsLoading] = useState<boolean>(true)
    return (
        <AdminContext.Provider value={{ adminDetails, setAdminDetails, adminDetailsLoading, setAdminDetailsLoading }}>{children}</AdminContext.Provider>
    )
}
const useAdminDetails = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("Admin User Context is not accessible at this label.")
    }
    return context
}
export { AdminDetailsContext, useAdminDetails }