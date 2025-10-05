import { navItems } from "@/lib/constants";
import Link from "next/link";


export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-name">Christopher Norton</span>
          <span className="brand-tagline">System Architect</span>
        </div>
        {/* Desktop Navigation */}
        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              className="main-nav-link nav-link"
              key={item.name}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
          <a href="#home" className="nav-link">
            Home
          </a>
        </div>
        <button className="nav-toggle" id="nav-toggle">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}
