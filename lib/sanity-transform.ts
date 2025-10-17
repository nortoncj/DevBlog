/**
 * Sanity Data Transformation Utilities
 * Transform Sanity CMS data to frontend-compatible formats
 */

import { SanityPost, SanityProject, BlogPost, Project } from "@/types/sanity";
import {
  calculateReadingTimeFromBlocks,
  formatSanityDate,
  urlFor,
} from "./sanity";

// ================================
// Post Transformations
// ================================

/**
 * Transform Sanity post to frontend BlogPost format
 */
export function transformSanityPost(sanityPost: SanityPost): BlogPost {
  return {
    id: sanityPost._id,
    title: sanityPost.title,
    slug: sanityPost.slug?.current || "",
    publishedAt: sanityPost.publishedAt,
    excerpt: sanityPost.excerpt,
    image: sanityPost.image,
    video: sanityPost.video,
    content: sanityPost.body,
    categories: sanityPost.categories || [],
    tags: sanityPost.tags || [],
    readTime: calculateReadingTimeFromBlocks(sanityPost.body || []),
    featured: sanityPost.featured, // You can add this field to your Sanity schema
    author: {
      name: "Chris Norton",
      bio: "Engineer specializing in scalable solutions",
    },
  };
}

/**
 * Transform multiple Sanity posts
 */
export function transformSanityPosts(sanityPosts: SanityPost[]): BlogPost[] {
  return sanityPosts.map(transformSanityPost);
}

/**
 * Get blog post category name for display
 */
export function getBlogCategoryName(categories: any[]): string {
  if (!categories || categories.length === 0) return "General";

  // Map common categories to display names
  const categoryMap: Record<string, string> = {
    "system-design": "System Design",
    automation: "Automation",
    strategy: "Strategy",
    development: "Development",
    "data-engineering": "Data Engineering",
    "technical-leadership": "Technical Leadership",
  };

  const firstCategory = categories[0];
  const slug =
    firstCategory?.slug?.current ||
    firstCategory?.title?.toLowerCase().replace(/\s+/g, "-");

  return categoryMap[slug] || firstCategory?.title || "General";
}

// ================================
// Project Transformations
// ================================

/**
 * Transform Sanity project to frontend Project format
 */
export function transformSanityProject(sanityProject: any): Project {
  // console.log('🔄 Transforming Sanity project:', sanityProject.title);
  // console.log('  📋 Raw categories:', sanityProject.categories);
  // console.log('  📏 Categories count:', sanityProject.categories?.length);
  
  const transformed = {
    id: sanityProject._id,
    title: sanityProject.title,
    description: extractTextFromPortableText(sanityProject.description),
    image: sanityProject.image,
    video: sanityProject.video,
    technologies: sanityProject.techStack || [],
    liveUrl: sanityProject.link,
    githubUrl: sanityProject.github,
    categories: sanityProject.categories || [],
    tags: sanityProject.tags || [],
    featured: sanityProject.featured || false,
    modal: sanityProject.modal,
    content: sanityProject.description
  };
  
  // console.log('  ✅ Transformed categories:', transformed.categories);
  return transformed;
}

/**
 * Transform multiple Sanity projects
 */
export function transformSanityProjects(
  sanityProjects: SanityProject[]
): Project[] {
  return sanityProjects.map(transformSanityProject);
}

/**
 * Get project category for filtering
 */
export function getProjectCategory(categories: any[]): string {
  if (!categories || categories.length === 0) return "web-apps";

  // Map Sanity categories to frontend filter categories
  const categoryMap: Record<string, string> = {
    automation: "automation",
    "web-application": "web-apps",
    "web-app": "web-apps",
    "data-system": "data",
    "data-engineering": "data",
    api: "integrations",
    integration: "integrations",
  };

  const firstCategory = categories[0];
  const slug =
    firstCategory?.slug?.current ||
    firstCategory?.title?.toLowerCase().replace(/\s+/g, "-");

  return categoryMap[slug] || "web-apps";
}

// ================================
// Content Extraction Utilities
// ================================

/**
 * Extract plain text from Sanity Portable Text
 */
export function extractTextFromPortableText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  return blocks
    .filter((block) => block._type === "block")
    .map(
      (block) =>
        block.children
          ?.filter((child: any) => child._type === "span")
          ?.map((span: any) => span.text)
          ?.join("") || ""
    )
    .join(" ")
    .trim();
}

/**
 * Extract excerpt from Sanity Portable Text
 */
export function extractExcerptFromPortableText(
  blocks: any[],
  maxLength: number = 160
): string {
  const text = extractTextFromPortableText(blocks);
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

/**
 * Get first image from Portable Text content
 */
export function getFirstImageFromPortableText(blocks: any[]): any | null {
  if (!blocks || !Array.isArray(blocks)) return null;

  const imageBlock = blocks.find((block) => block._type === "image");
  return imageBlock || null;
}

// ================================
// URL and Image Utilities
// ================================

/**
 * Get optimized image URL from Sanity image
 */
export function getOptimizedImageUrl(
  image: any,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "png" | "jpg";
  } = {}
): string {
  if (!image) return "";

  const { width = 800, height, quality = 80, format = "auto" } = options;

  let builder = urlFor(image).width(width).quality(quality);

  // Only apply format if it's not 'auto' (let Sanity decide)
  if (format && format !== "auto") {
    builder = builder.format(format as any);
  }

  if (height) {
    builder = builder.height(height).fit("crop");
  }

  return builder.url();
}
/**
 * Generate responsive image srcSet from Sanity image
 */
export function generateImageSrcSet(
  image: any,
  sizes: number[] = [400, 800, 1200]
): string {
  if (!image) return "";

  return sizes
    .map((size) => `${getOptimizedImageUrl(image, { width: size })} ${size}w`)
    .join(", ");
}

// ================================
// Filtering and Search Utilities
// ================================

/**
 * Filter posts by category
 */
export function filterPostsByCategory(
  posts: BlogPost[],
  categorySlug: string
): BlogPost[] {
  if (!categorySlug || categorySlug === "all") return posts;

  return posts.filter((post) =>
    post.categories.some((cat) => cat.slug?.current === categorySlug)
  );
}

/**
 * Filter projects by category
 */
export function filterProjectsByCategory(
  projects: Project[],
  categorySlug: string
): Project[] {
  if (!categorySlug || categorySlug === "all") return projects;

  return projects.filter((project) =>
    project.categories.some((cat) => cat.slug?.current === categorySlug)
  );
}

/**
 * Search posts by title and content
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return posts;

  const searchTerm = query.toLowerCase().trim();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.title.toLowerCase().includes(searchTerm)) ||
      post.categories.some((cat) =>
        cat.title.toLowerCase().includes(searchTerm)
      )
  );
}

/**
 * Get unique categories from posts
 */
export function getUniqueCategoriesFromPosts(posts: BlogPost[]) {
  const categoryMap = new Map();

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!categoryMap.has(category._id)) {
        categoryMap.set(category._id, {
          id: category._id,
          title: category.title,
          slug: category.slug?.current || "",
          count: 1,
        });
      } else {
        categoryMap.get(category._id).count++;
      }
    });
  });

  return Array.from(categoryMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

/**
 * Get unique categories from projects with enhanced debugging and error handling
 */

export function getUniqueCategoriesFromProjects(projects: any[]) {
  // console.log('🏷️ === CATEGORY EXTRACTION START ===');
  // console.log('📊 Input projects count:', projects.length);
  
  if (!projects || projects.length === 0) {
    console.log('❌ No projects provided to extract categories from');
    return [];
  }

  const categoryMap = new Map();
  let processedCount = 0;
  let skippedCount = 0;
  let categoriesFound = 0;
  
  projects.forEach((project, index) => {
    // console.log(`\n📁 === PROJECT ${index + 1}/${projects.length} ===`);
    // console.log(`📝 Title: "${project.title}"`);
    // console.log(`🔍 Raw categories:`, project.categories);
    // console.log(`📋 Categories type: ${typeof project.categories}`);
    // console.log(`🔢 Is array: ${Array.isArray(project.categories)}`);
    // console.log(`📏 Length: ${Array.isArray(project.categories) ? project.categories.length : 'N/A'}`);
    
    // Enhanced validation
    if (!project.categories) {
      console.log('  ❌ Categories is null/undefined');
      skippedCount++;
      return;
    }
    
    if (!Array.isArray(project.categories)) {
      console.log('  ❌ Categories is not an array:', typeof project.categories);
      skippedCount++;
      return;
    }

    if (project.categories.length === 0) {
      console.log('  ⚠️ Categories array is empty');
      skippedCount++;
      return;
    }

    // console.log(`  ✅ Valid categories array with ${project.categories.length} items`);
    processedCount++;
   

    project.categories.forEach((category:any, catIndex:any) => {
      // console.log(`\n  🏷️ === CATEGORY ${catIndex + 1}/${project.categories.length} ===`);
      // console.log(`  🔍 Raw category:`, category);
      // console.log(`  📋 Category type: ${typeof category}`);
      
      let categoryId: string;
      let categoryTitle: string;
      let categorySlug: string;
      
      try {
        if (typeof category === "string") {
          // Simple string category
          categoryId = `string-${category}`;
          categoryTitle = category;
          categorySlug = category.toLowerCase().replace(/\s+/g, "-");
          console.log(
            `    📝 Processed string category: "${category}" -> ${categorySlug}`
          );
        } else if (category && typeof category === "object") {
          // Object category (Sanity structure)
          categoryId = category._id || category.id || `obj-${category.title}`;
          categoryTitle = category.title || category.name || "Untitled";

          // Handle different slug formats
          if (category.slug?.current) {
            categorySlug = category.slug.current;
          } else if (category.slug && typeof category.slug === "string") {
            categorySlug = category.slug;
          } else if (category.title) {
            categorySlug = category.title.toLowerCase().replace(/\s+/g, "-");
          } else {
            categorySlug = `category-${catIndex}`;
          }

          // console.log(`    📦 Processed object category:`);
          // console.log(`       🔑 ID: "${categoryId}"`);
          // console.log(`       📝 Title: "${categoryTitle}"`);
          // console.log(`       🔗 Slug: "${categorySlug}"`);
          // console.log(`       🏗️ Original slug structure:`, category.slug);
          // console.log(`       🎨 Color: "${category.color}"`);
          // console.log(
          //   `       📄 Description: ${category.description ? "Present" : "None"}`
          // );
        } else {
          console.log(
            `    ❌ Invalid category type: ${typeof category}`,
            category
          );
          return;
        }

        // Validate extracted data
        if (!categoryId || !categoryTitle) {
          console.log(
            `    ❌ Invalid extracted data - ID: "${categoryId}", Title: "${categoryTitle}"`
          );
          return;
        }

        // Use slug as the map key to properly group categories (convert to lowercase for consistency)
        const mapKey = categorySlug?.toLowerCase() || categoryId;

        // Add or increment category
        if (!categoryMap.has(mapKey)) {
          const newCategory = {
            id: mapKey, // Use slug as the ID for filtering compatibility
            title: categoryTitle, // Keep original capitalization for display
            slug: categorySlug,
            count: 1,
          };
          categoryMap.set(mapKey, newCategory);
          categoriesFound++;
          // console.log(
          //   `    ✅ NEW category added: "${categoryTitle}" (slug: ${categorySlug}, key: ${mapKey})`
          // );
        } else {
          const existing = categoryMap.get(mapKey)!;
          existing.count++;
          // Update title to the more recent/better formatted version if needed
          if (categoryTitle && categoryTitle.length > existing.title.length) {
            existing.title = categoryTitle;
          }
          // console.log(
          //   `    📈 INCREMENTED count for: "${categoryTitle}" (now: ${existing.count})`
          // );
        }
      } catch (error) {
        console.error(`    💥 Error processing category:`, error);
      }
    });
    
    // console.log(`  📊 Project processed. Categories in this project: ${project.categories.length}`);
  });
  
  const categories = Array.from(categoryMap.values()).sort((a, b) => a.title.localeCompare(b.title));
  
  // console.log('\n🎯 === EXTRACTION RESULTS ===');
  // console.log(`📊 Total projects: ${projects.length}`);
  // console.log(`✅ Processed projects: ${processedCount}`);
  // console.log(`❌ Skipped projects: ${skippedCount}`);
  // console.log(`🏷️ Categories found: ${categoriesFound}`);
  // console.log(`📋 Final unique categories: ${categories.length}`);
  // console.log('🔍 Final categories:', categories.map(c => `"${c.title}" (${c.slug}, count: ${c.count})`).join(', '));
  // console.log('🏁 === CATEGORY EXTRACTION END ===\n');
  
  return categories;
}

// ================================
// Date and Time Utilities
// ================================

/**
 * Format Sanity datetime for display
 */
export function formatDisplayDate(dateString: string): string {
  return formatSanityDate(dateString);
}

/**
 * Get relative time from Sanity datetime
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
}

// ================================
// Validation Utilities
// ================================

/**
 * Validate if Sanity document has required fields
 */
export function validateSanityPost(post: any): post is SanityPost {
  return (
    post &&
    typeof post._id === "string" &&
    typeof post.title === "string" &&
    post.slug?.current &&
    typeof post.publishedAt === "string" &&
    typeof post.excerpt === "string"
  );
}

/**
 * Validate if Sanity project has required fields
 */
export function validateSanityProject(project: any): project is SanityProject {
  return (
    project &&
    typeof project._id === "string" &&
    typeof project.title === "string" &&
    typeof project.link === "string" &&
    project.image &&
    Array.isArray(project.description) &&
    Array.isArray(project.techStack)
  );
}
