"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}
export const revalidate = 3600;
export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onProjectClick,
}) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No projects found in this category.
        </p>
      </div>
    );
  }

  // Helper to get image URL from SanityImage
  const getImageUrl = (image?: Project["image"]) => {
    if (!image) {
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80";
    }

    // If you have a urlForImage helper
    if (typeof urlFor === "function") {
      return urlFor(image).width(1200).height(800).url();
    }

    // Fallback: construct URL manually
    if (image.asset?._ref) {
      const ref = image.asset._ref;
      const [_, id, dimensions, format] = ref.split("-");
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;
    }

    return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80";
  };

  // Helper to extract plain text from PortableText description
  const getDescriptionText = (content?: Project["content"]) => {
    if (!content || content.length === 0) {
      return "No description available.";
    }

    // Get first paragraph of content
    const firstBlock = content.find(
      (block: any) => block._type === "block" && block.children
    );
      
    if (firstBlock && firstBlock.children) {
      const text = firstBlock.children.map((child: any) => child.text).join("");
      return text.substring(0, 150) + (text.length > 150 ? "..." : "");
    }

    return "No description available.";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {projects.map((project, index) => {
        const imageUrl = getImageUrl(project.image);
        const description = getDescriptionText(project.content);
        const tags = project.technologies || [];

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            onClick={() => onProjectClick(project)}
            className="project-card group cursor-pointer relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 border-2 border-transparent transition-all duration-400 hover:border-purple-500/50 dark:hover:border-purple-400/60 hover:-translate-y-2 hover:scale-[1.02]"
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-80 overflow-hidden">
              <img
                src={imageUrl}
                alt={project.image?.alt || project.title}
                className="w-full h-full object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-[0.4]"
              />
            </div>

            {/* Title Overlay (Always Visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-all duration-400 group-hover:opacity-0 group-hover:-translate-y-3">
              <h3 className="text-xl font-bold text-white shadow-lg">
                {project.title}
              </h3>
            </div>

            {/* Hover Popover (Details on Hover) */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/97 to-pink-600/97 backdrop-blur-sm p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center">
              {/* Title */}
              <h3 className="text-2xl font-extrabold text-white mb-4 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-white/95 text-base leading-relaxed mb-5">
                {description}
              </p>

              {/* Tags (Tech Stack) */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {tags.slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3.5 py-1.5 bg-white/25 border border-white/40 text-white text-xs font-semibold rounded-lg backdrop-blur-md transition-all hover:bg-white/35 hover:-translate-y-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* View Button */}
              <div>
                <button className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl text-sm font-bold shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Project
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}

      <style jsx global>{`
        .project-card {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .dark .project-card {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .project-card:hover {
          box-shadow: 0 24px 48px rgba(147, 51, 234, 0.25);
        }

        .dark .project-card:hover {
          box-shadow: 0 24px 48px rgba(168, 85, 247, 0.35);
        }

        /* Smooth animations */
        .duration-400 {
          transition-duration: 0.4s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .duration-600 {
          transition-duration: 0.6s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};
