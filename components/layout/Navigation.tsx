"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn, scrollUtils } from "@/lib/utils";
import ThemeSwitch from "../ThemeSwitch";
import { ThemeToggle } from "../ui/ThemeToggler";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "#contact" },
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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/20"
          : "bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="container-strategic">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <Link
            href="/"
            className="flex flex-col group"
            onClick={() => handleNavClick("#home")}
          >
            <span className="text-xl font-bold text-foreground group-hover:text-[#8B1538] transition-colors">
              Chris Norton Jr
            </span>
            <span className="text-sm font-medium text-[#8B1538] ">
              System Architect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = item.href.substring(1) === activeSection;
              const isExternal =
                item.href.startsWith("http") ||
                item.href.startsWith("/blog") ||
                item.href.startsWith("/");

              return isExternal ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-semibold transition-all duration-200",
                    "hover:text-[#8B1538] ",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "after:bg-gradient-to-r after:from-[#8B1538]  after:transition-all after:duration-300",
                    "hover:after:w-full",
                    isActive
                      ? "text-[#8B1538] after:w-full"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-semibold transition-all duration-200",
                    "hover:text-[#8B1538] ",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "after:bg-gradient-to-r after:from-[#8B1538]  after:transition-all after:duration-300",
                    "hover:after:w-full",
                    isActive
                      ? "text-[#8B1538]  after:w-full"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
            <ThemeToggle className="ml-4" />
          </div>

          {/* Mobile Menu Button */}
          <button
            id="nav-toggle"
            className="md:hidden p-2 text-foreground hover:text-[#8B1538] dark:hover:text-[#E8B4B8] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-nav"
          className={cn(
            "md:hidden absolute top-full left-0 right-0",
            "bg-background/95 backdrop-blur-lg border-b border-border/20 shadow-lg",
            "transition-all duration-300",
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4 pointer-events-none"
          )}
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = item.href.substring(1) === activeSection;
              const isExternal =
                item.href.startsWith("http") || item.href.startsWith("/blog");

              return isExternal ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-[#8B1538]/10 dark:hover:bg-[#E8B4B8]/10",
                    "hover:text-[#8B1538] dark:hover:text-[#E8B4B8]",
                    isActive
                      ? "text-[#8B1538] dark:text-[#E8B4B8] bg-[#8B1538]/10 dark:bg-[#E8B4B8]/10"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    "hover:bg-[#8B1538]/10 dark:hover:bg-[#E8B4B8]/10",
                    "hover:text-[#8B1538] dark:hover:text-[#E8B4B8]",
                    isActive
                      ? "text-[#8B1538] dark:text-[#E8B4B8] bg-[#8B1538]/10 dark:bg-[#E8B4B8]/10"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-border/20">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
