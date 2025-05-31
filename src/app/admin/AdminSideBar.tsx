"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  Package, 
  ClipboardList, 
  Users, 
  Layers, 
  Tags,
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
const AdminSideBar = () => {
      const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <Button size="icon" onClick={toggleSidebar}>
                  <ChevronLeft className="h-4 w-4" />
                  <ChevronRight className="hidden h-4 w-4" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <nav className="space-y-1">
          <Button  className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button  className="w-full justify-start">
            <Package className="mr-2 h-4 w-4" />
            Products
          </Button>
          <Button  className="w-full justify-start">
            <ClipboardList className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button  className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button  className="w-full justify-start">
            <Layers className="mr-2 h-4 w-4" />
            Categories
          </Button>
          <Button  className="w-full justify-start">
            <Tags className="mr-2 h-4 w-4" />
            Subcategories
          </Button>
          <Button  className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Remarks
          </Button>
        </nav>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/admin-avatar.jpg"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">John Doe</p>
            <p className="truncate text-sm text-muted-foreground">
              <Mail className="inline mr-1 h-3 w-3" />
              john@example.com
            </p>
            <p className="truncate text-xs text-muted-foreground">
              <Briefcase className="inline mr-1 h-3 w-3" />
              Super Admin
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AdminSideBar