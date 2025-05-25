import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import LinkComponent from '../_components/linkComponent/LinkComponent';
interface MobileSideBarProps {
  isActive: boolean;
  option: {
    icon: any;
    href: string;
    title: string;
  };
}
const MobileSideBar: React.FC<MobileSideBarProps> = ({ isActive, option }) => {
  const [showLink, setShowLink] = useState(false);
  return (
    <div 
      className={`flex items-center p-2 gap-2 rounded-lg transition-colors relative max-w-[50px] ${
        isActive ? 'text-helper shadow-primaryDark' : ''
      }`}
    >
      <div className="iconArea relative">
        <FontAwesomeIcon 
          icon={option.icon} 
          className={`w-4 h-4 ${showLink && "shadow-helper rounded-lg"}`}
          onMouseEnter={() => setShowLink(true)}
          onMouseLeave={() => setShowLink(false)}
        />
        {showLink && (
          <div className="dashboardSideBarLinks absolute top-0 left-0 w-[100px] h-[30px] flex items-center bg-white shadow-helper pl-2">
            <LinkComponent href={option.href} text={option.title} />
          </div>
        )}
      </div>
    </div>
  );
};
export default MobileSideBar;