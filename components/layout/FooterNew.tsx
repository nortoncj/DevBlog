"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, ArrowUp, Code2, Heart, Sparkles } from "lucide-react";
import { scrollUtils } from "@/lib/utils";
import { BsGithub, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";
import { useState, useEffect } from "react";

const footerLinks = {
  services: [{ label: "Projects", href: "#projects" }],
  resources: [
    { label: "Technical Insights", href: "/blog" },
    { label: "Case Studies", href: "/blog" },
    { label: "System Blueprints", href: "/blog" },
    { label: "Architecture Patterns", href: "/blog" },
  ],
  connect: [
    { label: "Start Project", href: "#contact" },
    {
      label: "Download Resume",
      href: "https://docs.google.com/document/d/16Cp_Q5bbbjoZqqiHHOPIa31t2y3S4b2StQtIFcnjrFY/edit?usp=sharing",
    },
  ],
};

const socialLinks  = [
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
    username: "@nortoncj",
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
];

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const elementId = href.substring(1);
      scrollUtils.scrollToElement(elementId, 80);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-gray-950 text-white overflow-hidden">
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px] pointer-events-none" />

      {/* Wave Pattern Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

      <div className="container-strategic relative z-10">
        {/* Main Footer Content */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 space-y-6"
            >
              <div>
                <motion.h3
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent cursor-default"
                >
                  Chris Norton Jr
                </motion.h3>
                <p className="text-purple-400 dark:text-purple-300 font-semibold mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-400" />
                  The Engineer
                </p>
                <p className="text-gray-300 dark:text-gray-400 italic text-base leading-relaxed">
                  "Build systems that scale. Results with precision."
                </p>
              </div>

              {/* Mission Statement */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="group relative p-5 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

                <p className="relative z-10 text-sm text-gray-300 dark:text-gray-400 leading-relaxed">
                  Engineer specializing in scalable tools, automations, and
                  products for businesses without the endless grind.
                </p>
              </motion.div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                  <span>Connect & Follow</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                </h4>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.div
                        key={social.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      >
                        <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group block"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          title={`${social.name}: ${social.username}`}
                        >
                          <div className="relative w-11 h-11 rounded-xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 group-hover:border-purple-500/50 overflow-hidden">
                            {/* Gradient background on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Icon */}
                            <Icon
                              size={18}
                              className="relative z-10 group-hover:text-white transition-colors duration-300"
                            />
                          </div>

                          {/* Glow effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-purple-500/30 -z-10" />
                        </motion.a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Services */}
                <div>
                  <h4 className="font-semibold text-white mb-5 flex items-center gap-2 text-lg">
                    Services
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <motion.li
                        key={link.label}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(link.href)}
                            className="group flex items-center gap-2 text-gray-400 dark:text-gray-400 hover:text-purple-400 transition-colors text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-colors" />
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="group flex items-center gap-2 text-gray-400 dark:text-gray-400 hover:text-purple-400 transition-colors text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-colors" />
                            {link.label}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-semibold text-white mb-5 flex items-center gap-2 text-lg">
                    Resources
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <motion.li
                        key={link.label}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-gray-400 dark:text-gray-400 hover:text-purple-400 transition-colors text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-colors" />
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="font-semibold text-white mb-5 flex items-center gap-2 text-lg">
                    Get Started
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks.connect.map((link) => (
                      <motion.li
                        key={link.label}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.href.startsWith("#") ? (
                          <button
                            onClick={() => handleNavClick(link.href)}
                            className="group flex items-center gap-2 text-gray-400 dark:text-gray-400 hover:text-purple-400 transition-colors text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-colors" />
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-gray-400 dark:text-gray-400 hover:text-purple-400 transition-colors text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-colors" />
                            {link.label}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span>© {currentYear} Chris Norton Jr.</span>
                <span className="hidden sm:inline text-gray-600">•</span>
                <span className="text-purple-400">
                  Strategic systems that scale.
                </span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Built with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Heart size={14} className="text-pink-400 fill-current" />
                </motion.div>
                <span className="text-gray-500">and</span>
                <Code2 size={14} className="text-purple-400" />
              </div>
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={handleScrollToTop}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-gray-300 transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-white/10 overflow-hidden">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />

                <span className="relative z-10 group-hover:text-white transition-colors">
                  Back to Top
                </span>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowUp
                    size={16}
                    className="text-purple-400 group-hover:text-pink-400 transition-colors"
                  />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
