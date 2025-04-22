"use client"
import React, { Dispatch, SetStateAction, useState,ReactNode } from 'react'
import { createContext } from 'react'
interface DisplayContextProps{
    visibleComponent:'' | 'login' | 'register' | 'responsiveHeader' | 'pureSearch'|'productImage',
    setVisibleComponent:Dispatch<SetStateAction<'' | 'login' | 'register' | 'responsiveHeader' | 'pureSearch' | 'productImage'>>
}
const DisplayContext = createContext<DisplayContextProps>({
visibleComponent:'',
setVisibleComponent:()=>{}
})
const DisplayComponents:React.FC<{children:ReactNode}> = ({children}) => {
    const[visibleComponent, setVisibleComponent] = useState<'' | 'login' | 'register' | 'responsiveHeader' | 'pureSearch' |'productImage'>('')
  return (
    <DisplayContext.Provider value={{visibleComponent, setVisibleComponent}}>{children}</DisplayContext.Provider>
  )
}
export  {DisplayComponents,DisplayContext}