// app/admin/layout.tsx
import { DisplayComponents } from "../context/DisplayComponents";
import { ProductDeleteProvider } from "../context/ProductDeleteContext";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../context/ThemeProvider";
import ConditionalComponents from "../_components/conditionalVisibleComponents/ConditionalComponents";
import SideBarWrapper from "./SideBarWrapper";
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DisplayComponents>
      <ProductDeleteProvider>
        <ThemeProvider>
          <SideBarWrapper>
            {children}
          </SideBarWrapper>
        </ThemeProvider>
      </ProductDeleteProvider>
      <ConditionalComponents />
      <Toaster/>
    </DisplayComponents>
  );
}