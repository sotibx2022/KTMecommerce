import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import LinkComponent from '../_components/linkComponent/LinkComponent';
import { useLogout } from '../hooks/queryHooks/useLogout';
interface MobileSideBarProps {
  isActive: boolean;
  option: {
    icon: any;
    href: string;
    title: string;
  };
}
const MobileSideBar: React.FC<MobileSideBarProps> = ({ isActive, option }) => {
  const [showHoveredText, setShowHoveredText] = useState(true);
  const logout = useLogout();
  function logoutHandler(): void {
    setShowHoveredText(false);
    logout.mutate()
  }
  function hideHoveredTextHandler(): void {
    setShowHoveredText(false);
  }
  return (
    <div
      className={`flex items-center p-2 gap-2 rounded-lg transition-colors relative max-w-[50px] ${isActive ? 'text-helper shadow-primaryDark' : ''
        }`}
    >
      <div className="iconArea relative group">
        <FontAwesomeIcon
          icon={option.icon}
          className={`w-4 h-4 group-hover:shadow-helper group-hover:rounded-lg`}
        />
        {showHoveredText && <div className="dashboardSideBarLinks absolute z-50 top-0 left-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[100px] h-[30px] flex items-center bg-white shadow-helper pl-2">
          <LinkComponent href={option.href} text={option.title} onClick={option.title === 'Logout' ? logoutHandler : hideHoveredTextHandler} />
        </div>}
      </div>
    </div>
  );
};
export default MobileSideBar;