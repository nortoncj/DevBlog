"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollUtils } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeSwitch";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Insights", href: "/blog" },
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
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg border-b border-[#E8B4B8]/30 dark:border-[#E8B4B8]/20"
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur-md"
      )}
      style={{
        boxShadow: isScrolled ? "0 4px 20px rgba(139, 21, 56, 0.08)" : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand - System Architect Style */}
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
              <span
                className="text-xl lg:text-2xl font-bold transition-all duration-500"
                style={{
                  fontFamily: "Inter, sans-serif",
                  background:
                    "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Chris Norton Jr
              </span>
              <span
                className="block text-xs lg:text-sm font-semibold text-[#7B4B94] dark:text-[#E8B4B8] transition-colors duration-300"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                The Engineer
              </span>

              {/* Subtle hover glow effect */}
              <div
                className="absolute inset-0 -z-10 blur-xl transition-all duration-500 rounded-lg opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 21, 56, 0.15) 0%, rgba(184, 51, 106, 0.15) 100%)",
                }}
              />
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
                        "relative px-4 lg:px-5 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 overflow-hidden group",
                        isActive
                          ? "text-white dark:text-white"
                          : "text-[#2C2C2C] dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#E8B4B8]"
                      )}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {/* Active background with brand gradient */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                          }}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Inactive background - minimal */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: "#F8F6F7",
                            border: "1px solid #E8B4B8",
                          }}
                        />
                      )}
                      {!isActive && (
                        <div
                          className="absolute inset-0 dark:opacity-100 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(232, 180, 184, 0.2)",
                          }}
                        />
                      )}

                      {/* Text */}
                      <span className="relative z-10">{item.label}</span>

                      {/* Active indicator - minimal dot */}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "relative px-4 lg:px-5 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 overflow-hidden group",
                        isActive
                          ? "text-white dark:text-white"
                          : "text-[#2C2C2C] dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#E8B4B8]"
                      )}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {/* Active background with brand gradient */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                          }}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Inactive background - minimal */}
                      {!isActive && (
                        <>
                          <div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
                            style={{
                              background: "#F8F6F7",
                              border: "1px solid #E8B4B8",
                            }}
                          />
                          <div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(232, 180, 184, 0.2)",
                            }}
                          />
                        </>
                      )}

                      {/* Text */}
                      <span className="relative z-10">{item.label}</span>

                      {/* Active indicator - minimal dot */}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </button>
                  )}
                </motion.div>
              );

              return NavButton;
            })}

            {/* Theme Toggle with system architect styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="ml-2"
            >
              <ThemeToggle className="rounded-lg" />
            </motion.div>
          </div>

          {/* Mobile Menu Button - System Architect Style */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            id="nav-toggle"
            className={cn(
              "md:hidden relative p-2.5 rounded-lg transition-all duration-300",
              isOpen ? "text-white" : "text-[#2C2C2C] dark:text-gray-300"
            )}
            style={{
              background: isOpen
                ? "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)"
                : "#F8F6F7",
              border: isOpen ? "none" : "1px solid #E8B4B8",
            }}
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
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation - System Architect Style */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
              style={{
                borderTop: "1px solid #E8B4B8",
              }}
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="px-6 py-6 space-y-2 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl"
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
                            "block relative px-5 py-4 rounded-lg text-base font-semibold transition-all duration-300 overflow-hidden group",
                            isActive
                              ? "text-white"
                              : "text-[#2C2C2C] dark:text-gray-300"
                          )}
                          style={{ fontFamily: "Inter, sans-serif" }}
                          onClick={() => setIsOpen(false)}
                        >
                          {/* Active background */}
                          {isActive && (
                            <div
                              className="absolute inset-0 rounded-lg"
                              style={{
                                background:
                                  "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                              }}
                            />
                          )}

                          {/* Inactive background */}
                          {!isActive && (
                            <>
                              <div
                                className="absolute inset-0 rounded-lg dark:hidden"
                                style={{
                                  background: "#F8F6F7",
                                  border: "1px solid #E8B4B8",
                                }}
                              />
                              <div
                                className="absolute inset-0 rounded-lg hidden dark:block"
                                style={{
                                  background: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid rgba(232, 180, 184, 0.2)",
                                }}
                              />
                              <div
                                className="absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                                style={{
                                  background: "rgba(139, 21, 56, 0.05)",
                                }}
                              />
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
                            "w-full text-left relative px-5 py-4 rounded-lg text-base font-semibold transition-all duration-300 overflow-hidden group",
                            isActive
                              ? "text-white"
                              : "text-[#2C2C2C] dark:text-gray-300"
                          )}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {/* Active background */}
                          {isActive && (
                            <div
                              className="absolute inset-0 rounded-lg"
                              style={{
                                background:
                                  "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                              }}
                            />
                          )}

                          {/* Inactive background */}
                          {!isActive && (
                            <>
                              <div
                                className="absolute inset-0 rounded-lg dark:hidden"
                                style={{
                                  background: "#F8F6F7",
                                  border: "1px solid #E8B4B8",
                                }}
                              />
                              <div
                                className="absolute inset-0 rounded-lg hidden dark:block"
                                style={{
                                  background: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid rgba(232, 180, 184, 0.2)",
                                }}
                              />
                              <div
                                className="absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                                style={{
                                  background: "rgba(139, 21, 56, 0.05)",
                                }}
                              />
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
                  className="pt-4"
                  style={{ borderTop: "1px solid #E8B4B8" }}
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
