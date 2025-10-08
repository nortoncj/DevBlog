/**
 * Test utility to verify category extraction functionality
 * This can be used in development to test the category extraction logic
 */

import { getUniqueCategoriesFromProjects } from "@/lib/sanity-transform";

// Mock Sanity project data for testing
export const mockSanityProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A scalable web application",
    categories: [
      {
        _id: "cat-1",
        _type: "category",
        title: "Web Applications",
        slug: { current: "web-applications" },
      },
      {
        _id: "cat-2",
        _type: "category",
        title: "E-commerce",
        slug: { current: "e-commerce" },
      },
    ],
    tags: [],
    technologies: ["React", "Node.js"],
    featured: true,
  },
  {
    id: "2",
    title: "Data Analytics Dashboard",
    description: "Real-time business intelligence",
    categories: [
      {
        _id: "cat-3",
        _type: "category",
        title: "Data Systems",
        slug: { current: "data-systems" },
      },
    ],
    tags: [],
    technologies: ["Python", "PostgreSQL"],
    featured: false,
  },
  {
    id: "3",
    title: "Process Automation Tool",
    description: "Workflow automation system",
    categories: [
      {
        _id: "cat-4",
        _type: "category",
        title: "Automation",
        slug: { current: "automation" },
      },
    ],
    tags: [],
    technologies: ["Python", "Zapier"],
    featured: true,
  },
];

// Mock static project data for testing
export const mockStaticProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal portfolio site",
    category: "web-development",
    technologies: ["Next.js", "TailwindCSS"],
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "API Integration Service",
    description: "Third-party service integration",
    category: "integrations",
    technologies: ["Node.js", "Express"],
    featured: false,
    liveUrl: "https://api.example.com",
    githubUrl: "https://github.com/api-example",
  },
];

/**
 * Test the category extraction with mock Sanity data
 */
export function testSanityCategoryExtraction() {
  console.log("🧪 Testing Sanity category extraction...");
  const categories = getUniqueCategoriesFromProjects(mockSanityProjects);

  console.log(
    "📊 Expected categories: Web Applications, E-commerce, Data Systems, Automation"
  );
  console.log("✅ Extracted categories:", categories);

  return categories;
}

/**
 * Test the category extraction with mock static data
 */
export function testStaticCategoryExtraction() {
  console.log("🧪 Testing static category extraction...");

  // Transform static projects to have categories arrays like Sanity projects
  const transformedProjects = mockStaticProjects.map((project) => ({
    ...project,
    categories: [
      {
        _id: `static-${project.category}`,
        _type: "category",
        title:
          project.category.charAt(0).toUpperCase() +
          project.category.slice(1).replace(/-/g, " "),
        slug: { current: project.category },
      },
    ],
  }));

  const categories = getUniqueCategoriesFromProjects(transformedProjects);

  console.log("📊 Expected categories: Web Development, Integrations");
  console.log("✅ Extracted categories:", categories);

  return categories;
}

/**
 * Test mixed project types
 */
export function testMixedCategoryExtraction() {
  console.log("🧪 Testing mixed category extraction...");

  const mixedProjects = [
    ...mockSanityProjects,
    ...mockStaticProjects.map((project) => ({
      ...project,
      categories: [
        {
          _id: `static-${project.category}`,
          _type: "category",
          title:
            project.category.charAt(0).toUpperCase() +
            project.category.slice(1).replace(/-/g, " "),
          slug: { current: project.category },
        },
      ],
    })),
  ];

  const categories = getUniqueCategoriesFromProjects(mixedProjects);

  console.log("📊 Expected categories: 6 unique categories from both types");
  console.log("✅ Extracted categories:", categories);

  return categories;
}

/**
 * Run all tests
 */
export function runAllCategoryTests() {
  console.log("🚀 Running all category extraction tests...\n");

  const sanityResults = testSanityCategoryExtraction();
  console.log("\n" + "=".repeat(50) + "\n");

  const staticResults = testStaticCategoryExtraction();
  console.log("\n" + "=".repeat(50) + "\n");

  const mixedResults = testMixedCategoryExtraction();
  console.log("\n" + "=".repeat(50) + "\n");

  console.log("📈 Test Summary:");
  console.log(`- Sanity extraction: ${sanityResults.length} categories`);
  console.log(`- Static extraction: ${staticResults.length} categories`);
  console.log(`- Mixed extraction: ${mixedResults.length} categories`);

  return {
    sanity: sanityResults,
    static: staticResults,
    mixed: mixedResults,
  };
}

// For browser console testing
if (typeof window !== "undefined") {
  (window as any).testCategories = runAllCategoryTests;
}
