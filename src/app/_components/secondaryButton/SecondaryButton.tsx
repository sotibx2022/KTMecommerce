"use client"
import React from 'react'
interface SecondaryButtonProps {
  text: string
  icon?: string
  onClick: () => void
}
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, icon, onClick }) => {
  return (
    <div
      className="bg-background w-[5rem] h-full flex justify-center items-center relative group rounded-sm border-[1px] border-primaryDark cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <button className="relative z-10 w-full h-full" type="button">
        {text}
      </button>
      <div className="overLay absolute top-0 left-0 w-0 h-full bg-helper transition-all duration-500 ease-in-out group-hover:w-full z-10"></div>
    </div>
  )
}
export default SecondaryButton