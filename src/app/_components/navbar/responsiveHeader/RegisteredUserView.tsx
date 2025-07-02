import { IUser } from '@/app/types/user'
import Link from 'next/link'
import React from 'react'
import SecondaryButton from '../../secondaryButton/SecondaryButton'
import { useLogout } from '@/app/hooks/queryHooks/useLogout'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
interface IRegistedUserView{
    userDetails:IUser
}
const RegisteredUserView:React.FC<IRegistedUserView> = ({userDetails}) => {
    const logout = useLogout()
  return (
    <div>
        <div className="registeredUser flex justify-between items-center px-4">
          <Link href="/dashboard/profile">
          <div className="imageArea flex gap-2">
            {userDetails.profileImage ? (
              <img
                src={userDetails.profileImage}
                alt="User Profile"
                className="w-[30px] h-[30px] rounded-full"
              />
            ) : (
              <h1 className="text-primaryDark uppercase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full border-2 border-helper">
                {(userDetails.fullName ?? userDetails.email)?.charAt(0).toUpperCase()}
              </h1>
            )}
            <p className="text-primaryDark capitalize flex gap-2">
              <span className="text-helper">Welcome</span>
              {userDetails.fullName ? userDetails.fullName.split(" ")[0]:userDetails.email.split("@")[0]}
            </p>
          </div>
          </Link>
<SecondaryButton
  text="Log Out"
  icon={faSignOutAlt}
  onClick={logout.mutate}
/>
        </div>
    </div>
  )
}
export default RegisteredUserView