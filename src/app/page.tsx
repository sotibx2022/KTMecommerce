"use client"
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import AdvanceSearchProvider from './_components/advaceSearch/AdvanceSearchProvider'
import { Toaster } from 'react-hot-toast'
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent'
import store from './redux/store'
import { Provider } from "react-redux";
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