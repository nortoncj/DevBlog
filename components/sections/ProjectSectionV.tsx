"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { getProjectsData, getProjectCategories } from "@/data/sanity-data";
import { projectsData, projectCategories } from "@/data/projects";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface ProjectsSectionProps {
  initialProjects?: Project[];
}

export function ProjectsSection({ initialProjects = [] }: ProjectsSectionProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });


}