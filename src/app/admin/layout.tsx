import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "./AdminSideBar"
import { cookies } from "next/headers"
export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
      <div className="flex container">
        <SidebarProvider>
        <AdminSideBar/>
          {children}
          </SidebarProvider>
      </div>
  )
}