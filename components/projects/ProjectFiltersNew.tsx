"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { memo, useCallback, useRef } from "react";

interface ProjectCategory {
  id: string;
  label: string;
  description: string;
}

interface ProjectFiltersProps {
  categories: readonly ProjectCategory[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  debounceMs?: number; // Optional debounce delay for API calls
}

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Memoized FilterButton component to prevent unnecessary re-renders
const FilterButton = memo(
  ({
    category,
    index,
    isActive,
    onClick,
  }: {
    category: ProjectCategory;
    index: number;
    isActive: boolean;
    onClick: () => void;
  }) => {
    return (
      <motion.div
        variants={buttonVariants}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative group"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={cn(
            "relative px-6 py-3.5 lg:px-8 lg:py-4 rounded-2xl font-semibold text-sm lg:text-base transition-all duration-500 overflow-hidden",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
            isActive
              ? "text-white shadow-2xl shadow-purple-500/50"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300"
          )}
          aria-pressed={isActive}
          title={category.description}
        >
          {/* Background layers */}
          {isActive ? (
            <>
              {/* Gradient background for active state */}
              <motion.div
                layoutId="activeFilterGradient"
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

              {/* Simplified shine effect - reduced animation frequency */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  duration: 3, // Increased from 2 to reduce CPU usage
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1, // Add delay between repeats
                }}
              />

              {/* Grid pattern overlay - using CSS instead of inline SVG for better caching */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            </>
          ) : (
            <>
              {/* Glassmorphic background for inactive state */}
              <div className="absolute inset-0 bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl transition-all duration-500 group-hover:bg-gray-200/80 dark:group-hover:bg-white/10 group-hover:border-purple-500/50" />

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </>
          )}

          {/* Label text */}
          <span className="relative z-10 flex items-center gap-2">
            {/* Icon indicator */}
            {isActive && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
                className="w-2 h-2 rounded-full bg-white"
              />
            )}
            {category.label}
          </span>

          {/* Hover glow effect */}
          {!isActive && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-purple-500/20 -z-10" />
          )}
        </motion.button>

        {/* Tooltip on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-800 text-white text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 shadow-xl z-50 border border-gray-700"
        >
          {category.description}
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-l border-t border-gray-700 rotate-45" />
        </motion.div>
      </motion.div>
    );
  }
);

FilterButton.displayName = "FilterButton";

export const ProjectFilters = memo(function ProjectFilters({
  categories,
  activeFilter,
  onFilterChange,
  debounceMs = 300, // Default 300ms debounce
}: ProjectFiltersProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced filter change to reduce API calls
  const handleFilterChange = useCallback(
    (filterId: string) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Only debounce if not switching to the same filter
      if (filterId === activeFilter) {
        return;
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        onFilterChange(filterId);
      }, debounceMs);
    },
    [activeFilter, onFilterChange, debounceMs]
  );

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-wrap justify-center gap-3 lg:gap-4"
    >
      {categories.map((category, index) => (
        <FilterButton
          key={category.id}
          category={category}
          index={index}
          isActive={activeFilter === category.id}
          onClick={() => handleFilterChange(category.id)}
        />
      ))}
    </motion.div>
  );
});
