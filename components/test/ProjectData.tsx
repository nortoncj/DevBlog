"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/lib/sanity";

export function ProjectDataAnalysis() {
  const [rawProjects, setRawProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  useEffect(() => {
    async function fetchRawData() {
      try {
        console.log("🔍 Fetching raw Sanity projects...");
        const projects = await getProjects();
        console.log("📊 Raw Sanity projects:", projects.length);
        setRawProjects(projects);
      } catch (error) {
        console.error("❌ Error fetching raw projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRawData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-3 mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Loading raw project data...
        </span>
      </div>
    );
  }

  const featuredCount = rawProjects.filter((p) => p.featured === true).length;
  const totalCount = rawProjects.length;

  return (
    <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4">
      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
        📊 Raw Sanity Data Analysis
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-3 rounded">
          <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Projects
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded">
          <div className="text-2xl font-bold text-yellow-600">
            {featuredCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Featured Projects
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300">
          Projects in Sanity CMS:
        </h4>
        {rawProjects.map((project, i) => (
          <div
            key={project._id}
            className="bg-white dark:bg-gray-800 p-2 rounded text-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {i + 1}. {project.title}
              </span>
              <div className="flex items-center gap-2">
                {project.featured === true && (
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs">
                    ⭐ Featured
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {project.categories?.length || 0} categories
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Featured: {String(project.featured)} | Categories:{" "}
              {project.categories?.map((c: any) => c.title).join(", ") ||
                "None"}
            </div>
          </div>
        ))}
      </div>

      {totalCount <= 6 && (
        <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded text-sm">
          <div className="font-semibold text-orange-800 dark:text-orange-200">
            ⚠️ Limited Projects Detected
          </div>
          <div className="text-orange-700 dark:text-orange-300">
            You have {totalCount} total projects in Sanity. Consider adding more
            projects to fully test the filtering system.
          </div>
        </div>
      )}
    </div>
  );
}
