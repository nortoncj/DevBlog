"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Target, Zap } from "lucide-react";
import { cn, scrollUtils } from "@/lib/utils";
import heroImage from "@/public/assets/img/chrisNorton1.png";

const badges = [
  { icon: Code2, label: "Engineer" },
  { icon: Target, label: "Strategist" },
  { icon: Zap, label: "Architect" },
];

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleResumeButton = () => {
    // scrollUtils.scrollToElement("projects", 80);
    window.open(
      "https://docs.google.com/document/d/16Cp_Q5bbbjoZqqiHHOPIa31t2y3S4b2StQtIFcnjrFY/edit?usp=sharing","_blank")
    
  };

  const handleScrollToContact = () => {
    scrollUtils.scrollToElement("contact", 80);
  };

  if (!mounted) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center relative overflow-hidden bg-bg-primary dark:bg-gray-900 pt-20"
      >
        <div className="absolute inset-0 bg-blueprint opacity-5 dark:opacity-10 animate-blueprint-float" />
        <div className="container-strategic relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content placeholder */}
            <div className="space-y-6">
              <div className="h-16 bg-bg-secondary dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 bg-bg-secondary dark:bg-gray-700 rounded animate-pulse w-3/4" />
              <div className="h-20 bg-bg-secondary dark:bg-gray-700 rounded animate-pulse" />
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-bg-secondary dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-12 w-32 bg-bg-secondary dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
            {/* Image placeholder */}
            <div className="h-96 bg-bg-secondary dark:bg-gray-700 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-bg-primary dark:bg-gray-900 pt-20"
    >
      {/* Blueprint Background Pattern */}
      <div className="absolute inset-0 bg-blueprint opacity-5 dark:opacity-10 animate-blueprint-float" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-gray-800/30" />

      <div className="container-strategic relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Content */}
          <div className="space-y-6 lg:space-y-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary dark:text-white leading-tight">
                Build Systems That{" "}
                <span className="text-gradient-hero">Scale</span>
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-xl lg:text-2xl text-signature-burgundy dark:text-pink-400 font-medium mb-4">
                Results with precision.
              </p>
              <p className="text-lg lg:text-xl text-text-secondary dark:text-gray-300 leading-relaxed max-w-2xl">
                Strategic system architect designing scalable tools,
                automations, and products for businesses without the endless
                grind.
              </p>
            </motion.div>
            {/* Professional Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="badge-system flex items-center gap-2 dark:bg-gray-800 dark:border-gray-600 dark:text-pink-400"
                  >
                    <Icon size={16} />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </motion.div>
            {/* Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={handleResumeButton}
                className="btn-primary group"
              >
                <span className="flex items-center justify-center">
                  Resume{" "}
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </button>
              {/* <button
                onClick={handleScrollToContact}
                className="btn-secondary dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 dark:hover:text-gray-900"
              >
                Ask Chris AI
              </button> */}
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
                {/* Background Frame with Glow Effect */}
                <div className="absolute -inset-3 bg-gradient-hero rounded-2xl opacity-20 dark:opacity-30 animate-frame-glow" />

                {/* Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-rose-gold dark:border-pink-400 shadow-premium dark:shadow-2xl dark:shadow-pink-500/20">
                  <Image
                    src={heroImage}
                    alt="Christopher Norton - System Architect"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 320px, 384px"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-overlay opacity-30 dark:opacity-20" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-tech rounded-full flex items-center justify-center text-white shadow-premium dark:shadow-xl dark:shadow-purple-500/30"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Code2 size={28} />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-accent rounded-lg flex items-center justify-center text-white shadow-premium dark:shadow-xl dark:shadow-pink-500/30"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Target size={32} />
                </motion.div>
              </div>

              {/* Achievement Badges - Commented out in original */}
              {/* <motion.div
                className="absolute top-8 -left-8 bg-bg-primary dark:bg-gray-800 rounded-lg px-40 py-3 shadow-card border border-bg-accent dark:border-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="text-2xl font-bold text-signature-burgundy dark:text-pink-400">
                  20+
                </div>
                <div className="text-xs text-text-muted dark:text-gray-400">Systems Built</div>
              </motion.div>

              <motion.div
                className="absolute bottom-16 -right-12 bg-bg-primary dark:bg-gray-800 rounded-lg px-4 py-3 shadow-card border border-bg-accent dark:border-gray-600"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="text-2xl font-bold text-signature-burgundy dark:text-pink-400">
                  +30%
                </div>
                <div className="text-xs text-text-muted dark:text-gray-400">Avg. Efficiency</div>
              </motion.div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-signature-burgundy dark:border-pink-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-signature-burgundy dark:bg-pink-400 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
