"use client";

import React, { useMemo, useCallback, memo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Project } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

// Optimized image URL builder with aggressive caching
const buildImageUrl = (
  image: Project["image"] | undefined,
  width: number = 600,
  height: number = 400,
  quality: number = 75
): string => {
  if (!image) {
    return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75";
  }

  // Use Sanity's image URL builder for optimized delivery
  if (typeof urlFor === "function") {
    return urlFor(image)
      .width(width)
      .height(height)
      .quality(quality)
      .auto("format") // Automatically serve WebP/AVIF when supported
      .fit("crop") // Crop for consistent sizing
      .url();
  }

  // Fallback manual URL construction
  if (image.asset?._ref) {
    const ref = image.asset._ref;
    const parts = ref.split("-");
    if (parts.length >= 3) {
      const [, id, dimensions, format] = parts;
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}?w=${width}&h=${height}&q=${quality}&auto=format&fit=crop`;
    }
  }

  return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75";
};

// Extract description text from Portable Text content
const extractDescription = (
  content: Project["content"] | undefined,
  maxLength: number = 120
): string => {
  if (!content || content.length === 0) {
    return "Click to explore this project";
  }

  const firstBlock = content.find(
    (block: any) => block._type === "block" && block.children
  );

  if (firstBlock && firstBlock.children) {
    const text = firstBlock.children
      .filter((child: any) => child.text)
      .map((child: any) => child.text)
      .join(" ")
      .trim();

    return text.length > maxLength
      ? text.substring(0, maxLength).trim() + "..."
      : text;
  }

  return "Click to explore this project";
};

// Memoized ProjectCard component with lazy loading
const ProjectCard = memo<{
  project: any;
  index: number;
  onClick: () => void;
}>(({ project, index, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px", // Start loading before entering viewport
    threshold: 0.01,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.4), // Cap delay for large lists
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      className="project-card group cursor-pointer relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 transition-all duration-300 hover:border-purple-500/50 dark:hover:border-purple-400/60 hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Optimized Image with Lazy Loading */}
      <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {inView && (
          <>
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>
            )}

            <img
              src={project.imageUrl}
              alt={project.image?.alt || project.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-[0.4] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              // Add image dimensions for better CLS (Cumulative Layout Shift)
              width={600}
              height={400}
            />
          </>
        )}
      </div>

      {/* Title Overlay - Default State */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-3">
        <h3 className="text-xl font-bold text-white drop-shadow-lg line-clamp-2">
          {project.title}
        </h3>
        {project.tags.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.tags.slice(0, 2).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-white/20 text-white rounded-md backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="text-xs px-2 py-1 bg-white/20 text-white rounded-md backdrop-blur-sm">
                +{project.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Overlay - Interactive State */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/97 to-pink-600/97 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 sm:mb-4 leading-tight line-clamp-2">
          {project.title}
        </h3>

        <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 line-clamp-3">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
            {project.tags.slice(0, 5).map((tag: string, tagIndex: number) => (
              <span
                key={tagIndex}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white/25 border border-white/40 text-white text-xs font-semibold rounded-lg backdrop-blur-md transition-all hover:bg-white/35"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-white/25 border border-white/40 text-white text-xs font-semibold rounded-lg backdrop-blur-md">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        )}

        <div>
          <button
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-purple-600 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-purple-50"
            aria-label={`View ${project.title} project details`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
});

ProjectCard.displayName = "ProjectCard";

// Main ProjectGrid Component
export const ProjectGrid = memo<ProjectGridProps>(
  ({ projects, onProjectClick }) => {
    // Process all projects data once with memoization
    const processedProjects = useMemo(() => {
      return projects.map((project) => ({
        ...project,
        imageUrl: buildImageUrl(project.image),
        description: extractDescription(project.content),
        tags: project.technologies || [],
      }));
    }, [projects]);

    // Memoized click handler to prevent re-creation
    const handleProjectClick = useCallback(
      (project: Project) => {
        onProjectClick(project);
      },
      [onProjectClick]
    );

    if (projects.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 sm:py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Projects Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Try selecting a different category to view more projects.
          </p>
        </motion.div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
          {processedProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project as any)}
            />
          ))}
        </div>

        <style jsx global>{`
          .project-card {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
            will-change: transform;
          }

          .dark .project-card {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .project-card:hover {
            box-shadow: 0 20px 40px rgba(147, 51, 234, 0.2);
          }

          .dark .project-card:hover {
            box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
          }

          /* Optimize line clamping */
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </>
    );
  }
);

ProjectGrid.displayName = "ProjectGrid";

// Static revalidation for Next.js ISR
export const revalidate = 3600; // Revalidate every hour
