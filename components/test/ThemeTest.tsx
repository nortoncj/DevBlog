"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggler";

export function ThemeTest() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Theme Test</h2>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSS Variables Test */}
        <div className="card-system">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            CSS Variables (Should Work)
          </h3>
          <div className="space-y-2">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
              }}
            >
              Background Primary + Text Primary
            </div>
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-secondary)",
              }}
            >
              Background Secondary + Text Secondary
            </div>
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
              }}
            >
              Primary Color + Foreground
            </div>
          </div>
        </div>

        {/* Tailwind Classes Test */}
        <div className="bg-bg-primary border border-bg-accent rounded-xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Tailwind Classes (May Need Fix)
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded bg-primary text-primary-foreground">
              Primary Background
            </div>
            <div className="p-3 rounded bg-secondary text-secondary-foreground">
              Secondary Background
            </div>
            <div className="p-3 rounded bg-accent text-accent-foreground">
              Accent Background
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode Specific Classes */}
      <div className="card-system">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Dark Mode Classes Test
        </h3>
        <div className="space-y-2">
          <div className="p-3 rounded bg-bg-primary dark:bg-gray-800 text-text-primary dark:text-white border border-bg-accent dark:border-gray-600">
            This should change in dark mode
          </div>
          <div className="p-3 rounded bg-white dark:bg-gray-900 text-black dark:text-gray-100">
            Explicit dark mode classes
          </div>
        </div>
      </div>
    </div>
  );
}
