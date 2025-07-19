import type { Metadata } from "next";
import React from 'react'
interface IRootLayout{
    children:React.ReactNode
}
export const metadata:Metadata={
title:"Help | EcommerceKTM"
}
const RootLayout:React.FC<IRootLayout> = ({children}) => {
  return (
    <div>{children}</div>
  )
}
export default RootLayout