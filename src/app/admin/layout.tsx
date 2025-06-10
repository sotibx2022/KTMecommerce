import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "./AdminSideBar"
import { cookies } from "next/headers"
import ProductFilterProvider from "../context/ProductFilterContext"
import { ProductDeleteProvider } from "../context/ProductDeleteContext"
import { Toaster } from "react-hot-toast"
export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
      <div className="flex container">
        <ProductDeleteProvider>
        <SidebarProvider>
        <AdminSideBar/>
        <ProductFilterProvider>
          {children}
          </ProductFilterProvider>
          </SidebarProvider>
          </ProductDeleteProvider>
          <Toaster/>
      </div>
  )
}