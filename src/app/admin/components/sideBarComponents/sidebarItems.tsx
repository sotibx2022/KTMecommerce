import {
  Home,
  Package,
  ClipboardList,
  Users,
  Layers,
  MessageSquare,
  ShoppingCart,
  Heart,
  ImageIcon,
  Settings,
  Plus,
  Minus,
  List,
  UserPlus,
} from "lucide-react"
export const sideBarItems = [
  { href: "/admin", icon: Home, text: "Dashboard" },
  {
    href: "/admin/products",
    icon: Package,
    text: "Products",
    childMenus: [
      { href: "/admin/products/add", icon: Plus, text: "Add Product" },
      { href: "/admin/products/list", icon: List, text: "List Products" },
    ],
  },
  { href: "/admin/orders", icon: ClipboardList, text: "Orders" },
  { href: "/admin/users", icon: Users, text: "Users" },
  {
    href: "/admin/categories",
    icon: Layers,
    text: "Categories",
    childMenus: [
      { href: "/admin/categories/add", icon: Plus, text: "Add Category" },
      { href: "/admin/categories/list", icon: List, text: "List Categories" },
    ],
  },
  { href: "/admin/remarks", icon: MessageSquare, text: "Remarks" },
  { href: "/admin/carts", icon: ShoppingCart, text: "Carts" },
  { href: "/admin/wishlists", icon: Heart, text: "Wishlists" },
  {
    href: "/admin/sliders",
    icon: ImageIcon,
    text: "Sliders",
    childMenus: [
      { href: "/admin/sliders/add", icon: Plus, text: "Add Slider" },
      { href: "/admin/sliders/list", icon: List, text: "List Sliders" },
    ],
  },
  { href: "/admin/settings", icon: Settings, text: "Settings" },
  {
    href: "/admin/adminUsers",
    icon: Users,
    text: "Admin Users",
    childMenus: [
      { href: "/admin/adminUsers/add", icon: UserPlus, text: "Add Admin User" },
      { href: "/admin/adminUsers/list", icon: List, text: "List Admin Users" },
    ],
  },
]