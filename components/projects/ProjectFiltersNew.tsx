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

// Memoized FilterButton component with brand theme
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
            "relative px-6 py-3.5 lg:px-8 lg:py-4 rounded-lg font-semibold text-sm lg:text-base transition-all duration-500 overflow-hidden",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8336A] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#2C2C2C]",
            isActive
              ? "text-white shadow-2xl shadow-[#8B1538]/50"
              : "text-[#2C2C2C] dark:text-[#F8F6F7] hover:text-[#8B1538] dark:hover:text-[#E8B4B8]"
          )}
          aria-pressed={isActive}
          title={category.description}
        >
          {/* Background layers */}
          {isActive ? (
            <>
              {/* Brand gradient background for active state */}
              <motion.div
                layoutId="activeFilterGradient"
                className="absolute inset-0 bg-gradient-to-r from-[#8B1538] to-[#B8336A]"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

              {/* Subtle shine effect with reduced frequency */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />

              {/* Blueprint grid pattern overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />
            </>
          ) : (
            <>
              {/* Glassmorphic background for inactive state */}
              <div className="absolute inset-0 bg-[#FEFCFC]/80 dark:bg-white/5 backdrop-blur-xl border border-[#F8F6F7] dark:border-white/10 rounded-lg transition-all duration-500 group-hover:bg-[#F8F6F7]/80 dark:group-hover:bg-white/10 group-hover:border-[#E8B4B8]/50" />

              {/* Hover gradient overlay with brand colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/0 to-[#E8B4B8]/0 group-hover:from-[#8B1538]/10 group-hover:to-[#E8B4B8]/10 rounded-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />

              {/* Subtle schematic pattern on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 21, 56, 0.1) 10px, rgba(139, 21, 56, 0.1) 11px)'
                }}
              />
            </>
          )}

          {/* Label text */}
          <span className="relative z-10 flex items-center gap-2">
            {/* Icon indicator - brand accent */}
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
                className="w-2 h-2 rounded-full bg-white shadow-sm"
              />
            )}
            {category.label}
          </span>

          {/* Hover glow effect with brand color */}
          {!isActive && (
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[#8B1538]/20 -z-10" />
          )}
        </motion.button>

        {/* Tooltip with brand styling */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded-lg bg-[#2C2C2C] dark:bg-[#1a1a1a] text-[#FEFCFC] text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 shadow-xl z-50 border border-[#7B4B94]/30"
        >
          {category.description}
          {/* Tooltip arrow with brand accent */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-[#2C2C2C] dark:bg-[#1a1a1a] border-l border-t border-[#7B4B94]/30 rotate-45" />
        </motion.div>
      </motion.div>
    );
  }
);

export default FilterButton;

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
