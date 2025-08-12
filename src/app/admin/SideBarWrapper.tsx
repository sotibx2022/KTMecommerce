"use client";
import { useContext } from "react";
import { ThemeProviderContext } from "../context/ThemeProvider";
import ThemeValueGetter from "./ThemeValueGetter";
export default function SideBarWrapper({ children }: { children: React.ReactNode }) {
  const themeContext = useContext(ThemeProviderContext);
  if (!themeContext) {
    throw new Error("SideBarWrapper must be used within a ThemeProvider");
  }
  const { theme } = themeContext;
  return (
    <>
      <ThemeValueGetter theme={theme}>
        <div >
          {children}
        </div>
      </ThemeValueGetter>
    </>
  );
}