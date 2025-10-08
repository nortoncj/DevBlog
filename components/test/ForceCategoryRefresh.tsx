"use client";

import { useState } from "react";
import { getProjectCategories } from "@/data/sanity-data";

export function ForceCategoryRefresh({
  onCategoriesUpdate,
}: {
  onCategoriesUpdate?: (categories: any[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const handleRefresh = async () => {
    setLoading(true);
    try {
      console.log("🔄 Force refreshing categories...");
      const freshCategories = await getProjectCategories();
      console.log("✅ Fresh categories loaded:", freshCategories);
      setLastUpdate(new Date().toLocaleTimeString());

      if (onCategoriesUpdate) {
        onCategoriesUpdate(freshCategories);
      }
    } catch (error) {
      console.error("❌ Error refreshing categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
          🔄 Force Category Refresh
        </span>
        <div className="flex items-center gap-2">
          {lastUpdate && (
            <span className="text-xs text-orange-600 dark:text-orange-300">
              Last: {lastUpdate}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Categories"}
          </button>
        </div>
      </div>
    </div>
  );
}
