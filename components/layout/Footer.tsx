"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowUp,
  Code2,
  Heart,
} from "lucide-react";
import { scrollUtils } from "@/lib/utils";
import { BsGithub, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";

const footerLinks = {
  services: [
    { label: "Projects", href: "#projects" },
    // { label: "Process Automation", href: "#projects" },
    // { label: "Strategic Consulting", href: "#projects" },
    // { label: "Technical Leadership", href: "#contact" },
  ],
  resources: [
    { label: "Technical Insights", href: "/blog" },
    { label: "Case Studies", href: "/blog" },
    { label: "System Blueprints", href: "/blog" },
    { label: "Architecture Patterns", href: "/blog" },
  ],
  connect: [
    { label: "Start Project", href: "#contact" },
    // { label: "Schedule Call", href: "https://calendly.com/christopher-norton" },
    // { label: "Email Direct", href: "mailto:contact@chrisnortonjr.com" },
    {
      label: "Download Resume",
      href: "https://docs.google.com/document/d/16Cp_Q5bbbjoZqqiHHOPIa31t2y3S4b2StQtIFcnjrFY/edit?usp=sharing",
    },
  ],
};

const socialLinks = [
  {
    name: "LinkedIn",
    icon: BsLinkedin,
    href: "https://linkedin.com/in/chrisnortonjr",
    username: "@chrisnortonjr",
  },
  {
    name: "GitHub",
    icon: BsGithub,
    href: "https://github.com/nortoncj",
    username: "@chrisnortonjr",
  },
  {
    name: "Twitter",
    icon: BsTwitterX,
    href: "https://twitter.com/thewebtechninja",
    username: "@thewebtechninja",
  },
  {
    name: "Youtube",
    icon: BsYoutube,
    href: "https://www.youtube.com/@chrisnortonjr/",
    username: "@chrisnortonjr",
  },
  // {
  //   name: "Email",
  //   icon: Mail,
  //   href: "mailto:contact@chrisnortonjr.com",
  //   username: "chris@systemarchitect.dev",
  // },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const elementId = href.substring(1);
      scrollUtils.scrollToElement(elementId, 80);
    }
  };

  return (
    <footer className="bg-charcoal-gray dark:bcharcoal-gray text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blueprint opacity-5 dark:opacity-10" />

      <div className="container-strategic relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Chris Norton Jr
                </h3>
                <p className="text-rose-gold dark:text-pink-400 font-medium mb-3">
                  The System Architect
                </p>
                <p className="text-silver-accent dark:text-gray-300 italic text-lg">
                  "Build systems that scale. Results with precision."
                </p>
              </div>

              {/* Mission Statement */}
              <div className="p-4 bg-signature-burgundy/10 dark:bg-pink-500/10 rounded-lg border border-rose-gold/20 dark:border-pink-400/30">
                <p className="text-sm text-silver-accent dark:text-gray-300 leading-relaxed">
                  Strategic system architect specializing in scalable tools,
                  automations, and products for businesses without the endless
                  grind.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-3 text-white">
                  Connect & Follow
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target={
                          social.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          social.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="w-10 h-10 rounded-lg bg-silver-accent/10 dark:bg-gray-700 flex items-center justify-center text-silver-accent dark:text-gray-300 hover:bg-rose-gold dark:hover:bg-pink-500 hover:text-white transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={`${social.name}: ${social.username}`}
                      >
                        <Icon size={18} />
                      </motion.a>
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
                  <h4 className="font-semibold text-white mb-4">Services</h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(link.href)}
                            className="text-silver-accent dark:text-gray-400 hover:text-rose-gold dark:hover:text-pink-400 transition-colors text-sm"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-silver-accent dark:text-gray-400 hover:text-rose-gold dark:hover:text-pink-400 transition-colors text-sm"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-silver-accent dark:text-gray-400 hover:text-rose-gold dark:hover:text-pink-400 transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Get Started</h4>
                  <ul className="space-y-3">
                    {footerLinks.connect.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(link.href)}
                            className="text-silver-accent dark:text-gray-400 hover:text-rose-gold dark:hover:text-pink-400 transition-colors text-sm"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            target={
                              link.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              link.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-silver-accent dark:text-gray-400 hover:text-rose-gold dark:hover:text-pink-400 transition-colors text-sm"
                          >
                            {link.label}
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

        {/* Newsletter Section */}
        {/* <div className="border-t border-silver-accent/20 dark:border-gray-600 py-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-white mb-3">
              Strategic Updates
            </h4>
            <p className="text-silver-accent dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get systematic insights delivered monthly. No fluff, just
              actionable strategies for building systems that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-silver-accent/10 dark:bg-gray-800 border border-silver-accent/20 dark:border-gray-600 rounded-lg text-white placeholder-silver-accent dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-gold dark:focus:ring-pink-400 focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-silver-accent/20 dark:border-gray-600 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-silver-accent dark:text-gray-400">
              <p>
                © {currentYear} Chris Norton Jr. Strategic systems that scale.
              </p>
              <span className="hidden md:block">•</span>
              <div className="flex items-center gap-1">
                <span>Built with</span>
                <Heart
                  size={14}
                  className="text-rose-gold dark:text-pink-400 fill-current"
                />
                <span>and</span>
                <Code2
                  size={14}
                  className="text-rose-gold dark:text-pink-400"
                />
              </div>
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={handleScrollToTop}
              className="flex items-center gap-2 text-sm text-silver-accent dark:text-gray-400 hover:text-rose-gold dark:hover:text-pink-400 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-silver-accent/20 dark:border-gray-600 py-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xs text-silver-accent dark:text-gray-400">
            {/* <Link
              href="/privacy"
              className="hover:text-rose-gold dark:hover:text-pink-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-rose-gold dark:hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-rose-gold dark:hover:text-pink-400 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-rose-gold dark:hover:text-pink-400 transition-colors"
            >
              Sitemap
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
