"use client"
import { DisplayComponents } from './context/DisplayComponents'
import ClientPage from './_components/clientPage/ClientPage'
import AdvanceSearchProvider from './_components/advaceSearch/AdvanceSearchProvider'
const page = () => {
  return (
    <AdvanceSearchProvider>
    <DisplayComponents>
<ClientPage/>
    </DisplayComponents>
    </AdvanceSearchProvider>
  )
}
export default page