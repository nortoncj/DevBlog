/**
 * Sanity Webhook Cache System
 *
 * This system uses 2 webhooks to cache the most frequently requested data:
 * 1. Blog Posts Webhook - Caches all posts + featured posts
 * 2. Projects Webhook - Caches all projects
 *
 * Data Priority:
 * 1. Webhook Cache (instant, 0 API calls)
 * 2. CDN Cache (fast, CDN requests)
 * 3. Direct API (fallback, API requests)
 */

import { createClient } from "@sanity/client";

// Webhook cache storage (in-memory for development, use Redis/KV for production)
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  source: "webhook" | "cdn" | "api";
}

class WebhookCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private maxAge = 24 * 60 * 60 * 1000; // 24 hours (webhooks refresh this)

  set<T>(key: string, data: T, source: "webhook" | "cdn" | "api" = "webhook") {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      source,
    });

    console.log(`📦 [Cache] Set "${key}" from ${source}`);
  }

  get<T>(key: string): { data: T; source: string } | null {
    const entry = this.cache.get(key);

    if (!entry) {
      console.log(`❌ [Cache] Miss for "${key}"`);
      return null;
    }

    // Check if cache is stale (only for non-webhook sources)
    if (
      entry.source !== "webhook" &&
      Date.now() - entry.timestamp > this.maxAge
    ) {
      console.log(`⏰ [Cache] Stale for "${key}"`);
      this.cache.delete(key);
      return null;
    }

    console.log(`✅ [Cache] Hit for "${key}" (source: ${entry.source})`);
    return { data: entry.data as T, source: entry.source };
  }

  clear(key?: string) {
    if (key) {
      this.cache.delete(key);
      console.log(`🗑️  [Cache] Cleared "${key}"`);
    } else {
      this.cache.clear();
      console.log(`🗑️  [Cache] Cleared all`);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        source: entry.source,
        age: Date.now() - entry.timestamp,
      })),
    };
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
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Always use CDN
  perspective: "published",
});

// Sanity client without CDN (for real-time data)
export const apiClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Direct API
  perspective: "published",
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Fetch with 3-tier priority:
 * 1. Webhook cache (instant)
 * 2. CDN (fast)
 * 3. API (fallback)
 */
/**
 * Fetch with 3-tier priority:
 * 1. Webhook cache (instant)
 * 2. CDN (fast)
 * 3. API (fallback)
 */
export async function fetchWithCache<T>(
  cacheKey: string,
  query: string,
  params?: Record<string, unknown>
): Promise<{ data: T; source: 'webhook' | 'cdn' | 'api' }> {
  // Priority 1: Check webhook cache
  const cached = webhookCache.get<T>(cacheKey);
  if (cached) {
    return { data: cached.data, source: cached.source as 'webhook' | 'cdn' | 'api' };
  }

  try {
    // Priority 2: Try CDN (fast, lower cost)
    console.log(`🌐 [Fetch] Trying CDN for "${cacheKey}"`);
    const data = params 
      ? await cdnClient.fetch<T>(query, params)
      : await cdnClient.fetch<T>(query);
    
    // Cache for future use
    webhookCache.set(cacheKey, data, 'cdn');
    
    return { data, source: 'cdn' };
  } catch (cdnError) {
    console.warn(`⚠️  [Fetch] CDN failed for "${cacheKey}", trying API:`, cdnError);
    
    try {
      // Priority 3: Fallback to direct API
      console.log(`🔌 [Fetch] Trying API for "${cacheKey}"`);
      const data = params
        ? await apiClient.fetch<T>(query, params)
        : await apiClient.fetch<T>(query);
      
      // Cache for future use
      webhookCache.set(cacheKey, data, 'api');
      
      return { data, source: 'api' };
    } catch (apiError) {
      console.error(`❌ [Fetch] API failed for "${cacheKey}":`, apiError);
      throw apiError;
    }
  }
}

/**
 * Pre-warm cache with webhook data
 * Call this from your webhook endpoints
 */
export function warmCache(key: string, data: any) {
  webhookCache.set(key, data, "webhook");
  console.log(
    `🔥 [Webhook] Cache warmed for "${key}" with ${Array.isArray(data) ? data.length : 1} items`
  );
}

/**
 * Invalidate specific cache keys
 * Call this when you know data has changed
 */
export function invalidateCache(keys: string | string[]) {
  const keyArray = Array.isArray(keys) ? keys : [keys];
  keyArray.forEach((key) => webhookCache.clear(key));
  console.log(`🔄 [Cache] Invalidated ${keyArray.length} keys`);
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats() {
  return webhookCache.getStats();
}
