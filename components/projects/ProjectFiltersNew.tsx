"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05, y: -2 },
  tap: { scale: 0.98 },
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

export function ProjectFilters({
  categories,
  activeFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-wrap justify-center gap-3 lg:gap-4"
    >
      {categories.map((category, index) => {
        const isActive = activeFilter === category.id;

        return (
          <motion.div
            key={category.id}
            variants={buttonVariants}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative group"
          >
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.05, y: -2 },
                tap: { scale: 0.98 },
              }}
              onClick={() => onFilterChange(category.id)}
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

                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
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

                {/* Count badge (optional - you can add count prop if needed) */}
                {/* Uncomment and add count prop to show post counts */}
                {/* {category.count && (
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full transition-colors duration-300",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400"
                  )}>
                    {category.count}
                  </span>
                )} */}
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
      })}
    </motion.div>
  );
}
