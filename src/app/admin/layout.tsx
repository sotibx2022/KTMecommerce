import { SidebarProvider } from "@/components/ui/sidebar"
import { DisplayComponents } from "../context/DisplayComponents"
import { ProductDeleteProvider } from "../context/ProductDeleteContext"
import AdminSideBar from "./AdminSideBar"
import ProductFilterProvider from "../context/ProductFilterContext"
import ConditionalComponents from "../_components/conditionalVisibleComponents/ConditionalComponents"
import { cookies } from "next/headers"
import { Toaster } from "react-hot-toast"
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DisplayComponents>
      <ProductDeleteProvider>
        <SidebarProvider>
          <AdminSideBar />
          <ProductFilterProvider>
              {children}
          </ProductFilterProvider>
        </SidebarProvider>
      </ProductDeleteProvider>
      <ConditionalComponents />
      <Toaster/>
    </DisplayComponents>
  )
}
