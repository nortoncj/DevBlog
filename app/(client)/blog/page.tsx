"use client";

/**
 * BlogIndexPage - OPTIMIZED VERSION
 *
 * Integrates real Sanity fetching with full optimization:
 * - Client-side fetching with useEffect
 * - Memoized filtering (ZERO API calls on filter/search)
 * - Performance-optimized components
 * - Beautiful design maintained
 */

import { useState, useEffect, useMemo, memo } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  Calendar,
  ArrowRight,
  Eye,
  BookOpen,
  Clock,
  Zap,
} from "lucide-react";
import {
  getPosts,
  getFeaturedPosts,
  getCategories,
  calculateReadingTimeFromBlocks,
  urlFor,
} from "@/lib/sanity";

// Types
interface Category {
  title: string;
}

interface Author {
  name: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  categories: Category[];
  tags: string[];
  author: Author;
  thumbnail?: string;
  image?: {
    asset: {
      url: string;
    };
  };
  views: number;
  likes: number;
}

// Adapter function to convert Sanity blog data to BlogCard format
function adaptSanityPost(post: any): Post {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug?.current || post.slug,
    excerpt: post.excerpt || "",
    publishedAt: post.publishedAt,
    readTime: post.body
      ? calculateReadingTimeFromBlocks(post.body)
      : "5 min read",
    featured: post.featured || false,
    categories: post.categories || [],
    tags: post.tags || [],
    author: post.author || { name: "Chris Norton Jr" },
    thumbnail: post.image
      ? urlFor(post.image).width(800).height(400).quality(90).url()
      : undefined,
    image: post.image
      ? { asset: { url: urlFor(post.image).url() } }
      : undefined,
    views: 0,
    likes: 0,
  };
}

// BlogCard Component - Memoized for performance
interface BlogCardProps {
  post: Post;
  size?: "default" | "large";
  showExcerpt?: boolean;
}

const BlogCard = memo(
  ({ post, size = "default", showExcerpt = true }: BlogCardProps) => {
    const isLarge = size === "large";

    return (
      <article
        className={`group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-[#F8F6F7] dark:border-gray-800 hover:border-[#E8B4B8] dark:hover:border-[#E8B4B8] transition-all duration-300 hover:-translate-y-1 ${
          isLarge ? "h-full" : ""
        }`}
        style={{
          boxShadow: "0 4px 20px rgba(139, 21, 56, 0.08)",
        }}
      >
        {/* Thumbnail */}
        {post.thumbnail && (
          <div
            className={`relative overflow-hidden ${isLarge ? "h-80" : "h-48"}`}
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/60 to-transparent" />

            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #8B1538, #B8336A)",
                  }}
                >
                  <Zap size={12} />
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((cat, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: "rgba(139, 21, 56, 0.1)",
                  color: "#8B1538",
                  border: "1px solid rgba(139, 21, 56, 0.2)",
                }}
              >
                {cat.title}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className={`font-semibold text-[#2C2C2C] dark:text-white mb-3 line-clamp-2 group-hover:text-[#8B1538] dark:group-hover:text-[#E8B4B8] transition-colors ${
              isLarge ? "text-2xl" : "text-xl"
            }`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && post.excerpt && (
            <p
              className="text-[#A8A8A8] dark:text-gray-400 mb-4 line-clamp-2"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-[#A8A8A8] dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {post.views?.toLocaleString() || 0}
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Read More Link */}
          <div className="mt-4 pt-4 border-t border-[#F8F6F7] dark:border-gray-800">
            <span
              className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
              style={{ color: "#8B1538" }}
            >
              Read Article
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </div>
        </div>
      </article>
    );
  }
);

BlogCard.displayName = "BlogCard";

// Main Component
export default function BlogIndexPage() {
  // State for fetched data
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch data from Sanity on mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        // console.log("🔍 [Client] Fetching blog data from Sanity...");

        // Fetch all data in parallel
        const [sanityPosts, sanityFeaturedPosts, sanityCategories] =
          await Promise.all([getPosts(), getFeaturedPosts(), getCategories()]);

        // console.log("✅ [Client] Raw posts:", sanityPosts?.length || 0);
        // console.log(
        //   "✅ [Client] Raw featured:",
        //   sanityFeaturedPosts?.length || 0
        // );
        // console.log(
        //   "✅ [Client] Raw categories:",
        //   sanityCategories?.length || 0
        // );

        // Transform Sanity data to BlogCard format
        const transformedPosts = Array.isArray(sanityPosts)
          ? sanityPosts.map(adaptSanityPost)
          : [];

        const transformedFeatured = Array.isArray(sanityFeaturedPosts)
          ? sanityFeaturedPosts.map(adaptSanityPost)
          : [];

        // Create category list
        const categoryTitles = Array.isArray(sanityCategories)
          ? sanityCategories.map((cat: any) => cat.title || cat).filter(Boolean)
          : [];

        // console.log("🎯 [Client] Transformed posts:", transformedPosts.length);

        // DEBUG: Log first post structure
        // if (transformedPosts.length > 0) {
        //   console.log("🔍 [Client] First post structure:", {
        //     _id: transformedPosts[0]._id,
        //     title: transformedPosts[0].title,
        //     categories: transformedPosts[0].categories,
        //     excerpt: transformedPosts[0].excerpt?.substring(0, 50),
        //   });
        // }

        // Update state
        setAllPosts(transformedPosts);
        setFeaturedPosts(transformedFeatured);
        setCategoryList(categoryTitles);
      } catch (error) {
        console.error("❌ [Client] Error fetching blog data:", error);
        setAllPosts([]);
        setFeaturedPosts([]);
        setCategoryList([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Memoized categories list
  const categories = useMemo(() => {
    return ["All Posts", ...categoryList];
  }, [categoryList]);

  // Memoized regular posts (exclude featured)
  const regularPosts = useMemo(() => {
    // console.log("🔍 [Posts Debug] Total allPosts:", allPosts.length);
    // console.log("🔍 [Posts Debug] Featured posts:", featuredPosts.length);

    // Return ALL posts for the main grid
    return allPosts;
  }, [allPosts, featuredPosts]);

  // CLIENT-SIDE FILTERING - ZERO API CALLS! 🎯
  const filteredPosts = useMemo(() => {
    let filtered = regularPosts;

    // console.log("🔍 [Filter Debug] Starting with posts:", regularPosts.length);
    // console.log("🔍 [Filter Debug] Selected category:", selectedCategory);
    // console.log("🔍 [Filter Debug] Search query:", searchQuery);

    // Category filter
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter((post) => {
        const postCategories = post.categories || [];
        const matches = postCategories.some((cat: any) => {
          const catTitle = typeof cat === "string" ? cat : cat?.title;
          return catTitle === selectedCategory;
        });
        return matches;
      });
      // console.log("🔍 [Filter Debug] After category filter:", filtered.length);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title?.toLowerCase().includes(query);
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);

        return titleMatch || excerptMatch;
      });
      // console.log("🔍 [Filter Debug] After search filter:", filtered.length);
    }

    // console.log("✅ [Filter Debug] Final filtered posts:", filtered.length);
    return filtered;
  }, [regularPosts, selectedCategory, searchQuery]);

  // Memoized stats
  const stats = useMemo(() => {
    const totalViews = allPosts.reduce(
      (sum, post) => sum + (post.views || 0),
      0
    );
    const totalPosts = allPosts.length;

    return { totalViews, totalPosts };
  }, [allPosts]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FEFCFC] dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-6 pt-32">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4 border-[#8B1538] dark:border-[#E8B4B8]" />
              <p
                className="text-[#A8A8A8] dark:text-gray-400"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Loading articles from Sanity...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFCFC] dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139, 21, 56, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 21, 56, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(139, 21, 56, 0.03) 0%, rgba(232, 180, 184, 0.05) 100%)",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 text-white"
              style={{
                background: "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <BookOpen size={16} />
              Technical Articles & System Insights
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#2C2C2C] dark:text-white"
              style={{
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Engineering Insights
              <span
                className="block mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                & Strategic Solutions
              </span>
            </h1>

            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed mb-8 text-[#2C2C2C] dark:text-gray-300"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              Deep technical insights, architectural patterns, and systematic
              approaches to building scalable enterprise systems.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-sm flex-wrap text-[#A8A8A8] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{stats.totalViews.toLocaleString()} total views</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{stats.totalPosts} articles</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>Updated weekly</span>
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp
                  className="text-[#8B1538] dark:text-[#E8B4B8]"
                  size={20}
                />
                <h2
                  className="text-2xl font-semibold text-[#2C2C2C] dark:text-white"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Featured Articles
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <div key={post._id}>
                    <BlogCard
                      post={post}
                      size={index === 0 ? "large" : "default"}
                      showExcerpt={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          {/* Search and Filter */}
          <div className="rounded-xl p-6 mb-12 bg-[#F8F6F7] dark:bg-gray-900 border border-[#E8B4B8] dark:border-gray-800">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A8A8A8] dark:text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search articles, topics, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-[#FEFCFC] dark:bg-gray-800 border-[#E8B4B8] dark:border-gray-700 text-[#2C2C2C] dark:text-white focus:ring-[#8B1538] dark:focus:ring-[#E8B4B8]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                <Filter
                  className="text-[#A8A8A8] dark:text-gray-400 flex-shrink-0"
                  size={20}
                />
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                      style={{
                        background:
                          selectedCategory === category
                            ? "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)"
                            : "transparent",
                        color:
                          selectedCategory === category ? "#FEFCFC" : "#2C2C2C",
                        border:
                          selectedCategory === category
                            ? "none"
                            : "1px solid #E8B4B8",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-sm text-[#A8A8A8] dark:text-gray-400">
              {filteredPosts.length > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-[#8B1538] dark:text-[#E8B4B8]">
                    {filteredPosts.length}
                  </span>{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"}
                  {selectedCategory !== "All Posts" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold">{selectedCategory}</span>
                    </>
                  )}
                  {searchQuery && (
                    <>
                      {" "}
                      matching "
                      <span className="font-semibold">{searchQuery}</span>"
                    </>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post._id}>
                  <BlogCard post={post} showExcerpt={true} />
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#F8F6F7] dark:bg-gray-900">
                <Search
                  className="text-[#A8A8A8] dark:text-gray-400"
                  size={32}
                />
              </div>
              <h3
                className="text-xl font-semibold mb-2 text-[#2C2C2C] dark:text-white"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                No articles found
              </h3>
              <p
                className="mb-6 text-[#A8A8A8] dark:text-gray-400"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Posts");
                }}
                className="px-6 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #8B1538 0%, #B8336A 100%)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && filteredPosts.length >= 9 && (
            <div className="flex justify-center mt-16">
              <button
                className="group flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-300 font-medium hover:shadow-lg bg-[#F8F6F7] dark:bg-gray-900 text-[#2C2C2C] dark:text-white border border-[#E8B4B8] dark:border-gray-800 hover:border-[#8B1538] dark:hover:border-[#E8B4B8]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span>Load More Articles</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
