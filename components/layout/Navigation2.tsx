"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollUtils } from "@/lib/utils";
// import { ThemeToggle } from "../ui/ThemeToggler";
import ThemeToggle  from "@/components/ThemeSwitch"

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Insights", href: "/blog" },
//   { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "blog", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling for internal links
  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      const elementId = href.substring(1);
      scrollUtils.scrollToElement(elementId, 80);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-nav");
      const button = document.getElementById("nav-toggle");

      if (
        isOpen &&
        nav &&
        button &&
        !nav.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/5 border-b border-gray-200/50 dark:border-white/10"
          : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md"
      )}
    >
      <div className="container-strategic">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand - Enhanced with gradient and animation */}
          <Link
            href="/"
            className="relative flex flex-col group"
            onClick={() => handleNavClick("#home")}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-purple-600 transition-all duration-500">
                Chris Norton Jr
              </span>
              <span className="block text-xs lg:text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                Engineer
              </span>

              {/* Hover glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 blur-xl transition-all duration-500 rounded-lg" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? activeSection === "home"
                  : item.href.substring(1) === activeSection;
              const isExternal =
                item.href.startsWith("http") ||
                item.href.startsWith("/blog") ||
                item.href === "/";

              const NavButton = (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  {isExternal ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 lg:px-5 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all duration-300 overflow-hidden group",
                        isActive
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                      )}
                    >
                      {/* Active background with gradient */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Inactive background - glassmorphism */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}

                      {/* Hover gradient overlay */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300" />
                      )}

                      {/* Text */}
                      <span className="relative z-10">{item.label}</span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "relative px-4 lg:px-5 py-2.5 rounded-xl text-sm lg:text-base font-semibold transition-all duration-300 overflow-hidden group",
                        isActive
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                      )}
                    >
                      {/* Active background with gradient */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Inactive background - glassmorphism */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}

                      {/* Hover gradient overlay */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300" />
                      )}

                      {/* Text */}
                      <span className="relative z-10">{item.label}</span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </button>
                  )}
                </motion.div>
              );

              return NavButton;
            })}

            {/* Theme Toggle with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="ml-2"
            >
              <ThemeToggle className="rounded-xl" />
            </motion.div>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            id="nav-toggle"
            className={cn(
              "md:hidden relative p-2.5 rounded-xl transition-all duration-300",
              "bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10",
              "hover:bg-gray-200/80 dark:hover:bg-white/10 hover:border-purple-500/50",
              isOpen &&
                "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X
                    size={20}
                    className={
                      isOpen ? "text-white" : "text-gray-700 dark:text-gray-300"
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation - Enhanced with animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-white/10"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="px-6 py-6 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
              >
                {navItems.map((item, index) => {
                  const isActive =
                    item.href === "/"
                      ? activeSection === "home"
                      : item.href.substring(1) === activeSection;
                  const isExternal =
                    item.href.startsWith("http") ||
                    item.href.startsWith("/blog") ||
                    item.href === "/";

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      {isExternal ? (
                        <Link
                          href={item.href}
                          className={cn(
                            "block relative px-5 py-4 rounded-xl text-base font-semibold transition-all duration-300 overflow-hidden group",
                            isActive
                              ? "text-white"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {/* Active background */}
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl" />
                          )}

                          {/* Inactive background */}
                          {!isActive && (
                            <>
                              <div className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300" />
                            </>
                          )}

                          <span className="relative z-10 flex items-center justify-between">
                            {item.label}
                            {isActive && (
                              <span className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className={cn(
                            "w-full text-left relative px-5 py-4 rounded-xl text-base font-semibold transition-all duration-300 overflow-hidden group",
                            isActive
                              ? "text-white"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {/* Active background */}
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl" />
                          )}

                          {/* Inactive background */}
                          {!isActive && (
                            <>
                              <div className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300" />
                            </>
                          )}

                          <span className="relative z-10 flex items-center justify-between">
                            {item.label}
                            {isActive && (
                              <span className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </span>
                        </button>
                      )}
                    </motion.div>
                  );
                })}

                {/* Theme Toggle in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                  className="pt-4 border-t border-gray-200 dark:border-white/10"
                >
                  <div className="px-5 py-2">
                    <ThemeToggle />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
