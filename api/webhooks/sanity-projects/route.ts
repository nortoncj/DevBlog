/**
 * Sanity Webhook: Projects
 *
 * This webhook is triggered when projects are created, updated, or deleted.
 * It pre-caches all projects data.
 *
 * Setup in Sanity Studio:
 * 1. Go to: sanity.io/manage > Your Project > API > Webhooks
 * 2. Create webhook: https://yourdomain.com/api/webhooks/sanity-projects
 * 3. Filter: _type == "project"
 * 4. Trigger on: Create, Update, Delete
 * 5. Add secret (optional but recommended)
 */

import { NextRequest, NextResponse } from "next/server";
import { cdnClient, warmCache, CACHE_KEYS } from "@/lib/sanity-webhook-cache";
import { queries } from "@/lib/sanity";

// Webhook secret for validation (optional but recommended)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET_PROJECTS;

export async function POST(request: NextRequest) {
  try {
    console.log("🎣 [Webhook] Projects webhook triggered");

    // Validate webhook secret (if configured)
    if (WEBHOOK_SECRET) {
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
      title: payload.title,
    });

    // Fetch fresh data from Sanity CDN
    console.log("🔄 [Webhook] Fetching fresh projects data...");

    const projects = await cdnClient.fetch(queries.projects);

    console.log("✅ [Webhook] Fetched projects:", projects?.length || 0);

    // Warm the cache with fresh data
    warmCache(CACHE_KEYS.PROJECTS, projects);

    // If this is a specific project update, cache that too
    if (payload._id) {
      try {
        const project = await cdnClient.fetch(queries.projectById, {
          id: payload._id,
        });
        if (project) {
          warmCache(CACHE_KEYS.PROJECT_BY_ID(payload._id), project);
          console.log(`✅ [Webhook] Cached project: ${payload._id}`);
        }
      } catch (error) {
        console.warn(
          "⚠️  [Webhook] Failed to cache individual project:",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cache updated",
      cached: {
        projects: projects?.length || 0,
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
    webhook: "sanity-projects",
    timestamp: new Date().toISOString(),
  });
}
