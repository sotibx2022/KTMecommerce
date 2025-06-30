import { SidebarProvider } from "@/components/ui/sidebar"
import { DisplayComponents } from "../context/DisplayComponents"
import { ProductDeleteProvider } from "../context/ProductDeleteContext"
import AdminSideBar from "./AdminSideBar"
import ProductFilterProvider from "../context/ProductFilterContext"
import ConditionalComponents from "../_components/conditionalVisibleComponents/ConditionalComponents"
import { cookies } from "next/headers"
import { Toaster } from "react-hot-toast"
import AdminDashboardHeader from "./AdminDashboardHeader"
import { ThemeProvider } from "../context/ThemeProvider"
import AdminChildrenWrapper from "./AdminChildrenWrapper"
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DisplayComponents>
      <ProductDeleteProvider>
      <ThemeProvider>
        <SidebarProvider>
          <AdminSideBar />
          <ProductFilterProvider>
              <div className="adminChild mx-4">
                <AdminDashboardHeader/>
                <AdminChildrenWrapper>
                  {children}
                  </AdminChildrenWrapper>
              </div>
          </ProductFilterProvider>
        </SidebarProvider>
      </ThemeProvider>
      </ProductDeleteProvider>
      <ConditionalComponents />
      <Toaster/>
    </DisplayComponents>
  )
}
