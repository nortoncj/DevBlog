"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import heroImage from "@/public/assets/img/chrisNorton1.png";
import {
  FaMicrochip,
  FaCloud,
  FaRobot,
  FaEnvelopeOpenText,
  FaChartPie,
  FaArrowRight,
  FaPlay,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCode,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface HeroSectionProps {
  name?: string;
  image?: string;
  taglines?: string[];
  expertise?: Array<{ label: string; icon: string; color: string }>;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  stats?: {
    projects?: number;
    degree?: string;
  };
  videoUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Chris",
  image = heroImage,
  taglines = [
    // "Intelligent Systems",
    // "Scalable Solutions",
    // "Cloud Infrastructure",
    "Automation Tools",
    // "Embedded Systems",
    "Data Pipelines",
    // "Robotic Systems",
    "IoT Solutions",
  ],
  expertise = [
    {
      label: "Email Automation",
      icon: FaEnvelopeOpenText,
      color: "purple",
    },
    { label: "Cloud & DevOps", icon: FaCloud, color: "blue" },
    // { label: "IoT", icon: FaRobot, color: "pink" },
    { label: "Data Analyst", icon: FaChartPie, color: "green" },
    { label: "Embedded Systems", icon: FaMicrochip, color: "orange" },
  ],
  socialLinks = {
    github: "#",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  stats = {
    projects: 40,
    degree: "B.S.",
  },
  videoUrl = "your-intro-video.mp4",
}) => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rotating tagline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [taglines.length]);

  // Handle video modal
  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = "auto";
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoModalOpen) {
        closeVideoModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVideoModalOpen]);

  // Play video when modal opens
  useEffect(() => {
    if (isVideoModalOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoModalOpen]);

  // Particle system
  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full opacity-30";

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;

      const colors = ["#9333ea", "#db2777", "#3b82f6", "#8b5cf6", "#ec4899"];
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      particlesRef.current?.appendChild(particle);

      const duration = 15000 + Math.random() * 15000;
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 200;

      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;

      particle.animate(
        [
          { left: `${startX}%`, top: `${startY}%`, opacity: 0.3 },
          { left: `${endX}%`, top: `${endY}%`, opacity: 0 },
        ],
        {
          duration,
          easing: "ease-in-out",
        }
      ).onfinish = () => {
        particle.remove();
        createParticle();
      };
    };

    for (let i = 0; i < 30; i++) {
      setTimeout(() => createParticle(), i * 200);
    }
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string }
    > = {
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
      },
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
      },
      pink: {
        bg: "bg-pink-100 dark:bg-pink-900/30",
        text: "text-pink-700 dark:text-pink-300",
        border: "border-pink-200 dark:border-pink-800",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-300",
        border: "border-green-200 dark:border-green-800",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-700 dark:text-orange-300",
        border: "border-orange-200 dark:border-orange-800",
      },
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 dark:bg-[#1a1a1a]">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 animate-gradient-shift"
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Greeting Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 transition-all hover:scale-105 hover:shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available for Opportunities
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk text-gray-900 dark:text-white leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space-grotesk text-gray-800 dark:text-gray-100 mt-4 leading-tight">
                <span className="text-gray-600 dark:text-gray-400">
                  I Build
                </span>{" "}
                <span
                  className={`inline-block text-purple-600 dark:text-purple-400 min-w-[300px] transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  {taglines[currentTaglineIndex]}
                </span>
              </h2>
            </div>

            {/* Value Proposition */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              Multi-disciplinary engineer specializing in{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                scalable software solutions
              </span>
              ,
              <span className="font-semibold text-pink-600 dark:text-pink-400">
                {" "}
                intelligent automation
              </span>
              , and
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {" "}
                embedded systems
              </span>
              . Transforming complex problems into elegant, production-ready
              solutions.
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-3">
              {expertise.map((item, index) => {
                const Icon = item.icon as React.ComponentType<{
                  size: number;
                  className?: string;
                }>;
                const colors = getColorClasses(item.color);
                return (
                  <span
                    key={index}
                    className={`px-4 py-2 ${colors.bg} ${colors.text} flex items-center center rounded-full text-sm font-medium border ${colors.border} transition-all hover:scale-105 hover:shadow-md cursor-default`}
                  >
                    <Icon size={14} className="mr-2" />

                    {item.label}
                  </span>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                View My Work
                <FaArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
                />
              </a>
              <button
                onClick={openVideoModal}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
              >
                <span className="relative z-10 flex items-center">
                  <span className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                    <FaPlay className="text-white ml-0.5 group-hover:animate-play-bounce" />
                  </span>
                  <span className="text-lg">Watch My Intro</span>
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-6">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-xl"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xl"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-xl"
                >
                  <FaXTwitter size={24} />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={socialLinks.email}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors text-xl"
                >
                  <FaEnvelope size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className="relative lg:pl-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 dark:opacity-20 animate-pulse"></div>
              <div
                className="absolute -bottom-8 -right-8 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 dark:opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Image Container */}
              <div className="relative animate-float">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Glowing border effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-75"
                    style={{ boxShadow: "0 0 60px rgba(139, 92, 246, 0.5)" }}
                  ></div>

                  {/* Image */}
                  <div className="relative m-2 rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-square">
                    <Image
                      src={heroImage}
                      alt="Christopher Norton - Engineer"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                      quality={95}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -left-4 top-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaCode size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.projects}+
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Projects
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700 transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FaGraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.degree}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Engineering
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <FaTimes size={24} />
              
            </button>

            {/* Video Container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                controls
                playsInline
                webkit-playsinline="true"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
              <h3 className="text-2xl font-bold text-white mb-2">
                Meet {name} Norton
              </h3>
              <p className="text-gray-300">
                Multi-disciplinary engineer passionate about building scalable
                systems and intelligent solutions.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow:
              0 0 20px rgba(219, 39, 119, 0.4),
              0 0 40px rgba(219, 39, 119, 0.2),
              0 0 60px rgba(219, 39, 119, 0.1);
            transform: scale(1);
          }
          50% {
            box-shadow:
              0 0 30px rgba(219, 39, 119, 0.6),
              0 0 60px rgba(219, 39, 119, 0.4),
              0 0 80px rgba(219, 39, 119, 0.2);
            transform: scale(1.02);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes play-bounce {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }
        .animate-play-bounce {
          animation: play-bounce 0.6s ease-in-out infinite;
        }
        .font-space-grotesk {
          font-family: "Space Grotesk", sans-serif;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
