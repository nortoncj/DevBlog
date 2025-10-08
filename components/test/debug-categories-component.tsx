"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/sanity";

export function SanityDataTest() {
  const [rawData, setRawData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSanityFetch() {
      try {
        console.log("🧪 Testing direct Sanity fetch...");
        const projects = await getProjects();
        console.log("✅ Raw Sanity projects:", projects);
        setRawData(projects);
      } catch (err) {
        console.error("❌ Sanity fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    testSanityFetch();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
      <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
        🧪 Direct Sanity Data Test
      </h3>

      {loading && (
        <div className="text-sm text-purple-600 dark:text-purple-300">
          Loading raw Sanity data...
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3 text-xs">
          <div>
            <strong>Projects found:</strong> {rawData.length}
          </div>

          {rawData.slice(0, 2).map((project, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-3 rounded border"
            >
              <div className="font-medium">{project.title}</div>
              <div className="mt-2 space-y-1">
                <div>
                  <strong>Categories:</strong> {project.categories?.length || 0}
                </div>
                {project.categories?.map((cat: any, ci: number) => (
                  <div
                    key={ci}
                    className="ml-4 text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded"
                  >
                    <div>
                      <strong>Title:</strong> {cat.title}
                    </div>
                    <div>
                      <strong>Slug:</strong> {cat.slug?.current}
                    </div>
                    <div>
                      <strong>Color:</strong> {cat.color}
                    </div>
                    <div>
                      <strong>ID:</strong> {cat._id}
                    </div>
                  </div>
                ))}
              </div>

              <details className="mt-2">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                  Show Full Project Data
                </summary>
                <pre className="mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-auto max-h-32">
                  {JSON.stringify(project, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
