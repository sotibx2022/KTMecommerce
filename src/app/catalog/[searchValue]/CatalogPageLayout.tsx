"use client"
import ConditionalComponents from '@/app/_components/conditionalVisibleComponents/ConditionalComponents'
import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
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
    const { visibleComponent } = useContext(DisplayContext);
  return (
    <div>
        <Provider store={store}>
        <DisplayComponents>
        <QueryProvider>
            <UserDetailsContextComponent>
         <NavBar/>
                  {children}
         <Footer/>
       <ConditionalComponents/>
         </UserDetailsContextComponent>
         </QueryProvider>
         </DisplayComponents>
         </Provider> 
    </div>
  )
}
export default CatalogPageLayout