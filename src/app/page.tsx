"use client"
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import { Toaster } from 'react-hot-toast'
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent'
import { Provider } from "react-redux";
import store from './redux/store'
import { AdvanceSearchProvider } from './context/AdvanceSearchContext'
const page = () => {
  return (
    <Provider store={store}>
      <UserDetailsContextComponent>
          <DisplayComponents>
            <ClientPage />
          </DisplayComponents>
          <Toaster />
      </UserDetailsContextComponent>
      </Provider>
  )
}
export default page