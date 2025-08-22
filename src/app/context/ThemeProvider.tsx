"use client";
import React, { createContext, useState, useEffect } from "react";
type Theme = "light" | "dark";
interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export const ThemeProviderContext = createContext<IThemeContext | undefined>(
  undefined
);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light"); // default
  // Load theme from localStorage once client is mounted
  useEffect(() => {
    const savedTheme = localStorage.getItem("adminTheme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeState(savedTheme);
    }
  }, []);
  // Custom setter that also saves to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("adminTheme", newTheme);
  };
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
