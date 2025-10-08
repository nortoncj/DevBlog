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
import { Project as StaticProject } from "@/types";

// Fallback to static data if Sanity is not configured
import { blogPosts as staticBlogPostsRaw } from "./blog";
import { BlogPost as StaticBlogPost } from "@/types";

// Debugging
import { debugSanityConfiguration } from "@/utils/debug-sanity-config";

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

// Transform static projects to match Sanity Project structure
function transformStaticProjectsToSanity(projects: StaticProject[]): Project[] {
  return projects.map(
    (project): Project => ({
      id: String(project.id),
      title: project.title,
      description: project.description || "No description available",
      image: undefined, // Static projects use thumbnail, handle in component
      video: undefined,
      technologies: project.technologies || [],
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      categories: [
        {
          _id: `cat-${String(project.category)}`,
          _type: "category" as const,
          _createdAt: new Date().toISOString(),
          _updatedAt: new Date().toISOString(),
          _rev: "rev",
          title: String(project.category),
          slug: { _type: "slug" as const, current: String(project.category) },
          description: `${String(project.category)} category`,
        },
      ],
      tags: (project.tags || []).map((tag: any, index: any) => ({
        _id: `tag-${String(project.id)}-${index}`,
        _type: "tag" as const,
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: "rev",
        title: tag,
        slug: {
          _type: "slug" as const,
          current: tag.toLowerCase().replace(/\s+/g, "-"),
        },
        description: `${tag} tag`,
      })),
      featured: project.featured,
      modal: project.modal,
      content: undefined
      
    })
  );
}

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
  // console.log('🚀 === PROJECTS DATA FETCHING START ===');
  // console.log('🔧 Sanity validation result:', validateSanityConfig());
  
  if (!validateSanityConfig()) {
    console.warn("❌ Sanity not configured, using static project data");
    const transformedStatic = transformStaticProjectsToSanity(staticProjects);
    console.log('📋 Returning transformed static projects:', transformedStatic.length);
    return transformedStatic;
  }

  try {
    // console.log('🔄 Attempting to fetch from Sanity CMS...');
    const sanityProjects = await getProjects();
    // console.log('✅ Sanity fetch successful, raw projects:', sanityProjects.length);
    // console.log('🔍 First raw Sanity project sample:', sanityProjects[0]);
    
    const transformed = transformSanityProjects(sanityProjects);
    // console.log('✅ Transformation complete, final projects:', transformed.length);
    // console.log('🔍 First transformed project sample:', transformed[0]);
    // console.log('🏁 === PROJECTS DATA FETCHING END ===');
    
    return transformed;
  } catch (error) {
    console.error(
      "💥 Failed to fetch projects from Sanity, using static data:",
      error
    );
    const fallbackStatic = transformStaticProjectsToSanity(staticProjects);
    console.log('📋 Returning fallback static projects:', fallbackStatic.length);
    return fallbackStatic;
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
  // console.log("🚀 === PROJECT CATEGORIES EXTRACTION START ===");

  // Debug Sanity configuration first
  // const sanityConfigured = debugSanityConfiguration();
  // console.log("🔧 Sanity configured:", sanityConfigured);

  try {
    const projects = await getProjectsData();
    // console.log("📊 Loaded projects count:", projects.length);
    // console.log(
    //   "🔍 Data source check - Sanity configured:",
    //   validateSanityConfig()
    // );

    if (projects.length === 0) {
      console.log("⚠️ No projects found, returning default categories");
      return getDefaultProjectCategories();
    }

    // Check if we're getting real Sanity data or transformed static data
    const firstProject = projects[0];
    const isRealSanityData = firstProject?.categories?.[0]?._id?.length > 20; // Real Sanity IDs are longer
    // console.log("📋 Data type analysis:");
    // console.log("  - First project ID format:", firstProject?.id);
    // console.log(
    //   "  - First category ID format:",
    //   firstProject?.categories?.[0]?._id
    // );
    // console.log("  - Appears to be real Sanity data:", isRealSanityData);
    // Enhanced debugging - analyze all projects
    // console.log("🔍 === ANALYZING PROJECT STRUCTURES ===");
    // projects.forEach((project, index) => {
    //   console.log(`📁 Project ${index + 1}: "${project.title}"`);
    //   console.log(`   🏷️ Has categories: ${"categories" in project}`);
    //   console.log(
    //     `   📋 Categories type: ${typeof (project as any).categories}`
    //   );
    //   console.log(
    //     `   🔢 Categories array: ${Array.isArray((project as any).categories)}`
    //   );
    //   console.log(
    //     `   📏 Categories length: ${Array.isArray((project as any).categories) ? (project as any).categories.length : "N/A"}`
    //   );
    //   console.log(`   🔤 Has category string: ${"category" in project}`);
    //   console.log(`   💾 Raw categories:`, (project as any).categories);

    //   if (index < 2) {
    //     // Show full structure for first 2 projects
    //     console.log(`   🏗️ Full structure:`, JSON.stringify(project, null, 2));
    //   }
    // });

    // Check for projects with category arrays
    const projectsWithArrays = projects.filter(
      (project) =>
        "categories" in project &&
        Array.isArray((project as any).categories) &&
        (project as any).categories.length > 0
    );

    // console.log("📈 Projects with category arrays:", projectsWithArrays.length);

    // Force detailed logging of what we found
    // console.log("🔍 Detailed project analysis:");
    // projects.forEach((project, i) => {
    //   console.log(`  Project ${i + 1}: "${project.title}"`);
    //   console.log(`    Has categories prop: ${"categories" in project}`);
    //   console.log(
    //     `    Categories is array: ${Array.isArray((project as any).categories)}`
    //   );
    //   console.log(
    //     `    Categories length: ${(project as any).categories?.length || 0}`
    //   );
    //   if ((project as any).categories?.length > 0) {
    //     console.log(
    //       `    Category titles: ${(project as any).categories.map((c: any) => c.title).join(", ")}`
    //     );
    //   }
    // });

    if (projectsWithArrays.length > 0) {
      // console.log("✅ Processing projects with category arrays");

      // // Log exactly what we're sending to the extraction function
      // console.log("📋 Sample project categories before extraction:");
      // projectsWithArrays.slice(0, 2).forEach((project, i) => {
      //   console.log(`  Project ${i + 1}: "${project.title}"`);
      //   console.log(`  Categories:`, project.categories);
      //   project.categories?.forEach((cat: any, j: number) => {
      //     console.log(`    Category ${j + 1}:`, {
      //       _id: cat._id,
      //       title: cat.title,
      //       slug: cat.slug?.current,
      //       type: typeof cat.title,
      //     });
      //   });
      // });

      // console.log("🔄 Calling getUniqueCategoriesFromProjects...");
      const extractedCategories = getUniqueCategoriesFromProjects(projects);
      // console.log("🎯 Extracted categories result:", extractedCategories);
      // console.log("📊 Extracted categories count:", extractedCategories.length);

      // Force return extracted categories even if it seems like there are none
      // This will help us see if the issue is in the extraction or later processing
      const formattedCategories = [
        {
          id: "all",
          label: "All",
          description: "Complete portfolio",
          count: projects.length,
        },
        ...extractedCategories.map((cat) => ({
          id: cat.slug || cat.id,
          label: cat.title,
          description: `${cat.title} solutions`,
          count: cat.count,
        })),
      ];

      // console.log("🔄 Formatted categories for return:", formattedCategories);
      // console.log(
      //   "✅ SUCCESS: Returning extracted categories:",
      //   formattedCategories
      // );
      return formattedCategories;
    }

    // Check for static projects with category strings
    const projectsWithStrings = projects.filter(
      (project) =>
        "category" in project && typeof (project as any).category === "string"
    );

    console.log(
      "📝 Projects with category strings:",
      projectsWithStrings.length
    );

    if (projectsWithStrings.length > 0) {
      console.log("✅ Processing static projects with category strings");
      const staticCategories = new Map();

      projects.forEach((project) => {
        const category = (project as any).category || "uncategorized";
        const categoryTitle =
          category.charAt(0).toUpperCase() +
          category.slice(1).replace(/-/g, " ");

        if (!staticCategories.has(category)) {
          staticCategories.set(category, {
            id: category,
            title: categoryTitle,
            slug: category,
            count: 1,
          });
        } else {
          staticCategories.get(category).count++;
        }
      });

      const extractedCategories = Array.from(staticCategories.values());
      console.log("📋 Extracted static categories:", extractedCategories);

      const formattedCategories = [
        {
          id: "all",
          label: "All",
          description: "Complete portfolio",
          count: projects.length,
        },
        ...extractedCategories.map((cat) => ({
          id: cat.slug,
          label: cat.title,
          description: `${cat.title} solutions`,
          count: cat.count,
        })),
      ];

      console.log(
        "✅ SUCCESS: Returning static categories:",
        formattedCategories
      );
      return formattedCategories;
    }

    // If no recognizable category structure found
    console.log("❌ No recognizable category structure found in any projects");
    console.log(
      "🔄 Falling back to intelligent defaults based on project titles/descriptions"
    );

    return createIntelligentDefaultCategories(projects);
  } catch (error) {
    console.error("💥 Failed to fetch project categories:", error);
    return getDefaultProjectCategories();
  }

  console.log("🏁 === PROJECT CATEGORIES EXTRACTION END ===");
}

/**
 * Get default project categories as fallback
 */
function getDefaultProjectCategories() {
  return [
    { id: "all", label: "All", description: "Complete portfolio" },
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

/**
 * Create intelligent default categories based on project analysis
 */
function createIntelligentDefaultCategories(projects: Project[]) {
  console.log('🧠 Creating intelligent categories from project analysis...');
  
  const categories = [
    { id: "all", label: "All ", description: "Complete portfolio", count: projects.length }
  ];
  
  // Analyze project titles and descriptions to create relevant categories
  const keywordMap = {
    automation: ['automation', 'automate', 'workflow', 'process'],
    'web-apps': ['web', 'app', 'application', 'site', 'platform'],
    data: ['data', 'analytics', 'dashboard', 'report', 'intelligence'],
    integrations: ['integration', 'api', 'connect', 'sync', 'webhook']
  };
  
  Object.entries(keywordMap).forEach(([categoryId, keywords]) => {
    const count = projects.filter(project => {
      const searchText = `${project.title} ${project.description}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    }).length;
    
    if (count > 0) {
      const labels = {
        automation: 'Process Automation',
        'web-apps': 'Web Applications', 
        data: 'Data Systems',
        integrations: 'API Integrations'
      };
      
      categories.push({
        id: categoryId,
        label: labels[categoryId as keyof typeof labels],
        description: `${labels[categoryId as keyof typeof labels]} solutions`,
        count
      });
    }
  });
  
  console.log('🎯 Intelligent categories created:', categories);
  return categories;
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
