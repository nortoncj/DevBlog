"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Star, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { urlFor } from "@/lib/sanity";



interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onClick: () => void;
}

const categoryColors = {
  automation:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500/30",
  "web-apps":
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30",
  data: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-500/30",
  integrations:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-500/30",
};

const categoryLabels = {
  automation: "Process Automation",
  "web-apps": "Web Applications",
  data: "Data Systems",
  integrations: "API Integrations",
};

export function ProjectCard({ project, isHovered, onClick }: ProjectCardProps) {
  // Safely access timeline - fallback to a default if not available
  const getTimeline = () => {
    if (project.timeline) return project.timeline;
    if (project.details?.timeline) return project.details.timeline;
    if (project.duration) return project.duration;
    return "Contact for details"; // Fallback
  };

  // Get the category key safely
  const getCategoryKey = () => {
    if (typeof project.category === "string") {
      return project.category as keyof typeof categoryColors;
    }
    if (project.categories && project.categories.length > 0) {
      const firstCategory = project.categories[0];
      return (firstCategory.slug?.current ||
        firstCategory.title?.toLowerCase()) as keyof typeof categoryColors;
    }
    return "automation"; // Default fallback
  };

  const categoryKey = getCategoryKey();

  return (
    <motion.div
      className={cn(
        "group cursor-pointer h-full flex flex-col bg-bg-primary dark:bg-gray-800 rounded-xl overflow-hidden",
        "border border-bg-accent dark:border-gray-600 hover:border-signature-burgundy/30 dark:hover:border-pink-400/50",
        "shadow-card dark:shadow-xl dark:shadow-pink-500/5 hover:shadow-card-hover dark:hover:shadow-pink-500/20 transition-all duration-300",
        "transform hover:-translate-y-1"
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
     
      {/* Project Thumbnail */}
      <div className="relative h-48 lg:h-52 overflow-hidden bg-bg-accent dark:bg-gray-700">
        {project.image? (
          
           <Image
            src={urlFor(project.image).url()}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            /> 
         
          
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-tech text-white">
              <div className="text-4xl opacity-50">
                <h1>No Go</h1>
              <ExternalLink size={48} />
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-hero text-white px-2 py-1 rounded-full text-xs font-semibold">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover View Details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-bg-primary/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2 text-signature-burgundy dark:text-pink-400 font-medium border border-bg-accent/50 dark:border-gray-600/50">
            View Details
            <ArrowUpRight size={16} />
          </div>
        </motion.div>
      </div>
      {/* Project Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category */}
        <div className="mb-3">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-medium border",
              categoryColors[categoryKey] ||
                "bg-bg-accent dark:bg-gray-700 text-text-secondary dark:text-gray-300 border-bg-accent dark:border-gray-600"
            )}
          >
            {categoryLabels[categoryKey] ||
              (typeof project.category === "string"
                ? project.category
                : project.categories?.[0]?.title || "Project")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3 group-hover:text-signature-burgundy dark:group-hover:text-pink-400 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description || project.excerpt}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.technologies || project.techStack || [])
            .slice(0, 4)
            .map((tech, index) => (
              <span
                key={typeof tech === "string" ? tech : tech.name || index}
                className="badge-tech text-xs"
              >
                {typeof tech === "string" ? tech : tech.name}
              </span>
            ))}
          {(project.technologies || project.techStack || []).length > 4 && (
            <span className="badge-tech text-xs">
              +{(project.technologies || project.techStack || []).length - 4}
            </span>
          )}
        </div>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-xs text-text-muted dark:text-gray-400 pt-3 border-t border-bg-accent dark:border-gray-600">
          <span>Timeline: {getTimeline()}</span>
          <div className="flex items-center gap-1 text-signature-burgundy dark:text-pink-400">
            <span>View Case Study</span>
            <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
