"use client";

import { useEffect, useMemo, memo } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  X,
  ExternalLink,
  Github,
  Globe,
  Clock,
  User,
  CheckCircle,
  Calendar,
  Target,
  Zap,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { urlFor } from "@/lib/sanity";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

// Optimized animation variants - reduced complexity
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

// Category labels
const categoryLabels: Record<string, string> = {
  automation: "Process Automation",
  "web-apps": "Web Applications",
  data: "Data Systems",
  integrations: "API Integrations",
  all: "All Projects",
};

// Memoized helper functions
const getImageUrl = (image: Project["image"]): string => {
  if (!image) return "";

  try {
    // Optimized for modal view: larger but still reasonable
    return urlFor(image)
      .width(1200)
      .height(600)
      .quality(85)
      .auto("format")
      .fit("crop")
      .url();
  } catch {
    return "";
  }
};

const getCategoryLabel = (project: Project): string => {
  const category =
    typeof project.category === "string"
      ? project.category
      : project.categories?.[0]?.title || "web-apps";

  return categoryLabels[category] || categoryLabels["web-apps"];
};

const getClient = (project: Project): string => {
  return project.details?.client || project.client || "Professional Client";
};

const getTimeline = (project: Project): string => {
  return project.timeline?.duration || project.duration || "Ongoing";
};

const getStatus = (project: Project): string => {
  return project.status || "Completed";
};

// Memoized content extraction
const extractContent = (project: Project) => {
  return {
    overview:
      project.details?.overview ||
      project.description ||
      "This project showcases innovative solutions and technical expertise.",
    challenges:
      project.details?.challenges ||
      "Complex technical requirements demanding creative problem-solving approaches.",
    solution:
      project.details?.solution ||
      "Implemented comprehensive solutions using modern technologies and best practices.",
    results:
      project.details?.results ||
      "Delivered exceptional results with improved efficiency and measurable business impact.",
    features: project.details?.features ||
      (project.technologies || project.techStack || [])
        .slice(0, 6)
        .map(
          (tech) =>
            `${typeof tech === "string" ? tech : String(tech)} implementation`
        ) || [
        "Modern responsive design",
        "Optimized performance",
        "User-friendly interface",
      ],
  };
};

// Memoized MetaCard component
const MetaCard = memo(
  ({
    icon: Icon,
    label,
    value,
    highlight = false,
  }: {
    icon: any;
    label: string;
    value: string;
    highlight?: boolean;
  }) => (
    <div className="group relative overflow-hidden p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-purple-400/30">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-lg transition-colors duration-300",
            highlight
              ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30"
          )}
        >
          <Icon
            size={20}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
            {label}
          </div>
          <div
            className={cn(
              "text-sm font-semibold transition-colors duration-300",
              highlight
                ? "bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                : "text-gray-900 dark:text-white"
            )}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
);

MetaCard.displayName = "MetaCard";

// Memoized SectionHeading component
const SectionHeading = memo(
  ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <Icon size={16} />
      </div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
        {children}
      </h3>
    </div>
  )
);

SectionHeading.displayName = "SectionHeading";

// Main component
export const ProjectModal = memo<ProjectModalProps>(
  ({ project, isOpen, onClose }) => {
    // Memoize processed data
    const imageUrl = useMemo(() => getImageUrl(project.image), [project.image]);
    const categoryLabel = useMemo(() => getCategoryLabel(project), [project]);
    const content = useMemo(() => extractContent(project), [project]);
    const technologies = useMemo(
      () => (project.technologies || project.techStack || []).slice(0, 10),
      [project.technologies, project.techStack]
    );

    // Handle ESC key and body scroll
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          variants={modalVariants}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-lg group"
            aria-label="Close modal"
          >
            <X
              size={24}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {/* Hero Section */}
            <div className="relative h-80 lg:h-96 overflow-hidden">
              {/* Background Image with Parallax Effect */}
              {imageUrl ? (
                <div className="absolute inset-0">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 mix-blend-multiply" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center">
                  <ExternalLink size={80} className="text-white/30" />
                </div>
              )}

              {/* Hero Content */}
              <motion.div
                variants={contentVariants}
                className="relative h-full flex flex-col justify-end p-8 lg:p-12"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-semibold mb-4 w-fit">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  {categoryLabel}
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-3 drop-shadow-2xl">
                  {project.title}
                </h1>

                {/* Description */}
                <p className="text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-lg">
                  {project.description}
                </p>
              </motion.div>
            </div>

            {/* Content Section */}
            <motion.div
              variants={contentVariants}
              className="p-6 lg:p-10 space-y-8"
            >
              {/* Meta Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetaCard
                  icon={Calendar}
                  label="Timeline"
                  value={getTimeline(project)}
                />
                <MetaCard
                  icon={User}
                  label="Client"
                  value={getClient(project)}
                />
                <MetaCard
                  icon={Target}
                  label="Status"
                  value={getStatus(project)}
                  highlight
                />
                <MetaCard
                  icon={Award}
                  label="Technologies"
                  value={`${technologies.length}+ Tools`}
                />
              </div>

              {/* Technology Stack */}
              {technologies.length > 0 && (
                <div>
                  <SectionHeading icon={Zap}>Technology Stack</SectionHeading>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={typeof tech === "string" ? tech : `tech-${index}`}
                        className="group relative px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">
                          {typeof tech === "string" ? tech : String(tech)}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

              {/* Project Details in Cards */}
              <div className="grid gap-6">
                {/* Overview */}
                <div className="group relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-500/30 dark:hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg">
                  <SectionHeading icon={Target}>
                    Project Overview
                  </SectionHeading>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.overview}
                  </p>
                </div>

                {/* Challenges & Solution Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-500/30 dark:hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg">
                    <SectionHeading icon={Target}>
                      Key Challenges
                    </SectionHeading>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {content.challenges}
                    </p>
                  </div>

                  <div className="group relative p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-700/50 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg">
                    <SectionHeading icon={Zap}>
                      Strategic Solution
                    </SectionHeading>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {content.solution}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="group relative p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700/50 hover:border-green-500/50 dark:hover:border-green-400/50 transition-all duration-300 hover:shadow-lg">
                  <SectionHeading icon={Award}>
                    Measurable Results
                  </SectionHeading>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.results}
                  </p>
                </div>

                {/* Key Features */}
                {content.features.length > 0 && (
                  <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <SectionHeading icon={CheckCircle}>
                      Key Features
                    </SectionHeading>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {content.features.map((feature :any, index: any ) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <CheckCircle
                            size={18}
                            className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"
                          />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Globe size={20} className="relative" />
                    <span className="relative">View Live Project</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-105 transition-all duration-300"
                  >
                    <Github size={20} />
                    View Source Code
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    className="group relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <ExternalLink size={20} className="relative" />
                    <span className="relative">Discuss Similar Project</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

ProjectModal.displayName = "ProjectModal";
