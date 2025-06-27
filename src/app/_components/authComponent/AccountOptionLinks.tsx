import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
interface IAccountOptionLinks{
    visibleItem:"register"| "resetPassword" | "login",
    visibleText:string,
}
const AccountOptionLinks:React.FC<IAccountOptionLinks> = ({visibleItem,visibleText}) => {
    const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
  return (
    <div className="usefulLinks mt-6 space-y-3 border-t border-primaryLight pt-4">
                         <p className='text-sm text-primaryParagraph'>
                           <FontAwesomeIcon icon={faCaretRight} className='mr-2 primaryParagraph' />
                           {visibleText} <span className='link' onClick={() => {
      setVisibleComponent(`${visibleItem}`);
    }} >Register</span>
                         </p>
                         <p className='text-sm text-primaryParagraph'>
                           <FontAwesomeIcon icon={faCaretRight} className='mr-2 primaryParagraph' />
                          {visibleText} <span className='link' onClick={() => {
      setVisibleComponent(`${visibleItem}`);
    }} >Reset</span>
                         </p>
                       </div>
  )
}
export default AccountOptionLinks