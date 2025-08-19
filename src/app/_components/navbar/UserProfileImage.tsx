"use context"
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import React from 'react'
const UserProfileImage = () => {
    const context = useUserDetails()
    const { userDetails } = context;
    return (
        <div> {userDetails?.profileImage ? (
            <img
                src={userDetails.profileImage}
                alt="User Profile"
                className="w-[30px] h-[30px] rounded-full object-cover"
            />
        ) : (
            <h1 className="text-primaryDark text-upperCase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full">
                {userDetails && (userDetails.fullName[0] || userDetails.email[0]).toUpperCase()}
            </h1>
        )}</div>
    )
}
export default UserProfileImage