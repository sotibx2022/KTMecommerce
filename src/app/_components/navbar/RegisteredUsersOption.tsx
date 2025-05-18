"use client"
import { UserDetailsContext, UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent';
import React, { useContext, useEffect, useState } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setCart } from '@/app/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { fetchCartFromDatabase } from '@/app/services/apiFunctions/cartItems';
import { useCartItems } from '@/app/hooks/queryHooks/useCartItems';
import toast from 'react-hot-toast';
import { truncateCharacters, truncateText } from '@/app/services/helperFunctions/functions';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
const RegisteredUsersOption = () => {
  const queryClient = useQueryClient();
    const[showUserOptions, setShowUserOptions] = useState(false);
   const context = useContext(UserDetailsContext);
   if (!context) {
     throw new Error("The User Details context is not working.");
   }
   const { userDetails,setUserDetails } = context;
    const logout = useLogout()
    const dispatch = useDispatch();
    const {data:cartItems} = useCartItems();
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
          {userDetails!.fullName.split("")[0].toUpperCase()}
        </h1>
      )}
      <p className="text-white capitalize"><span className='text-helper'>Welcome</span> {userDetails?.fullName.split(" ")[0]}</p>
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