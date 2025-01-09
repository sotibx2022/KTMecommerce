"use client"
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import AdvanceSearchProvider from './_components/advaceSearch/AdvanceSearchProvider'
import { Toaster } from 'react-hot-toast'
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent'
const page = () => {
  return (
    <UserDetailsContextComponent>
    <AdvanceSearchProvider>
    <DisplayComponents>
<ClientPage/>
    </DisplayComponents>
    <Toaster/>
    </AdvanceSearchProvider>
    </UserDetailsContextComponent>
  )
}
export default page