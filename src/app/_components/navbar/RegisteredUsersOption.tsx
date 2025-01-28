"use client"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import React, { useContext, useEffect, useState } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import useLogout, { logoutUser } from '@/app/services/apiFunctions/logoutUser';
import { useMutation, useQuery } from '@tanstack/react-query';
import { setCart } from '@/app/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { fetchCartFromDatabase } from '@/app/services/apiFunctions/cartItems';
const RegisteredUsersOption = () => {
    const[showUserOptions, setShowUserOptions] = useState(false);
    const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error("The User Details context is not working.")
    }
    const {userDetails} = context;
    const logout = useLogout();
    const dispatch = useDispatch();
    const {data:cartItems} = useQuery({queryKey:['cartItems'],queryFn:fetchCartFromDatabase})
   useEffect(()=>{
    if(cartItems){
      dispatch(setCart(cartItems));
    }
   },[cartItems])
  return (
    <div className="flex-center gap-4">
    <div
      className="userDetails flex-center gap-2 relative cursor-pointer"
      onMouseEnter={() => setShowUserOptions(true)}
      onMouseLeave={() => setShowUserOptions(false)}
    >
      {userDetails?.profileImage ? (
        <img
          src={userDetails.profileImage}
          alt="User Profile"
          className="w-[30px] h-[30px] rounded-full"
        />
      ) : (
        <h1 className="text-primaryDark text-upperCase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full">
          {userDetails?.fullName?.[0]?.toUpperCase()}
        </h1>
      )}
      <p className="text-white capitalize">{userDetails?.fullName}</p>
      <FontAwesomeIcon
        icon={showUserOptions ? faCaretUp : faCaretDown}
        className="text-background"
      />
      {showUserOptions && <UserOptions />}
    </div>
    <SecondaryButton text="Log Out" onClick={logout.mutate} />
  </div>
  )
}
export default RegisteredUsersOption