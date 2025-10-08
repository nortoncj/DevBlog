import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN, // Only needed for mutations
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

  // Get featured posts (you can add a featured field to your schema)
  featuredPosts: `
    *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...4] {
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

// Utility functions for data fetching
export async function getPosts() {
  try {
    return await client.fetch(queries.posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getFeaturedPosts() {
  try {
    return await client.fetch(queries.featuredPosts);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await client.fetch(queries.postBySlug, { slug });
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function getProjects() {
  try {
    return await client.fetch(queries.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    return await client.fetch(queries.projectById, { id });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    return await client.fetch(queries.categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getTags() {
  try {
    return await client.fetch(queries.tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

// Helper function to convert Sanity date to readable format
export function formatSanityDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to calculate reading time from Sanity block content
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

// Helper function to get image dimensions for optimization
export function getImageDimensions(image: any) {
  if (!image?.asset?._ref) return { width: 800, height: 600 };

  // Extract dimensions from Sanity image reference
  const ref = image.asset._ref;
  const dimensions = ref.split("-")[2];
  if (dimensions) {
    const [width, height] = dimensions.split("x").map(Number);
    return { width, height };
  }

  return { width: 800, height: 600 };
}

// Environment variable validation
export function validateSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  // console.log("🔍 Sanity validation check:");
  // console.log("  PROJECT_ID value:", projectId ? `"${projectId}"` : "MISSING");
  // console.log("  DATASET value:", dataset ? `"${dataset}"` : "MISSING");
  // console.log("  PROJECT_ID length:", projectId?.length || 0);
  // console.log("  DATASET length:", dataset?.length || 0);

  if (!projectId || projectId.trim() === "") {
    console.warn("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing or empty");
    return false;
  }

  if (!dataset || dataset.trim() === "") {
    console.warn("❌ NEXT_PUBLIC_SANITY_DATASET is missing or empty");
    return false;
  }

  console.log("✅  configuration is valid");
  return true;
}
