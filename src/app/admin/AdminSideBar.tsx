"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  Package, ClipboardList, Users, Layers, Tags,
  MessageSquare, Home, ChevronLeft, ChevronRight,
  Mail, Briefcase, LayoutDashboard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
const sideBarItems = [
  { href: '/admin', icon: Home, text: 'Dashboard' },
  { href: '/admin/products', icon: Package, text: 'Products' },
  { href: '/admin/orders', icon: ClipboardList, text: 'Orders' },
  { href: '/admin/users', icon: Users, text: 'Users' },
  { href: '/admin/categories', icon: Layers, text: 'Categories' },
  { href: '/admin/subcategories', icon: Tags, text: 'Subcategories' },
  { href: '/admin/remarks', icon: MessageSquare, text: 'Remarks' }
]
const AdminSideBar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const {
    state,
    setOpen,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
  return (
    <div >
 <Sidebar 
  collapsible="icon" 
  className="shadow-helper"
  style={{ width: state === 'expanded' ? "16rem" : "4rem" }}
>
        <SidebarHeader className=" bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primaryDark" />
              {state === 'expanded' &&  (
                <span className="text-lg font-semibold text-primaryDark">Admin</span>
              )}
            </div>
            <div><SidebarTrigger /></div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2 bg-background">
          <nav className="space-y-1">
            {sideBarItems.map(({ href, icon: Icon, text }) => {
              const isActive = pathName === href || 
                              (href !== '/admin' && pathName.startsWith(href))
              return (
                <Button
                  key={href}
                  variant="nothing"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-primaryDark text-background' 
                      : 'text-primaryDark hover:bg-primaryDark hover:text-background'
                  }`}
                  onClick={() => {
                    router.push(href)
                    if (isMobile && state === 'expanded') {
                      toggleSidebar() // Auto-collapse after navigation on mobile
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                    {state==='expanded' && <span className="ml-2">{text}</span>}
                </Button>
              )
            })}
          </nav>
        </SidebarContent>
          <SidebarFooter className="  p-4 bg-background">
            <div className="flex items-center gap-3">
              <img
                src="../assets/adminProfile.jpg"
                alt="Admin"
                width={40}
                height={40}
                className="rounded-full"
              />
              {state === 'expanded' && (
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">BinayaRaj Soti</p>
                <p className="truncate text-sm text-muted-foreground">
                  <Mail className="inline mr-1 h-3 w-3" />
                  sbinayaraj@gmail.com
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  <Briefcase className="inline mr-1 h-3 w-3" />
                  Super Admin
                </p>
              </div>)}
            </div>  
          </SidebarFooter>
      </Sidebar>
    </div>
  )
}
export default AdminSideBar