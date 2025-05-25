import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LinkComponent from '../_components/linkComponent/LinkComponent';
interface LargeSideBarProps {
  isActive: boolean;
  option: {
    icon: any;
    href: string;
    title: string;
  };
}
const LargeSideBar: React.FC<LargeSideBarProps> = ({ isActive, option }) => {
  return (
    <div 
      className={`flex gap-3 p-3 rounded-lg transition-colors max-w-[200px] ${
        isActive ? 'shadow-primaryLight' : ''
      }`}
    >
      <FontAwesomeIcon 
        icon={option.icon} 
        className="w-5 h-5"
      />
      <div className="dashboardSideBarLinks ml-2">
        <LinkComponent href={option.href} text={option.title} />
      </div>
    </div>
  );
};
export default LargeSideBar;