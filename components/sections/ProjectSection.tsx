"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { getProjectsData, getProjectCategories } from "@/data/sanity-data";
import { Project } from "@/types/sanity";
import { ProjectCategoriesDebug } from "../test/ProjectCategoriesDebug"; 
import { SanityDataTest } from "../test/debug-categories-component";
import { ForceCategoryRefresh } from "../test/ForceCategoryRefresh";



const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants : Variants = {
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

export function ProjectsSection({
  initialProjects = [],
}: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(!initialProjects.length);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Load projects and categories if not provided as initial props
  useEffect(() => {
    async function loadData() {
      if (!initialProjects.length) {
        try {
          const [projectsData, categoriesData] = await Promise.all([
            getProjectsData(),
            getProjectCategories(),
          ]);
          setProjects(projectsData);
          setCategories(categoriesData);
        } catch (error) {
          console.error("Failed to load projects:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Load categories even if we have initial projects
        try {
          const categoriesData = await getProjectCategories();
          setCategories(categoriesData);
        } catch (error) {
          console.error("Failed to load categories:", error);
        }
      }
    }

    loadData();
  }, [initialProjects]);

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => {
          // Debug logging for filtering
          if (process.env.NODE_ENV === "development") {
            console.log(
              `🔍 Filtering project "${project.title}" against filter "${activeFilter}"`
            );
          }

          // Handle Sanity projects (with categories array)
          if ("categories" in project && Array.isArray(project.categories)) {
            const hasMatch = project.categories.some((cat) => {
              const slugMatch = cat.slug?.current === activeFilter;
              const idMatch = cat._id === activeFilter;
              const titleMatch =
                cat.title?.toLowerCase().replace(/\s+/g, "-") === activeFilter;

              if (process.env.NODE_ENV === "development") {
                console.log(
                  `  📋 Category "${cat.title}": slug="${cat.slug?.current}", id="${cat._id}", matches="${slugMatch || idMatch || titleMatch}"`
                );
              }

              return slugMatch || idMatch || titleMatch;
            });

            if (process.env.NODE_ENV === "development") {
              console.log(`  ✅ Sanity project match result: ${hasMatch}`);
            }

            return hasMatch;
          }

          // Handle static projects (with category string)
          if ("category" in project) {
            const staticProject = project as any;
            const categoryMatch = staticProject.category === activeFilter;
            const slugMatch =
              staticProject.category?.toLowerCase().replace(/\s+/g, "-") ===
              activeFilter;

            if (process.env.NODE_ENV === "development") {
              console.log(
                `  📝 Static category "${staticProject.category}": matches="${categoryMatch || slugMatch}"`
              );
            }

            return categoryMatch || slugMatch;
          }

          // No recognizable category structure
          if (process.env.NODE_ENV === "development") {
            console.log(`  ❌ No category structure found in project`);
          }

          return false;
        });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    // console.log(project)
    if (project.modal === true) {
      setIsModalOpen(true);
    } else if (project.modal === false) {
      // Open external URL in new tab
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
    
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Delay clearing project for smooth animation
  };

  return (
    <section
      id="projects"
      className="section-padding bg-bg-primary dark:bg-gray-900"
      ref={ref}
    >
      <div className="container-strategic">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title text-text-primary dark:text-white">
              <span className="text-gradient-hero">Projects</span>
            </h2>
            <p className="section-subtitle text-text-secondary dark:text-gray-300">
              <span className="dark:text-gray-300">
                Engineered solutions that scale without the stress
              </span>
            </p>
          </motion.div>

          {/* Debug Component - Only shown in development */}
          {/* <ForceCategoryRefresh onCategoriesUpdate={setCategories} />
          <SanityDataTest />
          <ProjectCategoriesDebug projects={projects} categories={categories} /> */}

          {/* Project Filters */}
          <motion.div variants={itemVariants}>
            {categories.length > 0 && (
              <ProjectFilters
                categories={categories}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            )}
          </motion.div>
          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-bg-secondary dark:bg-gray-700 rounded-lg mb-4" />
                    <div className="h-4 bg-bg-secondary dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-bg-secondary dark:bg-gray-700 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <ProjectGrid
                projects={filteredProjects}
                onProjectClick={handleProjectClick}
              />
            )}
          </motion.div>
          {/* Bottom Stats - Commented out in original */}
          {/* <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-bg-accent dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-signature-burgundy dark:text-pink-400 mb-2">
                {projects.length}+
              </div>
              <div className="text-text-secondary dark:text-gray-400">
                Strategic Systems Delivered
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-signature-burgundy dark:text-pink-400 mb-2">
                $10M+
              </div>
              <div className="text-text-secondary dark:text-gray-400">
                Business Value Generated
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-signature-burgundy dark:text-pink-400 mb-2">
                99.9%
              </div>
              <div className="text-text-secondary dark:text-gray-400">System Uptime Achieved</div>
            </div>
          </motion.div> */}
          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-bg-secondary dark:bg-gray-800 border border-transparent dark:border-gray-600 rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-white mb-4">
              Need a Custom System Architecture?
            </h3>
            <p className="text-lg text-text-secondary dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Every business has unique challenges. Let's design a systematic
              solution that fits your specific requirements and growth
              trajectory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                Discuss Your Project
              </button>
              <a
                href="/blog"
                className="btn-secondary dark:btn-white dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 dark:hover:text-gray-900"
              >
                Read Case Studies
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

