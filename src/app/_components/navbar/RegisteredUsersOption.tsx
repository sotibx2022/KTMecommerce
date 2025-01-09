"use client"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import React, { useContext, useState } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
const RegisteredUsersOption = () => {
    const[showUserOptions, setShowUserOptions] = useState(false);
    const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error("The User Details context is not working.")
    }
    const {userDetails} = context;
    function logoutHandler(): void {
        throw new Error('Function not implemented.');
    }
  return (
    <div className='flex-center gap-4 '>
        <div className="userDetails flex-center gap-2 relative cursor-pointer"  
        onMouseEnter={()=>setShowUserOptions(true)} onMouseLeave={()=>setShowUserOptions(false)}>
        <h1 className='text-primaryDark text-upperCase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full'>
  {userDetails?.fullName?.[0]?.toUpperCase()}
</h1>
<p className='text-white capitalize'>{userDetails?.fullName}</p>
            <FontAwesomeIcon icon={showUserOptions ? faCaretUp : faCaretDown} className='text-background' />
            {showUserOptions && <UserOptions/>}
        </div>
        <SecondaryButton text='Log Out' onClick={logoutHandler}/>
    </div>
  )
}
export default RegisteredUsersOption