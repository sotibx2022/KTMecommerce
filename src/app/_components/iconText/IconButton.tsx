import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
interface IconButtonProps {
  icon: IconDefinition; // Correct type for FontAwesome icons
  name: string;
  number?: number; // Optional
}
const IconButton: React.FC<IconButtonProps> = ({ icon, name, number }) => {
  return (
    <div className="group relative text-primaryDark cursor-pointer rounded-full p-2 box-border grid place-items-center border-2 border-primaryDark w-[100px] overflow-hidden">
      <FontAwesomeIcon icon={icon} className="w-[30px]  z-10" />
      {number && (
        <span className=" absolute top-0 left-0  bg-helper w-8 h-8 text-sm rounded-full grid place-items-center text-primaryDark p-[0.1rem]  z-10">
          {number}
        </span>
      )}
      <h2 className="text-primaryDark z-10">{name}</h2>
      {/* Hover effect background */}
      <div className="absolute top-0 left-0 w-full h-full bg-helper transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-0"></div>
    </div>
  );
};
export default IconButton;
