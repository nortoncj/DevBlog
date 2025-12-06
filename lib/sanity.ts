/**
 * Sanity Client - Optimized with Webhook Cache
 *
 * Data fetching priority:
 * 1. Webhook cache (instant, 0 API calls)
 * 2. CDN cache (fast, CDN requests)
 * 3. Direct API (fallback, API requests)
 */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  fetchWithCache,
  CACHE_KEYS,
  getCacheStats,
} from "./sanity-webhook-cache";

// Main Sanity client (keeps existing client for compatibility)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Always prefer CDN
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ queries for fetching data
export const queries = {
  // Get all posts with categories and tags
  posts: `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      image,
      video,
      body,
      featured,
      categories[]-> {
        _id,
        title,
        slug
      },
      tags[]-> {
        _id,
        title,
        slug
      }
    }
  `,

  // Get featured posts
  featuredPosts: `
    *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      image,
      video,
      categories[]-> {
        _id,
        title,
        slug
      },
      tags[]-> {
        _id,
        title,
        slug
      }
    }
  `,

  // Get single post by slug
  postBySlug: `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      image,
      video,
      body,
      categories[]-> {
        _id,
        title,
        slug
      },
      tags[]-> {
        _id,
        title,
        slug
      }
    }
  `,

  // Get all projects with categories and tags
  projects: `
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      link,
      github,
      image,
      video,
      description,
      techStack,
      modal,
      featured,
      categories[]-> {
        _id,
        _type,
        title,
        slug,
        color,
        description
      },
      tags[]-> {
        _id,
        _type,
        title,
        slug,
        description
      }
    }
  `,

  // Get single project by ID
  projectById: `
    *[_type == "project" && _id == $id][0] {
      _id,
      title,
      link,
      github,
      image,
      video,
      description,
      techStack,
      modal,
      featured,
      categories[]-> {
        _id,
        _type,
        title,
        slug,
        color,
        description
      },
      tags[]-> {
        _id,
        _type,
        title,
        slug,
        description
      }
    }
  `,

  // Get all categories
  categories: `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }
  `,

  // Get all tags
  tags: `
    *[_type == "tag"] | order(title asc) {
      _id,
      title,
      slug
    }
  `,
};

export const revalidate = 14400; // 4 hours

// ============================================================================
// OPTIMIZED DATA FETCHING WITH WEBHOOK CACHE
// ============================================================================

/**
 * Get all posts
 * Priority: Webhook cache > CDN > API
 */
export async function getPosts() {
  try {
    const { data, source } = await fetchWithCache<any[]>(
      CACHE_KEYS.POSTS,
      queries.posts
    );

    console.log(`📚 [getPosts] Fetched ${data.length} posts from ${source}`);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Get featured posts
 * Priority: Webhook cache > CDN > API
 */
export async function getFeaturedPosts() {
  try {
    const { data, source } = await fetchWithCache<any[]>(
      CACHE_KEYS.FEATURED_POSTS,
      queries.featuredPosts
    );

    console.log(
      `⭐ [getFeaturedPosts] Fetched ${data.length} posts from ${source}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

/**
 * Get post by slug
 * Priority: Webhook cache > CDN > API
 */
export async function getPostBySlug(slug: string) {
  try {
    const { data, source } = await fetchWithCache<any>(
      CACHE_KEYS.POST_BY_SLUG(slug),
      queries.postBySlug,
      { slug }
    );

    console.log(`📄 [getPostBySlug] Fetched post "${slug}" from ${source}`);
    return data;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Get all projects
 * Priority: Webhook cache > CDN > API
 */
export async function getProjects() {
  try {
    const { data, source } = await fetchWithCache<any[]>(
      CACHE_KEYS.PROJECTS,
      queries.projects
    );

    console.log(
      `🚀 [getProjects] Fetched ${data.length} projects from ${source}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Get project by ID
 * Priority: Webhook cache > CDN > API
 */
export async function getProjectById(id: string) {
  try {
    const { data, source } = await fetchWithCache<any>(
      CACHE_KEYS.PROJECT_BY_ID(id),
      queries.projectById,
      { id }
    );

    console.log(`🎯 [getProjectById] Fetched project "${id}" from ${source}`);
    return data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

/**
 * Get categories
 * Uses CDN client directly (less frequently updated)
 */
export async function getCategories() {
  try {
    const { data, source } = await fetchWithCache<any[]>(
      CACHE_KEYS.CATEGORIES,
      queries.categories
    );

    console.log(
      `🏷️  [getCategories] Fetched ${data.length} categories from ${source}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get tags
 * Uses CDN client directly (less frequently updated)
 */
export async function getTags() {
  try {
    const { data, source } = await fetchWithCache<any[]>(
      CACHE_KEYS.TAGS,
      queries.tags
    );

    console.log(`🔖 [getTags] Fetched ${data.length} tags from ${source}`);
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

// ============================================================================
// HELPER FUNCTIONS (Keep existing)
// ============================================================================

/**
 * Format Sanity date to readable format
 */
export function formatSanityDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculate reading time from Sanity block content
 */
export function calculateReadingTimeFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "5 min read";

  const text = blocks
    .filter((block) => block._type === "block")
    .map(
      (block) =>
        block.children
          ?.filter((child: any) => child._type === "span")
          ?.map((span: any) => span.text)
          ?.join("") || ""
    )
    .join(" ");

  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

/**
 * Get image dimensions from Sanity image reference
 */
export function getImageDimensions(image: any) {
  if (!image?.asset?._ref) return { width: 800, height: 600 };

  const ref = image.asset._ref;
  const dimensions = ref.split("-")[2];
  if (dimensions) {
    const [width, height] = dimensions.split("x").map(Number);
    return { width, height };
  }

  return { width: 800, height: 600 };
}

/**
 * Validate Sanity configuration
 */
export function validateSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || projectId.trim() === "") {
    console.warn("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing or empty");
    return false;
  }

  if (!dataset || dataset.trim() === "") {
    console.warn("❌ NEXT_PUBLIC_SANITY_DATASET is missing or empty");
    return false;
  }

  console.log("✅ Sanity configuration is valid");
  return true;
}

// ============================================================================
// MONITORING & DEBUGGING
// ============================================================================

/**
 * Get cache statistics for monitoring
 */
export function logCacheStats() {
  const stats = getCacheStats();
  console.log("📊 [Cache Stats]:", {
    totalCached: stats.size,
    keys: stats.keys,
    entries: stats.entries.map((e) => ({
      key: e.key,
      source: e.source,
      age: `${Math.round(e.age / 1000)}s`,
    })),
  });
  return stats;
}

/**
 * Test webhook cache system
 */
export async function testCacheSystem() {
  console.log("🧪 [Test] Testing cache system...");

  // Test posts
  const posts1 = await getPosts();
  const posts2 = await getPosts();

  console.log("🧪 [Test] First call:", posts1.length, "posts");
  console.log(
    "🧪 [Test] Second call:",
    posts2.length,
    "posts (should be cached)"
  );

  // Show stats
  logCacheStats();

  return {
    posts: posts1.length,
    cached: posts1 === posts2,
  };
}
