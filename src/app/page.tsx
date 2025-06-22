"use client"
import { Suspense } from 'react';
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import { Toaster } from 'react-hot-toast'
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent'
import { Provider } from "react-redux";
import store from './redux/store'
import LoadingComponent from './_components/loadingComponent/LoadingComponent';
const Page = () => {
  return (
    <Provider store={store}>
      <UserDetailsContextComponent>
        <DisplayComponents>
          <Suspense fallback={<LoadingComponent />}>
            <ClientPage />
          </Suspense>
        </DisplayComponents>
        <Toaster />
      </UserDetailsContextComponent>
    </Provider>
  )
}
export default Page