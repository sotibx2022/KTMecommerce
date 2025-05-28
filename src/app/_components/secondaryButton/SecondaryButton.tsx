"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from "motion/react"
interface SecondaryButtonProps {
  text: string;
  icon?: IconDefinition;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?:string;
}
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ 
  text, 
  icon, 
  onClick, 
  backgroundColor = 'bg-background',
  textColor = 'text-primaryDark',
  hoverColor='text-helper'
}) => {
  return (
    <motion.div
      className={`
        ${backgroundColor} ${textColor} w-[6rem] h-full flex justify-center items-center 
        relative rounded-sm border-[1px] border-primaryDark 
        cursor-pointer overflow-hidden
      `}
      whileHover={backgroundColor=hoverColor}
      onClick={onClick}
    >
      <button className="relative z-20 w-full h-full flex items-center justify-center gap-2">
        {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
        {text}
      </button>
      <div className="absolute top-0 left-0 w-0 h-full z-10"></div>
    </motion.div>
  );
};
export default SecondaryButton;