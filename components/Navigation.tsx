import { navItems } from "@/lib/constants";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navigation() {
    return (
      <nav className="main-nav-container  sticky top-0 z-50 bf-background/80 backdrop-blur-md border-b border-b-slate-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="main-nav-link text-xl text-white font-serif font-bold text-foreground dark:text-black">
                Chris Norton
              </h1>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  className="text-md main-nav-link font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
                  key={item.name}
                  href={item.href}
                >
                  {item.name}
                </Link>
              ))}
              <ThemeSwitch />
            </div>
          </div>
        </div>
        {/* <ul className="nav-main">
          <li>Logo</li>
          <li>Chris Norton</li>
        </ul>
        <ul className="nav-main">
          <li>
            <a href="/" className="main-nav-link main-active">
              Home
            </a>
          </li>
          <li>
            <a href="#skills" className="main-nav-link">
              Skills
            </a>
          </li>
          <li>
            <a href="#about" className="main-nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#portfolio" className="main-nav-link">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#Contact" className="main-nav-link">
              Contact
            </a>
          </li>
        </ul> */}
      </nav>
    );
}
