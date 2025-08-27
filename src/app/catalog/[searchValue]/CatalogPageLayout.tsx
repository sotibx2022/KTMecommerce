"use client"
import ConditionalComponents from '@/app/_components/conditionalVisibleComponents/ConditionalComponents'
import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents'
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent'
import QueryProvider from '@/app/provider/queryProvider'
import { persistor, store } from '@/app/redux/store'
import React, { ReactNode, useContext } from 'react'
import { Provider } from 'react-redux'
import { AdvanceSearchProvider } from '@/app/context/AdvanceSearchContext'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
interface CatalogPageLayout {
  children: ReactNode
}
const CatalogPageLayout: React.FC<CatalogPageLayout> = ({ children }) => {
  const { visibleComponent } = useContext(DisplayContext);
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          <DisplayComponents>
            <QueryProvider>
              <UserDetailsContextComponent>
                <NavBar />
                {children}
                <Footer />
                <ConditionalComponents />
              </UserDetailsContextComponent>
            </QueryProvider>
          </DisplayComponents>
        </PersistGate>
      </Provider>
    </div>
  )
}
export default CatalogPageLayout