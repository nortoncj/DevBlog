"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = stored || (prefersDark ? "light" : "dark");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`dark-mode-toggle ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <Sun size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`dark-mode-toggle ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

/**
 * Theme utility functions for programmatic theme control
 */
export const themeUtils = {
  /**
   * Get current theme
   */
  getCurrentTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return (
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "light"
    );
  },

  /**
   * Set theme programmatically
   */
  setTheme(theme: "light" | "dark") {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  },

  /**
   * Toggle theme programmatically
   */
  toggleTheme() {
    const current = this.getCurrentTheme();
    const newTheme = current === "light" ? "dark" : "light";
    this.setTheme(newTheme);
    return newTheme;
  },

  /**
   * Listen for system theme changes
   */
  onSystemThemeChange(callback: (isDark: boolean) => void) {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => callback(e.matches);

    mediaQuery.addEventListener("change", handler);

    // Return cleanup function
    return () => mediaQuery.removeEventListener("change", handler);
  },

  /**
   * Enable high contrast mode
   */
  enableHighContrast() {
    document.documentElement.setAttribute("data-contrast", "high");
    localStorage.setItem("contrast", "high");
  },

  /**
   * Disable high contrast mode
   */
  disableHighContrast() {
    document.documentElement.removeAttribute("data-contrast");
    localStorage.removeItem("contrast");
  },

  /**
   * Initialize theme from storage/system preference
   */
  initializeTheme() {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const contrast = localStorage.getItem("contrast");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const theme = stored || (prefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", theme);

    if (contrast === "high") {
      document.documentElement.setAttribute("data-contrast", "high");
    }

    return theme;
  },
};
