import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent'
interface IAuthProvider{
    children:React.ReactNode
}
const AuthProvider:React.FC<IAuthProvider> = ({children}) => {
  return (
    <SessionProvider>
      <AbsoluteComponent>
          {children}
          </AbsoluteComponent>
        </SessionProvider>
  )
}
export default AuthProvider