"use client"
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents'
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent'
import store from '@/app/redux/store'
import React, { ReactNode, useContext } from 'react'
import { Provider } from 'react-redux'
import NavBar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Toaster } from 'react-hot-toast'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import LoginComponent from '../authComponent/LoginComponent'
import RegisterComponent from '../authComponent/RegisterComponent'
interface SingleProductProps{
    children:ReactNode
}
const SingleProductLayout:React.FC<SingleProductProps> = ({children}) => {
    const { visibleComponent } = useContext(DisplayContext) || {};
  return (
    <DisplayComponents>
    <Provider store={store}>
    <UserDetailsContextComponent>
      <NavBar />
      {children}
      <Footer />
      </UserDetailsContextComponent>
      <Toaster/>
      </Provider>
      {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
    {visibleComponent === 'login' && <LoginComponent/>}
    {visibleComponent === 'register' && <RegisterComponent />}
      </DisplayComponents>
  )
}
export default SingleProductLayout