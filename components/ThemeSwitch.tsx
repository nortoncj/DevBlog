"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");

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
      <div
        className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 ${className}`}
        aria-label="Toggle theme"
      >
        <Sun size={18} className="text-gray-400" />
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden transition-all duration-500 group ${className}`}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
    >
      {/* Background - Glassmorphism */}
      <div className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 transition-all duration-500 group-hover:border-purple-500/50" />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-purple-500/20 -z-10" />

      {/* Icon container with rotation */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Moon
                size={18}
                className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sun
                size={18}
                className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rotating particles effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-purple-400/30" />
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-pink-400/30" />
        <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-pink-400/30" />
        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-purple-400/30" />
      </motion.div>
    </motion.button>
  );
}

/**
 * Enhanced Theme Toggle with Label
 * Perfect for settings pages or mobile menus
 */
export function ThemeToggleWithLabel({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-11 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Theme
        </span>
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Sun
            size={16}
            className={isLight ? "text-purple-600" : "text-gray-400"}
          />
          <span>Light</span>
        </div>
      </div>

      {/* Toggle Switch */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`relative w-14 h-7 rounded-full transition-all duration-500 ${
          isLight
            ? "bg-gray-200 dark:bg-gray-700"
            : "bg-gradient-to-r from-purple-500 to-pink-500"
        }`}
        aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      >
        {/* Toggle knob */}
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
          className={`absolute top-0.5 ${
            isLight ? "left-0.5" : "left-7"
          } w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center`}
        >
          <AnimatePresence mode="wait">
            {isLight ? (
              <motion.div
                key="sun-small"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={12} className="text-gray-600" />
              </motion.div>
            ) : (
              <motion.div
                key="moon-small"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={12} className="text-purple-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>

      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <span>Dark</span>
        <Moon
          size={16}
          className={!isLight ? "text-purple-400" : "text-gray-400"}
        />
      </div>
    </motion.div>
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

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
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
