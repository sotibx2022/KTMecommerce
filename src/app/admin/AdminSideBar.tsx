"use client"
import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react"
import { Menu, Minus, PanelLeftClose, PanelLeftOpen, Plus, LayoutDashboard, User } from "lucide-react"
import { ThemeProviderContext } from "../context/ThemeProvider"
import { sideBarItems } from "./components/sideBarComponents/sidebarItems"
const AdminSideBar = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("Theme Context is not defined at this state.")
  }
  const { theme } = context;
  const { state, setOpen, setOpenMobile, isMobile, openMobile } = useSidebar()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const shouldShowText = state === "expanded" || (isMobile && openMobile)
  const toggleSubmenu = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenMenus((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    )
  }
  const handleMenuItemClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector("[data-sidebar]") as HTMLElement | null
      const path = event.composedPath()
      if (isMobile && openMobile && sidebar && !path.includes(sidebar)) {
        setOpenMobile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, openMobile, setOpenMobile])
  return (
    <>
      {/* Mobile trigger button */}
      {isMobile && !openMobile && (
        <PanelLeftClose
          className={`size-6 md:hidden fixed left-4 z-50 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-lg  transition-all duration-200 hover:scale-105 ${theme === 'dark'
            ? 'text-white bg-primaryLight hover:bg-primaryDark'
            : 'text-primaryDark bg-background hover:bg-primaryLight'
            }`}
          onClick={() => setOpenMobile(true)}
        />
      )}
      <Sidebar
        collapsible="icon"
        className={` transition-all duration-300 border-transparent ${theme === 'dark'
          ? ' bg-primaryDark'
          : ' bg-background'
          }`}
        data-sidebar
        style={{
          width: isMobile ? "280px" : state === "expanded" ? "260px" : "80px",
          position: isMobile ? "fixed" : "relative",
          zIndex: 40,
          transform: isMobile && !openMobile ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
      >
        {isMobile && openMobile && (
          <div
            className="fixed inset-0 bg-primaryDark backdrop-blur-sm md:hidden transition-opacity duration-300"
            onClick={() => setOpenMobile(false)}
          />
        )}
        <SidebarHeader className={` ${theme === 'dark'
          ? ' bg-primaryLight'
          : ' bg-background'
          }`}>
          <div className="flex items-center justify-between px-3 py-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${theme === 'dark'
                ? 'hover:bg-primaryDark text-background'
                : 'hover:bg-primaryLight text-primaryDark'
                }`}>
                {shouldShowText ? (
                  <PanelLeftClose className="w-6 h-6 cursor-pointer" />
                ) : (
                  <PanelLeftOpen className="w-6 h-6 cursor-pointer" />
                )}
              </SidebarTrigger>
              {shouldShowText && (
                <div className="flex flex-col gap-1 leading-none">
                  <span className={`font-bold text-lg ${theme === 'dark' ? 'text-background' : 'text-primaryDark'
                    }`}>Dashboard</span>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-background' : 'text-primaryDark'
                    }`}>Admin Panel</span>
                </div>
              )}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className={`py-2 ${theme === 'dark' ? 'bg-primaryDark' : 'bg-background'
          }`}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-2">
                {sideBarItems.map((item) => {
                  const hasChildren = item.childMenus && item.childMenus.length > 0
                  const isOpen = openMenus.includes(item.href)
                  if (hasChildren) {
                    return (
                      <Collapsible
                        key={item.href}
                        open={isOpen}
                        onOpenChange={(open) => {
                          setOpenMenus((prev) =>
                            open
                              ? [...prev, item.href]
                              : prev.filter((href) => href !== item.href)
                          )
                        }}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={shouldShowText ? undefined : item.text}
                              className={`cursor-pointer h-11 rounded-xl transition-all duration-200 hover:scale-[1.02] ${theme === 'dark'
                                ? 'hover:bg-primaryDark text-background'
                                : 'hover:bg-primaryLight text-primaryDark'
                                } ${isOpen ? (theme === 'dark' ? 'bg-[var(--primary)]/30' : 'bg-[var(--backgroundLight)]/70') : ''}`}
                              onClick={(e) => {
                                if (isMobile) {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleSubmenu(item.href, e)
                                }
                              }}
                            >
                              <item.icon className="size-5 cursor-pointer" />
                              {shouldShowText && (
                                <>
                                  <span className="cursor-pointer font-medium">{item.text}</span>
                                  <div
                                    className={`ml-auto cursor-pointer p-1 rounded-lg transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                      ? 'hover:bg-primaryDark'
                                      : 'hover:bg-primaryLight'
                                      }`}
                                    onClick={(e) => toggleSubmenu(item.href, e)}
                                  >
                                    {isOpen ? (
                                      <Minus className="size-4 cursor-pointer" />
                                    ) : (
                                      <Plus className="size-4 cursor-pointer" />
                                    )}
                                  </div>
                                </>
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          {shouldShowText && (
                            <CollapsibleContent className="transition-all duration-300">
                              <SidebarMenuSub className="ml-4 mt-1  pl-4 space-y-1" >
                                {item.childMenus?.map((childItem) => (
                                  <SidebarMenuSubItem key={childItem.href}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className={`cursor-pointer h-10 rounded-lg transition-all duration-200 hover:scale-[1.02] ${theme === 'dark'
                                        ? 'hover:bg-primaryLight text-background'
                                        : 'hover:bg-primaryLight text-primaryDark'
                                        }`}
                                      onClick={handleMenuItemClick}
                                    >
                                      <a href={childItem.href} className="cursor-pointer flex items-center gap-3">
                                        <childItem.icon className="size-4 cursor-pointer" />
                                        <span className="cursor-pointer font-medium">{childItem.text}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          )}
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  }
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        tooltip={shouldShowText ? undefined : item.text}
                        className={`cursor-pointer h-11 rounded-xl transition-all duration-200 hover:scale-[1.02] ${theme === 'dark'
                          ? 'hover:bg-backgroundLight text-background'
                          : 'hover:bg-backgroundLight text-primaryDark'
                          }`}
                        onClick={handleMenuItemClick}
                      >
                        <a href={item.href} className="cursor-pointer flex items-center gap-3">
                          <item.icon className="size-5 cursor-pointer" />
                          {shouldShowText && <span className="cursor-pointer font-medium">{item.text}</span>}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={` p-2 ${theme === 'dark'
          ? ' bg-primaryDark'
          : ' bg-background'
          }`}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={shouldShowText ? undefined : "Admin User"}
                className={`cursor-pointer h-12 rounded-xl transition-all duration-200 hover:scale-[1.02] ${theme === 'dark'
                  ? 'hover:bg-[var(--primary)]/40 text-background hover:text-backgroundLight'
                  : 'hover:bg-backgroundLight text-primaryDark hover:text-primaryDark'
                  }`}
                onClick={handleMenuItemClick}
              >
                <User className="size-5 cursor-pointer" />
                {shouldShowText && (
                  <div className="flex flex-col items-start">
                    <span className="cursor-pointer font-semibold text-sm">Admin User</span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-background' : 'text-primaryDark'
                      }`}>Administrator</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
export default AdminSideBar