"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  Heart,
  Code2,
  Sparkles,
} from "lucide-react";
import { BsTwitterX } from "react-icons/bs";

// Types
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: any;
  href: string;
  username: string;
}

// Social Links
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/nortoncj",
    username: "@nortoncj",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/chrisnortonjr",
    username: "Chris Norton Jr",
  },
  {
    name: "Twitter",
    icon: BsTwitterX,
    href: "https://twitter.com/chrisnortonjr",
    username: "@yourusername",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:chrisnortonjr.com",
    username: "chrisnortonjr.com",
  },
];

// Footer Links
const footerLinks = {
  services: [
    { label: "System Architecture", href: "#services" },
    { label: "Data Engineering", href: "#services" },
    { label: "Automation Solutions", href: "#services" },
    { label: "Technical Leadership", href: "#services" },
  ],
  resources: [
    { label: "Blog & Insights", href: "/blog" },
    { label: "Case Studies", href: "/blog" },
    { label: "Documentation", href: "/blog" },
    { label: "Technical Guides", href: "/blog" },
  ],
  connect: [
    { label: "View Projects", href: "#projects" },
    { label: "Schedule Consultation", href: "#contact" },
    { label: "Download Resume", href: "#contact" },
    { label: "Get in Touch", href: "#contact" },
  ],
};

// Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState<
    Array<{
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate random positions on client side only
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float"
          style={{
            background:
              i % 3 === 0 ? "#8B1538" : i % 2 === 0 ? "#B8336A" : "#E8B4B8",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const [inView, setInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Handle smooth scrolling for internal links
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // Scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#2C2C2C] dark:bg-gray-950 text-white overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139, 21, 56, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 21, 56, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient Overlays - System Architect Colors */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[128px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 21, 56, 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[128px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 180, 184, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Top Border - Brand Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(135deg, #8B1538 0%, #B8336A 50%, #8B1538 100%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div
          className={`py-16 lg:py-20 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3
                  className="text-2xl lg:text-3xl font-bold mb-2 cursor-default hover:scale-105 transition-transform inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Chris Norton Jr
                </h3>
                <p
                  className="font-semibold mb-3 flex items-center gap-2"
                  style={{ color: "#E8B4B8" }}
                >
                  <Sparkles size={16} style={{ color: "#B8336A" }} />
                  The Engineer
                </p>
                <p
                  className="italic text-base leading-relaxed"
                  style={{ color: "#A8A8A8" }}
                >
                  "Build systems that scale. Results with precision."
                </p>
              </div>

              {/* Mission Statement */}
              <div
                className="group relative p-5 backdrop-blur-xl rounded-xl border overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "#E8B4B8",
                }}
              >
                {/* Subtle gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 21, 56, 0.05) 0%, rgba(184, 51, 106, 0.05) 100%)",
                  }}
                />

                <p
                  className="relative z-10 text-sm leading-relaxed"
                  style={{ color: "#A8A8A8" }}
                >
                  System architect specializing in scalable tools, automations,
                  and products for businesses without the endless grind.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                  <span>Connect & Follow</span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(139, 21, 56, 0.5), transparent)",
                    }}
                  />
                </h4>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <div
                        key={social.name}
                        className={`transition-all duration-300 ${
                          inView ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        }`}
                        style={{
                          transitionDelay: `${0.5 + index * 0.1}s`,
                        }}
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group block hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all"
                          title={`${social.name}: ${social.username}`}
                        >
                          <div
                            className="relative w-11 h-11 rounded-lg backdrop-blur-xl border flex items-center justify-center transition-all duration-300 overflow-hidden"
                            style={{
                              background: "rgba(255, 255, 255, 0.03)",
                              borderColor: "rgba(232, 180, 184, 0.3)",
                              color: "#A8A8A8",
                            }}
                          >
                            {/* Gradient background on hover */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background:
                                  "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                              }}
                            />

                            {/* Icon */}
                            <Icon
                              size={18}
                              className="relative z-10 group-hover:text-white transition-colors duration-300"
                            />
                          </div>

                          {/* Subtle glow effect */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                            style={{
                              background: "rgba(139, 21, 56, 0.3)",
                            }}
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Services */}
                <div>
                  <h4 className="font-semibold text-white mb-5 flex items-center gap-2 text-lg">
                    Services
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(139, 21, 56, 0.5), transparent)",
                      }}
                    />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li
                        key={link.label}
                        className="hover:translate-x-1 transition-transform duration-200"
                      >
                        {link.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(link.href)}
                            className="group flex items-center gap-2 transition-colors text-sm"
                            style={{ color: "#A8A8A8" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-all group-hover:bg-[#8B1538]"
                              style={{
                                background: "transparent",
                              }}
                            />
                            <span className="group-hover:text-[#E8B4B8] transition-colors">
                              {link.label}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="group flex items-center gap-2 transition-colors text-sm"
                            style={{ color: "#A8A8A8" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-all group-hover:bg-[#8B1538]"
                              style={{
                                background: "transparent",
                              }}
                            />
                            <span className="group-hover:text-[#E8B4B8] transition-colors">
                              {link.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-semibold text-white mb-5 flex items-center gap-2 text-lg">
                    Resources
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(139, 21, 56, 0.5), transparent)",
                      }}
                    />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li
                        key={link.label}
                        className="hover:translate-x-1 transition-transform duration-200"
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 transition-colors text-sm"
                          style={{ color: "#A8A8A8" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full transition-all group-hover:bg-[#8B1538]"
                            style={{
                              background: "transparent",
                            }}
                          />
                          <span className="group-hover:text-[#E8B4B8] transition-colors">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="font-semibold text-white mb-5 flex items-center gap-2 text-lg">
                    Get Started
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(139, 21, 56, 0.5), transparent)",
                      }}
                    />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.connect.map((link) => (
                      <li
                        key={link.label}
                        className="hover:translate-x-1 transition-transform duration-200"
                      >
                        {link.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(link.href)}
                            className="group flex items-center gap-2 transition-colors text-sm"
                            style={{ color: "#A8A8A8" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-all group-hover:bg-[#8B1538]"
                              style={{
                                background: "transparent",
                              }}
                            />
                            <span className="group-hover:text-[#E8B4B8] transition-colors">
                              {link.label}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 transition-colors text-sm"
                            style={{ color: "#A8A8A8" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full transition-all group-hover:bg-[#8B1538]"
                              style={{
                                background: "transparent",
                              }}
                            />
                            <span className="group-hover:text-[#E8B4B8] transition-colors">
                              {link.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t py-8 transition-opacity duration-1000 delay-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ borderColor: "rgba(232, 180, 184, 0.2)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div
              className="flex flex-col sm:flex-row items-center gap-4 text-sm"
              style={{ color: "#A8A8A8" }}
            >
              <p className="flex items-center gap-2">
                <span>© {currentYear} Chris Norton Jr.</span>
                <span className="hidden sm:inline" style={{ color: "#7B4B94" }}>
                  •
                </span>
                <span style={{ color: "#E8B4B8" }}>
                  Strategic systems that scale.
                </span>
              </p>
              <div className="flex items-center gap-2">
                <span style={{ color: "#7B4B94" }}>Built with</span>
                <Heart
                  size={14}
                  className="fill-current animate-heartbeat"
                  style={{ color: "#B8336A" }}
                />
                <span style={{ color: "#7B4B94" }}>and</span>
                <Code2 size={14} style={{ color: "#8B1538" }} />
              </div>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={handleScrollToTop}
              className="group relative hover:scale-105 active:scale-95 transition-transform"
            >
              <div
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg backdrop-blur-xl border text-sm transition-all duration-300 overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(232, 180, 184, 0.3)",
                  color: "#A8A8A8",
                }}
              >
                {/* Gradient background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 21, 56, 0.2) 0%, rgba(184, 51, 106, 0.2) 100%)",
                  }}
                />

                <span className="relative z-10 group-hover:text-white transition-colors">
                  Back to Top
                </span>
                <div className="relative z-10 animate-bounce-subtle">
                  <ArrowUp
                    size={16}
                    className="transition-colors"
                    style={{ color: "#E8B4B8" }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
          animation-iteration-count: infinite;
          animation-delay: 3s;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 1.5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
