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
  const sidebarThemeClass = theme === 'dark' ? 'darkSidebar' : 'lightSidebar'
  const sidebarButtonThemeClass = theme === 'dark' ? 'darkSidebarButton' : 'lightSidebarButton'
  const sidebarTextThemeClass = theme === 'dark' ? 'darkSidebarText' : 'lightSidebarText'
  return (
    <>
      {isMobile && !openMobile && (
        <PanelLeftClose
          className={`mobileSidebarTrigger ${sidebarThemeClass}`}
          onClick={() => setOpenMobile(true)}
        />
      )}
      <Sidebar
        collapsible="icon"
        className={sidebarThemeClass}
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
            className="mobileSidebarOverlay"
            onClick={() => setOpenMobile(false)}
          />
        )}
        <SidebarHeader className={sidebarThemeClass}>
          <div className="sidebarHeaderContent">
            <div className="sidebarHeaderInner">
              <SidebarTrigger className={sidebarButtonThemeClass}>
                {shouldShowText ? (
                  <PanelLeftClose className="sidebarTriggerIcon" />
                ) : (
                  <PanelLeftOpen className="sidebarTriggerIcon" />
                )}
              </SidebarTrigger>
              {shouldShowText && (
                <div className="sidebarHeaderText">
                  <span className={sidebarTextThemeClass}>Dashboard</span>
                  <span className={sidebarTextThemeClass}>Admin Panel</span>
                </div>
              )}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className={sidebarThemeClass}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="sidebarMenu">
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
                        className="sidebarCollapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={shouldShowText ? undefined : item.text}
                              className={`sidebarMenuButton ${sidebarThemeClass} ${isOpen ? 'sidebarMenuButtonActive' : ''}`}
                              onClick={(e) => {
                                if (isMobile) {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleSubmenu(item.href, e)
                                }
                              }}
                            >
                              <item.icon className="sidebarIcon" />
                              {shouldShowText && (
                                <>
                                  <span className="sidebarMenuItemText">{item.text}</span>
                                  <div
                                    className={`sidebarSubmenuToggle ${sidebarThemeClass}`}
                                    onClick={(e) => toggleSubmenu(item.href, e)}
                                  >
                                    {isOpen ? (
                                      <Minus className="sidebarSubmenuIcon" />
                                    ) : (
                                      <Plus className="sidebarSubmenuIcon" />
                                    )}
                                  </div>
                                </>
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          {shouldShowText && (
                            <CollapsibleContent className="sidebarCollapsibleContent">
                              <SidebarMenuSub className="sidebarSubmenu">
                                {item.childMenus?.map((childItem) => (
                                  <SidebarMenuSubItem key={childItem.href}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className={`sidebarSubmenuButton ${sidebarThemeClass}`}
                                      onClick={handleMenuItemClick}
                                    >
                                      <a href={childItem.href} className="sidebarSubmenuLink">
                                        <childItem.icon className="sidebarSubmenuIcon" />
                                        <span className="sidebarSubmenuText">{childItem.text}</span>
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
                        className={`sidebarMenuButton ${sidebarThemeClass}`}
                        onClick={handleMenuItemClick}
                      >
                        <a href={item.href} className="sidebarMenuLink">
                          <item.icon className="sidebarIcon" />
                          {shouldShowText && <span className="sidebarMenuItemText">{item.text}</span>}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={sidebarThemeClass}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={shouldShowText ? undefined : "Admin User"}
                className={`sidebarFooterButton ${sidebarThemeClass}`}
                onClick={handleMenuItemClick}
              >
                <User className="sidebarIcon" />
                {shouldShowText && (
                  <div className="sidebarFooterText">
                    <span className="sidebarFooterTitle">Admin User</span>
                    <span className={sidebarTextThemeClass}>Administrator</span>
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