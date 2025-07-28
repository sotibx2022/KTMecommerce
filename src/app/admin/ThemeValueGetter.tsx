import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSideBar from "./AdminSideBar";
import ProductFilterProvider from "../context/ProductFilterContext";
import AdminDashboardHeader from "./AdminDashboardHeader";
interface ITheme {
  theme: string,
  children: React.ReactNode
}
const ThemeValueGetter: React.FC<ITheme> = ({ theme, children }) => {
  return <div>
    <SidebarProvider theme={theme}>
      <AdminSideBar />
      <ProductFilterProvider>
        <div className={`${theme === 'dark' ? "darkTheme" : ""} adminChild px-4 w-[100%]`}>
          <AdminDashboardHeader />
          {children}
        </div>
      </ProductFilterProvider>
    </SidebarProvider>
  </div>
}
export default ThemeValueGetter