"use client"
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import AdvanceSearchProvider from './_components/advaceSearch/AdvanceSearchProvider'
import { Toaster } from 'react-hot-toast'
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent'
import { Provider } from "react-redux";
import store from './redux/store'
const page = () => {
  return (
    <Provider store={store}>
      <UserDetailsContextComponent>
        <AdvanceSearchProvider>
          <DisplayComponents>
            <ClientPage />
          </DisplayComponents>
          <Toaster />
        </AdvanceSearchProvider>
      </UserDetailsContextComponent>
      </Provider>
  )
}
export default page