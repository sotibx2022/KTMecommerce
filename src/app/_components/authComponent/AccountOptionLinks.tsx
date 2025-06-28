import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import LinkComponent from '../linkComponent/LinkComponent';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
interface IAccountOptionLinks {
  visibleItem: "register" | "resetPassword" | "login",
  visibleText: string,
}
const AccountOptionLinks: React.FC<IAccountOptionLinks> = ({ visibleItem, visibleText }) => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  return (
    <div className="usefulLinks flex justify-between items-center">
      <p className='text-sm text-primaryParagraph'>
        <FontAwesomeIcon icon={faCaretRight} className='mr-2 primaryParagraph' />
        {visibleText}
      </p>
      <span className='link' onClick={() => {
        setVisibleComponent(`${visibleItem}`);
      }}>{visibleItem.toLocaleUpperCase()}</span>
    </div>
  )
}
export default AccountOptionLinks