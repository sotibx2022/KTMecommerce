"use client"
import AdvanceSearchProvider from '@/app/_components/advaceSearch/AdvanceSearchProvider'
import LoginComponent from '@/app/_components/authComponent/LoginComponent'
import RegisterComponent from '@/app/_components/authComponent/RegisterComponent'
import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import ResponsiveHeader from '@/app/_components/navbar/responsiveHeader/ResponsiveHeader'
import PureSearch from '@/app/_components/pureSearch/PureSearch'
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents'
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent'
import QueryProvider from '@/app/provider/queryProvider'
import store from '@/app/redux/store'
import React, { ReactNode, useContext } from 'react'
import { Provider } from 'react-redux'
interface CatalogPageLayout{
    children:ReactNode
}
const CatalogPageLayout:React.FC<CatalogPageLayout> = ({children}) => {
    const { visibleComponent } = useContext(DisplayContext) || {};
    console.log(visibleComponent)
  return (
    <div>
        <Provider store={store}>
        <QueryProvider>
         <AdvanceSearchProvider>
            <UserDetailsContextComponent>
            <DisplayComponents>
         <NavBar/>
         {children}
         <Footer/>
    </DisplayComponents>
         </UserDetailsContextComponent>
         </AdvanceSearchProvider>
         </QueryProvider>
         </Provider> 
         {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
      {visibleComponent === 'login' && <LoginComponent/>}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch/>}
    </div>
  )
}
export default CatalogPageLayout