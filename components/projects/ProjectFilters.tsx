"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCategory {
  id: string;
  label: string;
  description: string;
}

interface ProjectFiltersProps {
  categories: readonly ProjectCategory[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const buttonVariants = {
  initial: { scale: 1 },
  tap: { scale: 0.95 },
  hover: { scale: 1.05 },
};

export function ProjectFilters({
  categories,
  activeFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => onFilterChange(category.id)}
          className={cn(
            "relative px-4 py-3 lg:px-6 lg:py-3 rounded-lg font-medium text-sm lg:text-base transition-all duration-300",
            "border-2 focus:outline-none focus:ring-2 focus:ring-deep-magenta focus:ring-offset-2",
            activeFilter === category.id
              ? "bg-signature-burgundy text-white border-signature-burgundy shadow-button-glow"
              : "bg-bg-primary text-text-secondary border-bg-accent hover:border-signature-burgundy hover:text-signature-burgundy hover:bg-signature-burgundy/5"
          )}
          aria-pressed={activeFilter === category.id}
          title={category.description}
        >
          <span className="relative z-10">{category.label}</span>

          {/* Active indicator */}
          {activeFilter === category.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-hero rounded-lg -z-10"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
