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
import { cache as reactCache } from 'react';
import {
  fetchWithCache,
  CACHE_KEYS,
  getCacheStats,
} from "./sanity-webhook-cache";

// Main Sanity client (keeps existing client for compatibility)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
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
  // Get all posts with categories and tags - OPTIMIZED (removed body for list view)
  posts: `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      image,
      featured,
      categories[]-> {
        _id,
        title,
        slug
      },
      tags[]-> {
        _id,
        title
      }
    }
  `,

  // Get featured posts - OPTIMIZED (removed video, reduced fields)
  featuredPosts: `
    *[_type == "post" && featured == true] | order(publishedAt desc)[0...5] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      image,
      featured,
      categories[]-> {
        _id,
        title
      },
      tags[]-> {
        _id,
        title
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

  // Get all projects with categories and tags - OPTIMIZED (removed video, reduced fields)
  projects: `
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      link,
      github,
      image,
      description,
      techStack,
      modal,
      featured,
      categories[]-> {
        _id,
        title,
        slug
      },
      tags[]-> {
        _id,
        title
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

// Revalidate time for Next.js caching (12 hours = 43200 seconds - optimized for Sanity free tier)
export const revalidate = 43200;

// ============================================================================
// OPTIMIZED DATA FETCHING WITH WEBHOOK CACHE
// ============================================================================

/**
 * Get all posts
 * Priority: Webhook cache > CDN > API
 * Wrapped with React.cache() for request deduplication
 */
export const getPosts = reactCache(async () => {
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
});

/**
 * Get featured posts
 * Priority: Webhook cache > CDN > API
 * Wrapped with React.cache() for request deduplication
 */
export const getFeaturedPosts = reactCache(async () => {
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
});

/**
 * Get post by slug
 * Priority: Webhook cache > CDN > API
 * Note: Cannot use React.cache() directly due to parameters
 */
export async function getPostBySlug(slug: string) {
  try {
    const { data, source } = await fetchWithCache<any>(
      CACHE_KEYS.POST_BY_SLUG(slug),
      queries.postBySlug,
      { slug }
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(`📄 [getPostBySlug] Fetched post "${slug}" from ${source}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Get all projects
 * Priority: Webhook cache > CDN > API
 * Wrapped with React.cache() for request deduplication
 */
export const getProjects = reactCache(async () => {
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
});

/**
 * Get project by ID
 * Priority: Webhook cache > CDN > API
 * Note: Cannot use React.cache() directly due to parameters
 */
export async function getProjectById(id: string) {
  try {
    const { data, source } = await fetchWithCache<any>(
      CACHE_KEYS.PROJECT_BY_ID(id),
      queries.projectById,
      { id }
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 [getProjectById] Fetched project "${id}" from ${source}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

/**
 * Get categories
 * Uses CDN client directly (less frequently updated)
 * Wrapped with React.cache() for request deduplication
 */
export const getCategories = reactCache(async () => {
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
});

/**
 * Get tags
 * Uses CDN client directly (less frequently updated)
 * Wrapped with React.cache() for request deduplication
 */
export const getTags = reactCache(async () => {
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
});

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

  // During build without env vars, use fallback data
  if (!projectId || projectId.trim() === "" || projectId === "placeholder") {
    if (process.env.NODE_ENV === 'development') {
      console.warn("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is missing - using static fallback data");
    }
    return false;
  }

  if (!dataset || dataset.trim() === "") {
    if (process.env.NODE_ENV === 'development') {
      console.warn("⚠️ NEXT_PUBLIC_SANITY_DATASET is missing - using static fallback data");
    }
    return false;
  }

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
