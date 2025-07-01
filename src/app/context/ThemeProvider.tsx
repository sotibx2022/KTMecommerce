"use client";
import React, { createContext, useState } from 'react';
type Theme = "light" | "dark";
interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export const ThemeProviderContext = createContext<IThemeContext | undefined>(undefined);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default theme is 'light'
  const [theme, setThemeState] = useState<Theme>("light");
  // Simple setter
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
