"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectGrid } from "@/components/projects/ProjectGridNew";
import { ProjectFilters } from "@/components/projects/ProjectFiltersNew";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { Project, SanityCategory } from "@/types/sanity";
import { getProjectsData, getProjectCategories } from "@/data/sanity-data";

// Animation variants
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
  initialCategories?: SanityCategory[];
}
export const revalidate = 3600;
export function ProjectsSection({
  initialProjects = []
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
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      // For "All" category: show only featured projects
      const featuredProjects = projects.filter(
        (project) => project.featured === true
      );

      if (process.env.NODE_ENV === "development") {
        console.log(
          `🌟 "All" filter: Found ${featuredProjects.length} featured projects out of ${projects.length} total`
        );
      }

      return featuredProjects;
    } else {
      // For specific categories: show ALL projects in that category
      const categoryProjects = projects.filter((project) => {
        // Sanity projects with categories array
        if (project.categories && Array.isArray(project.categories)) {
          return project.categories.some((cat) => {
            const slugMatch = cat.slug?.current === activeFilter;
            const idMatch = cat._id === activeFilter;
            const titleMatch =
              cat.title?.toLowerCase().replace(/\s+/g, "-") === activeFilter;

            return slugMatch || idMatch || titleMatch;
          });
        }

        return false;
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          `🏷️ Category "${activeFilter}": Found ${categoryProjects.length} projects`
        );
      }

      return categoryProjects;
    }
  }, [projects, activeFilter]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);

    if (project.modal === true) {
      // Open in modal
      setIsModalOpen(true);
    } else if (project.modal === false) {
      // Open external URL in new tab
      const url = project.liveUrl || project.githubUrl;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } else {
      // Default: open in modal if no modal field specified
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      className="section-padding bg-white dark:bg-gray-900"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Engineered solutions that scale without the stress
            </p>
          </motion.div>

          {/* Project Filters */}
          {categories.length > 0 && (
            <motion.div variants={itemVariants}>
              <ProjectFilters
                categories={categories}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </motion.div>
          )}

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-3xl mb-4" />
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

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need a Custom Project?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
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
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Discuss Your Project
              </button>
              <a
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-pink-400 rounded-xl font-semibold hover:border-purple-600 dark:hover:bg-pink-400 dark:hover:text-gray-900 transition-all duration-300"
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
