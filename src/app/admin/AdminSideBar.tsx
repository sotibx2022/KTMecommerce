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
  Mail, Briefcase, LayoutDashboard,
  ShoppingCart,
  Heart,
  Settings,
  ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { generateClassName } from "../services/helperFunctions/generateClassNames"
import { ThemeProviderContext } from "../context/ThemeProvider"
const sideBarItems = [
  { href: '/admin', icon: Home, text: 'Dashboard' },
  { href: '/admin/products', icon: Package, text: 'Products' },
  { href: '/admin/orders', icon: ClipboardList, text: 'Orders' },
  { href: '/admin/users', icon: Users, text: 'Users' },
  { href: '/admin/categories', icon: Layers, text: 'Categories' },
  { href: '/admin/remarks', icon: MessageSquare, text: 'Remarks' },
  { href: '/admin/carts', icon: ShoppingCart, text: 'Carts' },
  { href: '/admin/wishlists', icon: Heart, text: 'Wishlists' },
  { href: '/admin/sliders', icon: ImageIcon, text: 'Sliders' },
  { href: '/admin/settings', icon: Settings, text: 'Settings' }
];
const AdminSideBar = () => {
  const context = useContext(ThemeProviderContext);
  if(!context){
    throw new Error("Theme is not defined")
  }
  const {theme} = context;
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
    <div className={generateClassName(theme) }>
      <Sidebar 
        collapsible="icon" 
        className={`shadow-helper ${generateClassName(theme)}`}
        style={{ width: state === 'expanded' ? "16rem" : "4rem" }}
      >
        <SidebarHeader className={generateClassName(theme)}>
          <div className={`flex items-center justify-between ${generateClassName(theme)}`}>
            <div className={`flex items-center gap-2 ${generateClassName(theme)}`}>
              <LayoutDashboard className={`h-6 w-6 ${generateClassName(theme)}`} />
              {state === 'expanded' && (
                <span className={`text-lg font-semibold ${generateClassName(theme)}`}>
                  Admin
                </span>
              )}
            </div>
            <div><SidebarTrigger className={generateClassName(theme)} /></div>
          </div>
        </SidebarHeader>
        <SidebarContent className={`p-2 ${generateClassName(theme)}`}>
          <nav className={`space-y-1 ${generateClassName(theme)}`}>
            {sideBarItems.map(({ href, icon: Icon, text }) => {
              const isActive = pathName === href || 
                            (href !== '/admin' && pathName.startsWith(href))
              return (
                <Button
                  key={href}
                  variant="nothing"
                  className={`w-full justify-start ${
                    isActive 
                      ? `bg-primaryLight text-background` 
                      : `text-primaryDark hover:bg-primaryLight hover:text-background`
                  }`}
                  onClick={() => {
                    router.push(href)
                    if (isMobile && state === 'expanded') {
                      toggleSidebar()
                    }
                  }}
                >
                  <Icon className={`h-4 w-4 ${theme==='dark'&& "text-background"}`} />
                  {state === 'expanded' && (
                    <span className={`ml-2 ${theme==='dark'&& "text-background"}`}>
                      {text}
                    </span>
                  )}
                </Button>
              )
            })}
          </nav>
        </SidebarContent>
        <SidebarFooter className={`p-4 ${generateClassName(theme)}`}>
          <div className={`flex items-center gap-3 ${generateClassName(theme)}`}>
            <img
              src="../../../assets/adminProfile.jpg"
              alt="Admin"
              width={40}
              height={40}
              className={`rounded-full ${generateClassName(theme)}`}
            />
            {state === 'expanded' && (
              <div className={`flex-1 min-w-0 ${generateClassName(theme)}`}>
                <p className={`truncate font-medium ${generateClassName(theme)}`}>
                  BinayaRaj Soti
                </p>
                <p className={`truncate text-sm text-muted-foreground ${generateClassName(theme)}`}>
                  <Mail className={`inline mr-1 h-3 w-3 ${generateClassName(theme)}`} />
                  sbinayaraj@gmail.com
                </p>
                <p className={`truncate text-xs text-muted-foreground ${generateClassName(theme)}`}>
                  <Briefcase className={`inline mr-1 h-3 w-3 ${generateClassName(theme)}`} />
                  Super Admin
                </p>
              </div>
            )}
          </div>  
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
export default AdminSideBar