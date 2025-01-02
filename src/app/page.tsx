"use client"
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import AdvanceSearchProvider from './_components/advaceSearch/AdvanceSearchProvider'
import { Toaster } from 'react-hot-toast'
const page = () => {
  return (
    <AdvanceSearchProvider>
    <DisplayComponents>
<ClientPage/>
    </DisplayComponents>
    <Toaster/>
    </AdvanceSearchProvider>
  )
}
export default page