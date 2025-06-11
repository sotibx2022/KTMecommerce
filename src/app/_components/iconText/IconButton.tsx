import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
interface IconButtonProps {
  icon: IconDefinition;
  name: string;
  number?: number;
  onClick?: () => void;
  className?: string; // Properly included in interface
  disabled?: boolean; // Added disabled prop for better accessibility
}
const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  name, 
  number, 
  onClick, 
  className = '', // Default empty string if not provided
  disabled = false 
}) => {
  const isZeroOrUndefined = number === 0 || number === undefined;
  return (
    <div 
      className={`group relative text-primaryDark cursor-pointer rounded-full p-2 box-border grid place-items-center border-2 border-primaryDark w-[100px] h-[60px] overflow-hidden ${className}`}
      onClick={!disabled ? onClick : undefined}
      aria-disabled={disabled}
      style={disabled ? { 
        background: "var(--gradientwithOpacity)",
        cursor: 'not-allowed',
        opacity: 0.7
      } : {}}
    >
      <div className="iconSize max-w-[60px] max-h-[40px] z-[19]">
<FontAwesomeIcon icon={icon} size='xl'/>
      </div>
      {!isZeroOrUndefined && (
        <span className="absolute top-0 left-0 bg-helper w-8 h-8 text-sm rounded-full grid place-items-center text-primaryDark p-[0.1rem] z-10">
          {number}
        </span>
      )}
      <h2 className="text-primaryDark z-10">{name}</h2>
      {/* Hover effect background (disabled when button is disabled) */}
      {!disabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-helper transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-0"></div>
      )}
    </div>
  );
};
export default IconButton;