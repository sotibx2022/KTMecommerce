"use client"
import React, { Dispatch, SetStateAction, useState, ReactNode } from 'react'
import { createContext } from 'react'
// Define the type once
type VisibleComponentType = '' | 'login' | 'register' | 'responsiveHeader' | 'pureSearch' |
 'productImage' | 'addReview' |'dilaugeBox' | 'editReview' | 'resetPassword' | 'loadingComponent'
interface DisplayContextProps {
    visibleComponent: VisibleComponentType
    setVisibleComponent: Dispatch<SetStateAction<VisibleComponentType>>
}
const DisplayContext = createContext<DisplayContextProps>({
    visibleComponent: '',
    setVisibleComponent: () => {}
})
const DisplayComponents: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [visibleComponent, setVisibleComponent] = useState<VisibleComponentType>('')
    return (
        <DisplayContext.Provider value={{ visibleComponent, setVisibleComponent }}>
            {children}
        </DisplayContext.Provider>
    )
}
export { DisplayComponents, DisplayContext }