import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "./AdminSideBar"
import { cookies } from "next/headers"
import ProductFilterProvider from "../context/ProductFilterContext"
export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
      <div className="flex container">
        <SidebarProvider>
        <AdminSideBar/>
        <ProductFilterProvider>
          {children}
          </ProductFilterProvider>
          </SidebarProvider>
      </div>
  )
}