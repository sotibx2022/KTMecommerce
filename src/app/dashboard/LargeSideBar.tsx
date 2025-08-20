import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import LinkComponent from '../_components/linkComponent/LinkComponent';
import { useLogout } from '../hooks/queryHooks/useLogout';
interface LargeSideBarProps {
  isActive: boolean;
  option: {
    icon: any;
    href: string;
    title: string;
  };
}
const LargeSideBar: React.FC<LargeSideBarProps> = ({ isActive, option }) => {
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
      className={`flex gap-3 p-3 rounded-lg transition-colors max-w-[200px] ${isActive ? 'shadow-primaryLight' : ''
        }`}
    >
      <FontAwesomeIcon
        icon={option.icon}
        className="w-5 h-5"
      />
      <div className="dashboardSideBarLinks ml-2">
        <LinkComponent href={option.href} text={option.title} onClick={option.title === 'Logout' ? logoutHandler : hideHoveredTextHandler} />
      </div>
    </div>
  );
};
export default LargeSideBar;