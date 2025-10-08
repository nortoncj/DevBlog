"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/sanity";

interface ProjectCategoriesDebugProps {
  projects: Project[];
  categories: any[];
  className?: string;
}

export function ProjectCategoriesDebug({
  projects,
  categories,
  className = "",
}: ProjectCategoriesDebugProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const projectsWithCategories = projects.filter(
    (project) =>
      "categories" in project &&
      Array.isArray(project.categories) &&
      project.categories.length > 0
  );

  const projectsWithCategoryString = projects.filter(
    (project) =>
      "category" in project && typeof (project as any).category === "string"
  );

  const projectsWithoutCategories = projects.filter(
    (project) =>
      (!("categories" in project) ||
        !Array.isArray(project.categories) ||
        project.categories.length === 0) &&
      (!("category" in project) ||
        typeof (project as any).category !== "string")
  );

  return (
    <div
      className={`bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg ${className}`}
    >
      <div className="p-3">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center justify-between w-full text-left text-sm font-medium text-yellow-800 dark:text-yellow-200"
        >
          <span>
            🐛 Categories Debug ({categories.length} categories,{" "}
            {projects.length} projects)
          </span>
          <span className="text-lg">{isVisible ? "−" : "+"}</span>
        </button>

        {isVisible && (
          <div className="mt-3 space-y-4 text-xs">
            {/* Categories Summary */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded border">
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                📊 Categories ({categories.length})
              </h4>
              {categories.length > 0 ? (
                <div className="space-y-1">
                  {categories.map((cat, i) => (
                    <div key={i} className="text-xs">
                      <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">
                        {cat.id}
                      </span>
                      <span className="mx-2">{cat.label}</span>
                      {cat.count && (
                        <span className="text-gray-500">({cat.count})</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600 dark:text-red-400">
                  No categories found!
                </p>
              )}
            </div>

            {/* Projects Summary */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded border">
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                📁 Projects Analysis
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                  <div className="font-bold text-green-700 dark:text-green-300">
                    {projectsWithCategories.length}
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    With Arrays
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  <div className="font-bold text-blue-700 dark:text-blue-300">
                    {projectsWithCategoryString.length}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">
                    With Strings
                  </div>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                  <div className="font-bold text-red-700 dark:text-red-300">
                    {projectsWithoutCategories.length}
                  </div>
                  <div className="text-red-600 dark:text-red-400">
                    No Categories
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Projects */}
            <div className="bg-white dark:bg-gray-800 p-3 rounded border">
              <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                🔍 Sample Projects (first 3)
              </h4>
              {projects.slice(0, 3).map((project, i) => (
                <div
                  key={i}
                  className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <div className="font-medium">{project.title}</div>
                  <div className="mt-1 space-y-1">
                    {/* Check for categories array */}
                    {"categories" in project &&
                    Array.isArray(project.categories) ? (
                      <div>
                        <span className="text-green-600 dark:text-green-400">
                          ✅ Categories Array:
                        </span>
                        <span className="ml-2">
                          {project.categories.length} items
                        </span>
                        {project.categories.length > 0 && (
                          <div className="ml-4 text-xs text-gray-600 dark:text-gray-300">
                            {project.categories.map((cat, ci) => (
                              <div key={ci}>
                                •{" "}
                                {typeof cat === "string"
                                  ? cat
                                  : `${cat.title} (${cat.slug?.current || "no-slug"})`}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="text-red-600 dark:text-red-400">
                          ❌ No Categories Array
                        </span>
                      </div>
                    )}

                    {/* Check for category string */}
                    {"category" in project &&
                    typeof (project as any).category === "string" ? (
                      <div>
                        <span className="text-blue-600 dark:text-blue-400">
                          📝 Category String:
                        </span>
                        <span className="ml-2 font-mono">
                          {(project as any).category}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-gray-500">
                          🚫 No Category String
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Raw Data (collapsed by default) */}
            <details className="bg-white dark:bg-gray-800 p-3 rounded border">
              <summary className="font-semibold cursor-pointer text-gray-700 dark:text-gray-300">
                🔧 Raw Data (click to expand)
              </summary>
              <div className="mt-2 space-y-2">
                <div>
                  <h5 className="font-medium">Categories:</h5>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(categories, null, 2)}
                  </pre>
                </div>
                <div>
                  <h5 className="font-medium">First Project:</h5>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(projects[0], null, 2)}
                  </pre>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
