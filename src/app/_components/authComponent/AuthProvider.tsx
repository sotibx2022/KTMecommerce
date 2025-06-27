import { SessionProvider } from 'next-auth/react'
import React from 'react'
interface IAuthProvider{
    children:React.ReactNode
}
const AuthProvider:React.FC<IAuthProvider> = ({children}) => {
  return (
    <SessionProvider>
          {children}
        </SessionProvider>
  )
}
export default AuthProvider