"use client"
import { ThemeProviderContext } from '@/app/context/ThemeProvider'
import React, { useContext } from 'react'
interface TextToRender {
    text: string,
}
const DynamicOrderData: React.FC<TextToRender> = ({ text }) => {
    const themeContext = useContext(ThemeProviderContext);
    if (!themeContext) {
        throw new Error("Theme Context is not defined here")
    }
    const { theme } = themeContext
    return (
        <span className={theme === "dark" ? "text-[var(--background)]" : "text-[var(--primaryDark)]"}>{text}</span>
    )
}
export default DynamicOrderData