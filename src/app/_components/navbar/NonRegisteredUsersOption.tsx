"use client"
import React, { useContext } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton'
import { DisplayContext } from '@/app/context/DisplayComponents'
const NonRegisteredUsersOption = () => {
    const {setVisibleComponent} = useContext(DisplayContext)
  return (
    <div className='flex gap-2'>
        <SecondaryButton text="Login" onClick={()=>setVisibleComponent('login')}/>
        <SecondaryButton text='Register' onClick={()=>setVisibleComponent('register')} />
    </div>
  )
}
export default NonRegisteredUsersOption