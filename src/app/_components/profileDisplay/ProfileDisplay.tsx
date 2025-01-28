"use client"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import React, { useContext } from 'react'
const ProfileDisplay = () => {
    const context = useContext(UserDetailsContext);
    if (!context) {
      throw new Error("The User Details Context is not defined");
    }
    const { userDetails } = context;
  return (
    <div>
    <div className="container my-4">
    <h2 className='subHeading'>Profile Details</h2>
      <div className="flex justify-between mb-4">
        <div className="w-2/5 flex-col gap-4">
          <div>
            <label className="formLabel">Full Name</label>
            <input
              type="text"
              className="formItem"
              value={userDetails?.fullName || ''}
              readOnly
            />
          </div>
          <div>
            <label className="formLabel">Email</label>
            <input
              type="text"
              className="formItem"
              value={userDetails?.email || ''}
              readOnly
            />
          </div>
          <div>
            <label className="formLabel">Phone Number</label>
            <input
              type="text"
              className="formItem"
              value={userDetails?.phoneNumber || ''}
              readOnly
            />
          </div>
          <div>
            <label className="formLabel">Full Address</label>
            <input
              type="text"
              className="formItem"
              placeholder="123 Main St, City, Country"
              id="fullAddress"
              value={userDetails?.address || ''}
              readOnly
            />
          </div>
        </div>
        <div className="w-2/5">
          <div className="flex flex-col w-full h-full">
          <img src={userDetails?.profileImage} className='w-[250px]'></img>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default ProfileDisplay