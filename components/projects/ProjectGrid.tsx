"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/types";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-bg-accent rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-signature-burgundy rounded animate-spin border-t-transparent" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No projects found
        </h3>
        <p className="text-text-secondary">
          Try adjusting your filter or check back soon for new systems.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            layout
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
            className="h-full"
          >
            <ProjectCard
              project={project}
              isHovered={hoveredProject === project.id}
              onClick={() => onProjectClick(project)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
