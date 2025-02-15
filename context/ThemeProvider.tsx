"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (theme) window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    let theme = window.localStorage.getItem("theme");
    if (theme) {
      if (window.localStorage.getItem("theme") === "dark")
        document.documentElement.classList.add("dark");
      if (window.localStorage.getItem("theme") === "light")
        document.documentElement.classList.remove("dark");
      if (window.localStorage.getItem("theme") === "dark")
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
