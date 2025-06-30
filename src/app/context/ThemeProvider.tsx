"use client"
import React, { createContext, useState } from 'react';
interface IInitialTheme {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}
const ThemeProviderContext = createContext<IInitialTheme | undefined>(undefined);
interface IThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children} {/* Render children here instead of string */}
    </ThemeProviderContext.Provider>
  );
};
export { ThemeProvider, ThemeProviderContext };