"use client"
import React, { useContext } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { faKey, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
const NonRegisteredUsersOption = () => {
    const {setVisibleComponent} = useContext(DisplayContext)
  return (
    <div className='flex gap-2'>
        <SecondaryButton
  text="Login"
  icon={faKey}
  backgroundColor="bg-background"
  textColor="text-primaryDark"
  hoverColor="helper"
  onClick={() => setVisibleComponent('login')}
/>
<SecondaryButton
  text="Register"
  icon={faUserPlus}
  backgroundColor="bg-primaryLight"
  textColor="text-background"
  hoverColor="helper"
  onClick={() => setVisibleComponent('register')}
/>
    </div>
  )
}
export default NonRegisteredUsersOption