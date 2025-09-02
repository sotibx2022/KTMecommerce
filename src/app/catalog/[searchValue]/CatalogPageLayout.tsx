"use client"
import ConditionalComponents from '@/app/_components/conditionalVisibleComponents/ConditionalComponents'
import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents'
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent'
import QueryProvider from '@/app/provider/queryProvider'
import React, { ReactNode, useContext } from 'react'
import { Provider } from 'react-redux'
import { AdvanceSearchProvider } from '@/app/context/AdvanceSearchContext'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { store } from '@/app/redux/store'
import RootClientProviders from '@/app/RootClientProviders'
interface CatalogPageLayout {
  children: ReactNode
}
const CatalogPageLayout: React.FC<CatalogPageLayout> = ({ children }) => {
  const { visibleComponent } = useContext(DisplayContext);
  return (
    <div>
        <NavBar />
        {children}
        <Footer />
        <ConditionalComponents />
    </div>
  )
}
export default CatalogPageLayout