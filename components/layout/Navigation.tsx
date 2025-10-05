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
  { label: "Home", href: "/home" },
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
      const sections = ["home", "about", "projects","blog", "contact"];
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
          ? "bg-bg-primary/95 backdrop-blur-lg shadow-card border-b border-bg-accent"
          : "bg-transparent"
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
            <span className="text-xl font-bold text-text-primary group-hover:text-signature-burgundy transition-colors">
              Christopher Norton
            </span>
            <span className="text-md font-medium text-signature-burgundy">
              System Architect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ">
            {navItems.map((item) => {
              const isActive = item.href.substring(1) === activeSection;
              const isExternal =
                item.href.startsWith("http") || item.href.startsWith("/blog");

              return isExternal ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-lg font-bold transition-all duration-200",
                    "hover:text-signature-burgundy",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "after:bg-gradient-hero after:transition-all after:duration-300",
                    "hover:after:w-full",
                    isActive
                      ? "text-signature-burgundy after:w-full"
                      : "text-text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-3 py-2 text-lg font-bold transition-all duration-200",
                    "hover:text-signature-burgundy",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                    "after:bg-gradient-hero after:transition-all after:duration-300",
                    "hover:after:w-full",
                    isActive
                      ? "text-signature-burgundy after:w-full"
                      : "text-text-secondary"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
            {/* <ThemeSwitch /> */}
            <ThemeToggle className="ml-4" />
          </div>

          {/* Mobile Menu Button */}
          <button
            id="nav-toggle"
            className="md:hidden p-2 text-text-primary hover:text-signature-burgundy transition-colors"
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
            "md:hidden absolute top-full left-0 right-0 bg-bg-primary/95 backdrop-blur-lg",
            "border-b border-bg-accent shadow-card transition-all duration-300",
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
                    "block px-4 py-3 text-md font-medium rounded-lg transition-all duration-200",
                    "hover:bg-signature-burgundy/10 hover:text-signature-burgundy",
                    isActive
                      ? "text-signature-burgundy bg-signature-burgundy/10"
                      : "text-text-secondary"
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
                    "w-full text-left px-4 py-3 text-md font-medium rounded-lg transition-all duration-200",
                    "hover:bg-signature-burgundy/10 hover:text-signature-burgundy",
                    isActive
                      ? "text-signature-burgundy bg-signature-burgundy/10"
                      : "text-text-secondary"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
