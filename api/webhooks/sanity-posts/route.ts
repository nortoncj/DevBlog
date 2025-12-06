/**
 * Sanity Webhook: Blog Posts
 *
 * This webhook is triggered when blog posts are created, updated, or deleted.
 * It pre-caches all posts and featured posts data.
 *
 * Setup in Sanity Studio:
 * 1. Go to: sanity.io/manage > Your Project > API > Webhooks
 * 2. Create webhook: https://yourdomain.com/api/webhooks/sanity-posts
 * 3. Filter: _type == "post"
 * 4. Trigger on: Create, Update, Delete
 * 5. Add secret (optional but recommended)
 */

import { NextRequest, NextResponse } from "next/server";
import { cdnClient, warmCache, CACHE_KEYS } from "@/lib/sanity-webhook-cache";
import { queries } from "@/lib/sanity";

// Webhook secret for validation (optional but recommended)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET_POSTS;

export async function POST(request: NextRequest) {
  try {
    console.log("🎣 [Webhook] Blog Posts webhook triggered");

    // Validate webhook secret (if configured)
    if (WEBHOOK_SECRET) {
      const signature = request.headers.get("sanity-webhook-signature");
      // TODO: Implement proper signature validation
      // For now, just check if secret matches a header
      const providedSecret = request.headers.get("x-sanity-webhook-secret");
      if (providedSecret !== WEBHOOK_SECRET) {
        console.error("❌ [Webhook] Invalid secret");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Parse webhook payload
    const payload = await request.json();
    console.log("📦 [Webhook] Payload:", {
      type: payload._type,
      id: payload._id,
      operation: payload._type === "post" ? "data-change" : "unknown",
    });

    // Fetch fresh data from Sanity CDN
    console.log("🔄 [Webhook] Fetching fresh posts data...");

    const [posts, featuredPosts] = await Promise.all([
      cdnClient.fetch(queries.posts),
      cdnClient.fetch(queries.featuredPosts),
    ]);

    console.log("✅ [Webhook] Fetched posts:", posts?.length || 0);
    console.log("✅ [Webhook] Fetched featured:", featuredPosts?.length || 0);

    // Warm the cache with fresh data
    warmCache(CACHE_KEYS.POSTS, posts);
    warmCache(CACHE_KEYS.FEATURED_POSTS, featuredPosts);

    // If this is a specific post update, cache that too
    if (payload.slug?.current) {
      try {
        const post = await cdnClient.fetch(queries.postBySlug, {
          slug: payload.slug.current,
        });
        if (post) {
          warmCache(CACHE_KEYS.POST_BY_SLUG(payload.slug.current), post);
          console.log(`✅ [Webhook] Cached post: ${payload.slug.current}`);
        }
      } catch (error) {
        console.warn("⚠️  [Webhook] Failed to cache individual post:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cache updated",
      cached: {
        posts: posts?.length || 0,
        featured: featuredPosts?.length || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ [Webhook] Error:", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ready",
    webhook: "sanity-posts",
    timestamp: new Date().toISOString(),
  });
}
