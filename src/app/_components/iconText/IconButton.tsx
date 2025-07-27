"use client"
import React from 'react';
import IconLoadingSkleton from './IconLoadingSkleton';
interface IconButtonProps {
  icon: React.ReactNode;
  name: string;
  number?: number;
  onClick?: () => void;
  loading?: boolean;
}
const IconButton: React.FC<IconButtonProps> = ({ icon, name, number, onClick, loading = false }) => {
  return (
    <>{loading ? <IconLoadingSkleton /> : <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center cursor-pointer p-1 rounded-lg transition-all border border-primaryLight
      group w-[60px]"
    >
      {/* Hover effect layer */}
      <div className="absolute top-0 left-0 bg-helper w-full h-0 rounded-lg transition-all duration-300 group-hover:h-full z-0 " />
      {/* Number badge */}
      {number !== undefined && (
        <span className="absolute -top-2 -right-2 bg-[var(--helper)] text-[var(--primaryDark)] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm">
          {number}
        </span>
      )}
      {/* Icon */}
      <div className="text-[var(--primaryDark)] text-2xl rounded-full z-10">
        {icon}
      </div>
      {/* Name */}
      <h2 className="m-0 text-sm font-medium text-[var(--primaryDark)] z-10">
        {name}
      </h2>
    </div>}</>
  );
};
export default IconButton;