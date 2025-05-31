import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "./AdminSideBar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider open={true}>
        <AdminSideBar/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}