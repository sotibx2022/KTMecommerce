"use client"
import React, { ReactNode, useContext } from 'react'
import { UserDetailsContextComponent } from '../context/UserDetailsContextComponent'
import { DisplayComponents, DisplayContext } from '../context/DisplayComponents'
import NavBar from '../_components/navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from '../_components/footer/Footer'
import ResponsiveHeader from '../_components/navbar/responsiveHeader/ResponsiveHeader'
import LoginComponent from '../_components/authComponent/LoginComponent'
import RegisterComponent from '../_components/authComponent/RegisterComponent'
import QueryProvider from '../provider/queryProvider'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import ConditionalComponents from '../_components/conditionalVisibleComponents/ConditionalComponents'
import LoadingComponent from '../_components/loadingComponent/LoadingComponent'
import RootClientProviders from '../RootClientProviders'
interface DashboardLayoutProps {
  children: ReactNode
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { visibleComponent } = useContext(DisplayContext) || {};
  return (
    <>
      <RootClientProviders>
        <NavBar />
        {children}
        <Toaster />
        <Footer />
        <ConditionalComponents />
      </RootClientProviders>
    </>
  )
}
export default DashboardLayout