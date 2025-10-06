"use client";

import { useEffect } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { urlFor } from "@/lib/sanity";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

const modalVariants:Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const categoryLabels = {
  automation: "Process Automation",
  "web-apps": "Web Applications",
  data: "Data Systems",
  integrations: "API Integrations",
};

// Safe property access functions
// const getTimeline = (project: Project): string => {
//   if (project.timeline) return project.timeline;
//   if (project.details?.timeline) return project.details.timeline;
//   if (project.duration) return project.duration;
//   return "Contact for details";
// };

const getClient = (project: Project): string => {
  if (project.details?.client) return project.details.client;
  if (project.client) return project.client;
  return "Professional Client";
};

const getOverview = (project: Project): string => {
  if (project.details?.overview) return project.details.overview;
  return (
    project.description ||
    "This project showcases innovative solutions and technical expertise to deliver measurable business results."
  );
};

const getChallenges = (project: Project): string => {
  if (project.details?.challenges) return project.details.challenges;
  return "Complex technical requirements demanding creative problem-solving and strategic implementation approaches.";
};

const getSolution = (project: Project): string => {
  if (project.details?.solution) return project.details.solution;
  return "Implemented comprehensive solutions using modern technologies and best practices to exceed project objectives.";
};

const getResults = (project: Project): string => {
  if (project.details?.results) return project.details.results;
  return "Delivered exceptional results with improved efficiency, enhanced user experience, and measurable business impact.";
};

const getFeatures = (project: Project): string[] => {
  if (project.details?.features && Array.isArray(project.details.features)) {
    return project.details.features;
  }
  const technologies = project.technologies || project.techStack || [];
  if (technologies && Array.isArray(technologies) && technologies.length > 0) {
    return technologies.map(
      (tech) =>
        `${typeof tech === "string" ? tech : String(tech)} implementation`
    );
  }
  return [
    "Modern responsive design",
    "Optimized performance",
    "User-friendly interface",
    "Scalable architecture",
  ];
};

const getCategoryKey = (category: string): keyof typeof categoryLabels => {
  const validKeys = Object.keys(categoryLabels) as Array<
    keyof typeof categoryLabels
  >;
  return validKeys.includes(category as keyof typeof categoryLabels)
    ? (category as keyof typeof categoryLabels)
    : "web-apps";
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
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
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm dark:bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        variants={modalVariants}
        className="relative w-full max-w-4xl max-h-[90vh] bg-bg-primary dark:bg-gray-900 rounded-2xl shadow-premium dark:shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg-secondary/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white hover:bg-bg-secondary dark:hover:bg-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] scrollbar-thin">
          {/* Header Section */}
          <div className="relative">
            {/* Project Image */}
            <div className="h-64 lg:h-80 relative bg-bg-accent dark:bg-gray-800">
              {project.image ? (
                <Image
                  src={urlFor(project.image).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-tech dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 text-white">
                  <ExternalLink size={64} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Project Header Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="badge-premium dark:bg-signature-burgundy/20 dark:text-rose-gold dark:border-rose-gold/30 mb-3">
                    {categoryLabels[
                      getCategoryKey(
                        typeof project.category === "string"
                          ? project.category
                          : project.categories?.[0]?.title || "automation"
                      )
                    ] || "Web Applications"}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    {project.title}
                  </h1>
                  <p className="text-lg opacity-90">{project.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 space-y-8">
            {/* Project Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-bg-secondary dark:bg-gray-800 rounded-lg">
                <Clock
                  className="text-signature-burgundy dark:text-rose-gold"
                  size={20}
                />
                <div>
                  <div className="text-sm text-text-muted dark:text-gray-400">
                    Timeline
                  </div>
                  <div className="font-medium text-text-primary dark:text-white">
                    {project.timeline?.duration}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-bg-secondary dark:bg-gray-800 rounded-lg">
                <User
                  className="text-signature-burgundy dark:text-rose-gold"
                  size={20}
                />
                <div>
                  <div className="text-sm text-text-muted dark:text-gray-400">
                    Client Type
                  </div>
                  <div className="font-medium text-text-primary dark:text-white">
                    {getClient(project)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-bg-secondary dark:bg-gray-800 rounded-lg">
                <CheckCircle
                  className="text-signature-burgundy dark:text-rose-gold"
                  size={20}
                />
                <div>
                  <div className="text-sm text-text-muted dark:text-gray-400">
                    Status
                  </div>
                  <div className="font-medium text-signature-burgundy dark:text-rose-gold">
                    {project.timeline?.duration || "Production"}
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-3">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.technologies || project.techStack || []).map(
                  (tech, index) => (
                    <span
                      key={typeof tech === "string" ? tech : `tech-${index}`}
                      className="badge-tech dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                    >
                      {typeof tech === "string" ? tech : String(tech)}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-signature-burgundy dark:text-rose-gold mb-3 border-b-2 border-rose-gold dark:border-rose-gold/60 pb-2">
                  Project Overview
                </h3>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                  {getOverview(project)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-signature-burgundy dark:text-rose-gold mb-3 border-b-2 border-rose-gold dark:border-rose-gold/60 pb-2">
                  Key Challenges
                </h3>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                  {getChallenges(project)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-signature-burgundy dark:text-rose-gold mb-3 border-b-2 border-rose-gold dark:border-rose-gold/60 pb-2">
                  Strategic Solution
                </h3>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                  {getSolution(project)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-signature-burgundy dark:text-rose-gold mb-3 border-b-2 border-rose-gold dark:border-rose-gold/60 pb-2">
                  Measurable Results
                </h3>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                  {getResults(project)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-signature-burgundy dark:text-rose-gold mb-3 border-b-2 border-rose-gold dark:border-rose-gold/60 pb-2">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getFeatures(project).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-text-secondary dark:text-gray-300"
                    >
                      <CheckCircle
                        size={16}
                        className="text-signature-burgundy dark:text-rose-gold mt-0.5 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-bg-accent dark:border-gray-700">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary dark:bg-signature-burgundy dark:hover:bg-signature-burgundy/90 dark:text-white flex items-center justify-center gap-2"
                >
                  <Globe size={20} />
                  View Live Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600 flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  View Code
                </a>
              )}
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={cn(
                  "btn-ghost dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white flex items-center justify-center gap-2",
                  !project.liveUrl &&
                    !project.githubUrl &&
                    "btn-primary dark:bg-signature-burgundy dark:hover:bg-signature-burgundy/90 dark:text-white"
                )}
              >
                <ExternalLink size={20} />
                Discuss Similar Project
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
