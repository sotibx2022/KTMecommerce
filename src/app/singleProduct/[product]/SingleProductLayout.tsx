"use client"
import ConditionalComponents from '@/app/_components/conditionalVisibleComponents/ConditionalComponents'
import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents'
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent'
import QueryProvider from '@/app/provider/queryProvider'
import store from '@/app/redux/store'
import React, { ReactNode, useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
interface SingleProductLayoutProps {
  children: ReactNode
}
const SingleProductLayout: React.FC<SingleProductLayoutProps> = ({
  children
}) => {
  return (
    <div>
      <Provider store={store}>
        <DisplayComponents>
          <QueryProvider>
            <UserDetailsContextComponent>
              <NavBar />
              {children}
              <Footer />
              <ConditionalComponents />
              <Toaster position="bottom-right" />
            </UserDetailsContextComponent>
          </QueryProvider>
        </DisplayComponents>
      </Provider>
    </div>
  )
}
export default SingleProductLayout