/**
 * Sanity Webhook Cache System - OPTIMIZED FOR SERVERLESS
 *
 * Uses Next.js built-in caching with 'unstable_cache' for:
 * - Persistent cache across serverless invocations
 * - Automatic revalidation
 * - Request deduplication
 *
 * Data Priority:
 * 1. Next.js Cache (persistent, fast)
 * 2. CDN (fast, lower cost)
 * 3. Direct API (fallback)
 */

import { createClient } from "@sanity/client";
import { unstable_cache } from 'next/cache';
import { cache as reactCache } from 'react';

// Webhook cache storage - Using Next.js cache for serverless
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  source: "cache" | "cdn" | "api";
}

class WebhookCache {
  // Keep minimal in-memory cache for request deduplication within same request
  private requestCache: Map<string, Promise<any>> = new Map();
  private maxAge = 43200; // 12 hours in seconds (optimized for Sanity free tier)

  // In-memory cache disabled for serverless - using Next.js cache instead
  set<T>(key: string, data: T, source: "cache" | "cdn" | "api" = "cache") {
    // No-op for serverless - Next.js handles caching
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 [Cache] Data fetched for "${key}" from ${source}`);
    }
  }

  get<T>(key: string): { data: T; source: string } | null {
    // Always return null to force Next.js cache lookup
    return null;
  }

  clear(key?: string) {
    // Clear request-level cache
    if (key) {
      this.requestCache.delete(key);
    } else {
      this.requestCache.clear();
    }
  }

  getStats() {
    return {
      size: this.requestCache.size,
      keys: Array.from(this.requestCache.keys()),
      entries: [],
    };
  }
  
  // Request deduplication - prevent multiple identical requests in same render
  async dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existing = this.requestCache.get(key);
    if (existing) {
      return existing as Promise<T>;
    }
    
    const promise = fetcher().finally(() => {
      // Clean up after request completes
      this.requestCache.delete(key);
    });
    
    this.requestCache.set(key, promise);
    return promise;
  }
}

// Singleton cache instance
export const webhookCache = new WebhookCache();

// Cache keys
export const CACHE_KEYS = {
  POSTS: "sanity:posts:all",
  FEATURED_POSTS: "sanity:posts:featured",
  PROJECTS: "sanity:projects:all",
  CATEGORIES: "sanity:categories:all",
  TAGS: "sanity:tags:all",
  POST_BY_SLUG: (slug: string) => `sanity:post:${slug}`,
  PROJECT_BY_ID: (id: string) => `sanity:project:${id}`,
} as const;

// Sanity client with CDN enabled
export const cdnClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Always use CDN
  perspective: "published",
});

// Sanity client without CDN (for real-time data)
export const apiClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Direct API
  perspective: "published",
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Fetch with Next.js cache + request deduplication
 * Optimized for serverless with persistent caching
 */
export async function fetchWithCache<T>(
  cacheKey: string,
  query: string,
  params?: Record<string, unknown>
): Promise<{ data: T; source: 'cache' | 'cdn' | 'api' }> {
  // Use request deduplication to prevent multiple identical requests
  return webhookCache.dedupe(cacheKey, async () => {
    // Use Next.js unstable_cache for persistent caching
    const cachedFetcher = unstable_cache(
      async () => {
        try {
          // Priority 1: Try CDN (fast, lower cost)
          const data = params 
            ? await cdnClient.fetch<T>(query, params)
            : await cdnClient.fetch<T>(query);
          
          return { data, source: 'cdn' as const };
        } catch (cdnError) {
          // Priority 2: Fallback to direct API
          try {
            const data = params
              ? await apiClient.fetch<T>(query, params)
              : await apiClient.fetch<T>(query);
            
            return { data, source: 'api' as const };
          } catch (apiError) {
            console.error(`❌ [Fetch] Failed for "${cacheKey}":`, apiError);
            throw apiError;
          }
        }
      },
      [cacheKey], // Cache key
      {
        revalidate: 43200, // 12 hours (optimized for Sanity free tier)
        tags: [cacheKey], // For cache invalidation
      }
    );
    
    return cachedFetcher();
  });
}

/**
 * Pre-warm cache with webhook data (No-op for serverless)
 * Use Next.js revalidatePath/revalidateTag instead
 */
export function warmCache(key: string, data: any) {
  // No-op for serverless - Next.js handles caching
  console.log(
    `🔥 [Webhook] Data updated for "${key}" - use revalidateTag to refresh`
  );
}

/**
 * Invalidate specific cache keys
 * Use Next.js revalidateTag in production
 */
export function invalidateCache(keys: string | string[]) {
  const keyArray = Array.isArray(keys) ? keys : [keys];
  
  // Clear request-level cache
  keyArray.forEach((key) => webhookCache.clear(key));
  
  console.log(`🔄 [Cache] Invalidated ${keyArray.length} keys`);
  
  // Note: In production, use revalidateTag from server actions/route handlers
  // This function is for client-side cache clearing only
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats() {
  return webhookCache.getStats();
}
