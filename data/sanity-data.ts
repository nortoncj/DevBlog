/**
 * Sanity CMS Data Integration
 * Fetch and transform data from Sanity CMS with fallback to static data
 */

import {
  getPosts,
  getFeaturedPosts,
  getProjects,
  getCategories,
  validateSanityConfig,
} from "@/lib/sanity";
import {
  transformSanityPosts,
  transformSanityProjects,
  getUniqueCategoriesFromPosts,
  getUniqueCategoriesFromProjects,
  filterPostsByCategory,
  filterProjectsByCategory,
} from "@/lib/sanity-transform";
import { BlogPost, Project } from "@/types/sanity";

// Fallback to static data if Sanity is not configured
import { blogPosts as staticBlogPostsRaw } from "./blog";
import { BlogPost as StaticBlogPost } from "@/types";

// Transform static blog posts to match Sanity BlogPost structure
const staticBlogPosts: BlogPost[] = staticBlogPostsRaw.map(
  (post: StaticBlogPost) => ({
    id: post.id.toString(),
    title: post.title,
    slug: post.slug,
    publishedAt: post.date,
    excerpt: post.excerpt,
    image: undefined, // Static posts use thumbnail, we'll handle this in the component
    video: undefined,
    content: undefined,
    categories: [],
    tags: [],
    readTime: post.readTime,
    featured: post.featured || false,
    author: post.author,
    // Keep the original thumbnail for compatibility
    thumbnail: (post as any).thumbnail,
  })
);

import { projectsData as staticProjects } from "./projects";

// ================================
// Blog Data Functions
// ================================

/**
 * Get all blog posts from Sanity CMS with fallback
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!validateSanityConfig()) {
    console.warn("Sanity not configured, using static blog data");
    return staticBlogPosts;
  }

  try {
    const sanityPosts = await getPosts();
    return transformSanityPosts(sanityPosts);
  } catch (error) {
    console.error(
      "Failed to fetch posts from Sanity, using static data:",
      error
    );
    return staticBlogPosts;
  }
}

/**
 * Get featured blog posts from Sanity CMS
 */
export async function getFeaturedBlogPosts(
  limit?: number
): Promise<BlogPost[]> {
  if (!validateSanityConfig()) {
    return staticBlogPosts.filter((post) => post.featured).slice(0, limit);
  }

  try {
    const sanityPosts = await getFeaturedPosts();
    const transformed = transformSanityPosts(sanityPosts);
    return limit ? transformed.slice(0, limit) : transformed;
  } catch (error) {
    console.error("Failed to fetch featured posts from Sanity:", error);
    return staticBlogPosts.filter((post) => post.featured).slice(0, limit);
  }
}

/**
 * Get blog posts by category from Sanity CMS
 */
export async function getBlogPostsByCategory(
  category?: string,
  featured?: boolean,
  published: boolean = true
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();

  let filtered = posts;

  if (category && category !== "all") {
    filtered = filterPostsByCategory(filtered, category);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((post) => post.featured === featured);
  }

  return filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get blog categories from Sanity CMS
 */
export async function getBlogCategories() {
  if (!validateSanityConfig()) {
    return [
      {
        id: "all",
        label: "All Insights",
        description: "Complete collection of strategic insights",
        count: staticBlogPosts.length,
      },
      {
        id: "System Design",
        label: "System Design",
        description: "Architecture patterns and scalability strategies",
        count: 2,
      },
      {
        id: "Automation",
        label: "Automation",
        description: "Process automation and workflow optimization",
        count: 1,
      },
      {
        id: "Strategy",
        label: "Strategy",
        description: "Business strategy and technical leadership",
        count: 1,
      },
      {
        id: "Development",
        label: "Development",
        description: "Software development and engineering practices",
        count: 1,
      },
      {
        id: "Data Engineering",
        label: "Data Engineering",
        description: "Data pipeline and analytics architecture",
        count: 1,
      },
    ];
  }

  try {
    const posts = await getBlogPosts();
    const categories = getUniqueCategoriesFromPosts(posts);

    return [
      {
        id: "all",
        label: "All Insights",
        description: "Complete collection",
        count: posts.length,
      },
      ...categories.map((cat) => ({
        id: cat.slug,
        label: cat.title,
        description: `${cat.title} insights and strategies`,
        count: cat.count,
      })),
    ];
  } catch (error) {
    console.error("Failed to fetch blog categories:", error);
    return [];
  }
}

// ================================
// Project Data Functions
// ================================

/**
 * Get all projects from Sanity CMS with fallback
 */
export async function getProjectsData(): Promise<Project[]> {
  if (!validateSanityConfig()) {
    console.warn("Sanity not configured, using static project data");
    return staticProjects;
  }

  try {
    const sanityProjects = await getProjects();
    return transformSanityProjects(sanityProjects);
  } catch (error) {
    console.error(
      "Failed to fetch projects from Sanity, using static data:",
      error
    );
    return staticProjects;
  }
}

/**
 * Get projects by category from Sanity CMS
 */
export async function getProjectsByCategory(
  category?: string,
  featured?: boolean
): Promise<Project[]> {
  const projects = await getProjectsData();

  let filtered = projects;

  if (category && category !== "all") {
    filtered = filterProjectsByCategory(filtered, category);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((project) => project.featured === featured);
  }

  return filtered;
}

/**
 * Get featured projects from Sanity CMS
 */
export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  const projects = await getProjectsData();
  const featured = projects.filter((project) => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get project categories from Sanity CMS
 */
export async function getProjectCategories() {
  if (!validateSanityConfig()) {
    return [
      {
        id: "all",
        label: "All Systems",
        description: "Complete portfolio of strategic solutions",
      },
      {
        id: "automation",
        label: "Process Automation",
        description: "Intelligent systems that work while you sleep",
      },
      {
        id: "web-apps",
        label: "Web Applications",
        description: "Scalable platforms for business growth",
      },
      {
        id: "data",
        label: "Data Systems",
        description: "Analytics and intelligence platforms",
      },
      {
        id: "integrations",
        label: "API Integrations",
        description: "Unified connectivity solutions",
      },
    ];
  }

  try {
    const projects = await getProjectsData();
    const categories = getUniqueCategoriesFromProjects(projects);

    return [
      { id: "all", label: "All Systems", description: "Complete portfolio" },
      ...categories.map((cat) => ({
        id: cat.slug,
        label: cat.title,
        description: `${cat.title} solutions`,
        count: cat.count,
      })),
    ];
  } catch (error) {
    console.error("Failed to fetch project categories:", error);
    return [];
  }
}

/**
 * Get project by ID from Sanity CMS
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjectsData();
  return projects.find((project) => project.id === id) || null;
}

// ================================
// Search and Filter Functions
// ================================

/**
 * Search blog posts
 */
export async function searchBlogPosts(
  query: string,
  limit?: number
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return [];

  const results = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.title.toLowerCase().includes(searchTerm)) ||
      post.categories.some((cat) =>
        cat.title.toLowerCase().includes(searchTerm)
      )
  );

  return limit ? results.slice(0, limit) : results;
}

/**
 * Get related blog posts
 */
export async function getRelatedBlogPosts(
  postId: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const currentPost = posts.find((p) => p.id === postId);

  if (!currentPost) return [];

  const related = posts
    .filter((p) => p.id !== postId)
    .sort((a, b) => {
      // Prioritize same category
      const aSameCategory = a.categories.some((cat) =>
        currentPost.categories.some((currentCat) => currentCat._id === cat._id)
      )
        ? 1
        : 0;
      const bSameCategory = b.categories.some((cat) =>
        currentPost.categories.some((currentCat) => currentCat._id === cat._id)
      )
        ? 1
        : 0;

      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory;
      }

      // Then by shared tags
      const aSharedTags = a.tags.filter((tag) =>
        currentPost.tags.some((currentTag) => currentTag._id === tag._id)
      ).length;
      const bSharedTags = b.tags.filter((tag) =>
        currentPost.tags.some((currentTag) => currentTag._id === tag._id)
      ).length;

      if (aSharedTags !== bSharedTags) {
        return bSharedTags - aSharedTags;
      }

      // Finally by date (newest first)
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });

  return related.slice(0, limit);
}

/**
 * Get related projects
 */
export async function getRelatedProjects(
  projectId: string,
  limit: number = 3
): Promise<Project[]> {
  const projects = await getProjectsData();
  const currentProject = projects.find((p) => p.id === projectId);

  if (!currentProject) return [];

  const related = projects
    .filter((p) => p.id !== projectId)
    .sort((a, b) => {
      // Prioritize same category
      const aSameCategory = a.categories.some((cat) =>
        currentProject.categories.some(
          (currentCat) => currentCat._id === cat._id
        )
      )
        ? 1
        : 0;
      const bSameCategory = b.categories.some((cat) =>
        currentProject.categories.some(
          (currentCat) => currentCat._id === cat._id
        )
      )
        ? 1
        : 0;

      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory;
      }

      // Then by shared technologies
      const aSharedTech = a.technologies.filter((tech) =>
        currentProject.technologies.includes(tech)
      ).length;
      const bSharedTech = b.technologies.filter((tech) =>
        currentProject.technologies.includes(tech)
      ).length;

      return bSharedTech - aSharedTech;
    });

  return related.slice(0, limit);
}

// ================================
// Cache and Performance
// ================================

/**
 * Preload critical data for homepage
 */
export async function preloadHomepageData() {
  const [featuredPosts, projects] = await Promise.all([
    getFeaturedBlogPosts(4),
    getProjectsData(),
  ]);

  return {
    featuredPosts,
    projects: projects.slice(0, 6), // Limit for homepage
  };
}

/**
 * Validate data integrity
 */
export async function validateDataIntegrity(): Promise<{
  postsValid: boolean;
  projectsValid: boolean;
  errors: string[];
}> {
  const errors: string[] = [];
  let postsValid = true;
  let projectsValid = true;

  try {
    const posts = await getBlogPosts();
    if (posts.length === 0) {
      errors.push("No blog posts found");
      postsValid = false;
    }
  } catch (error) {
    errors.push(`Blog posts error: ${error}`);
    postsValid = false;
  }

  try {
    const projects = await getProjectsData();
    if (projects.length === 0) {
      errors.push("No projects found");
      projectsValid = false;
    }
  } catch (error) {
    errors.push(`Projects error: ${error}`);
    projectsValid = false;
  }

  return { postsValid, projectsValid, errors };
}
