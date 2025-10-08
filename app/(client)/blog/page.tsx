"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  TrendingUp,
  Calendar,
  ArrowRight,
  Eye,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/blog/BlogCard";
// import { blogPosts, getFeaturedBlogPosts } from "@/data/blog";
import {
  getPosts,
  getFeaturedPosts,
  getCategories,
  calculateReadingTimeFromBlocks,
  urlFor,
} from "@/lib/sanity";



// Adapter function to convert Sanity blog data to BlogCard format
function adaptSanityPost(post: any) {
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
    author: { name: "Chris Norton Jr" },
    thumbnail: post.image
      ? urlFor(post.image).width(800).height(400).quality(90).url()
      : undefined,
    image: post.image
      ? { asset: { url: urlFor(post.image).url() } }
      : undefined,
    views: 0, // You can add view tracking later
    likes: 0, // You can add like tracking later
  };
}

// const categories = [
//   "All Posts",
//   "System Design",
//   "Data Engineering",
//   "Automation",
//   "Technical Leadership",
//   "Development",
//   "Strategy",
// ];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function BlogIndexPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Posts");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["All Posts"]);

    // Fetch data from Sanity
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                // Fetch all data in parallel
                const [sanityPosts, sanityFeaturedPosts, sanityCategories] =
                    await Promise.all([getPosts(), getFeaturedPosts(), getCategories()]);

                console.log("Fetched posts:", sanityPosts);
                console.log("Fetched featured posts:", sanityFeaturedPosts);

                // Transform Sanity data to BlogCard format
                const transformedPosts = sanityPosts.map(adaptSanityPost);
                const transformedFeatured = sanityFeaturedPosts.map(adaptSanityPost);

                // Create category list
                const categoryTitles = [
                    "All Posts",
                    ...sanityCategories.map((cat: any) => cat.title),
                ];

                // Update state
                setAllPosts(transformedPosts);
                setFeaturedPosts(transformedFeatured);
                setCategories(categoryTitles);
            } catch (error) {
                console.error("Error fetching blog data:", error);
                // Set empty arrays on error
                setAllPosts([]);
                setFeaturedPosts([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Filter posts based on category and search
    const regularPosts = allPosts.filter((post) => !post.featured);

    const filteredPosts = regularPosts.filter((post) => {
        const matchesCategory =
            selectedCategory === "All Posts" ||
            post.categories.some((cat: any) => cat.title === selectedCategory);

        const matchesSearch =
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Calculate stats
    const totalViews = 150; // You can calculate this from your actual data if available
    const totalPosts = allPosts.length;

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg-primary dark:bg-gray-950 transition-colors duration-300">
                <div className="container mx-auto px-6 pt-32">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-signature-burgundy dark:border-rose-gold mx-auto mb-4"></div>
                            <p className="text-text-muted dark:text-gray-400">
                                Loading articles from Sanity...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
      <div className="min-h-screen bg-bg-primary dark:bg-gray-950 transition-colors duration-300">
        {/* Hero Section with Featured Posts */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-signature-burgundy/5 via-transparent to-rose-gold/5 dark:from-signature-burgundy/10 dark:to-rose-gold/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-rose-gold/20 to-transparent dark:from-rose-gold/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-signature-burgundy/20 to-transparent dark:from-signature-burgundy/10 blur-3xl" />

          <div className="container mx-auto px-6 relative">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-hero dark:bg-signature-burgundy text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <BookOpen size={16} />
                Technical Blog
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary dark:text-white mb-6">
                Engineering
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-signature-burgundy to-rose-gold dark:from-rose-gold dark:to-signature-burgundy">
                  Insights & Solutions
                </span>
              </h1>

              <p className="text-xl text-text-secondary dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Deep technical insights, architectural patterns, and strategic
                engineering approaches from building scalable systems at
                enterprise level.
              </p>

              {/* Blog Stats */}
              <div className="flex items-center justify-center gap-8 mt-8 text-sm">
                <div className="flex items-center gap-2 text-text-muted dark:text-gray-400">
                  <Eye size={16} />
                  <span>{totalViews.toLocaleString()} total views</span>
                </div>
                <div className="flex items-center gap-2 text-text-muted dark:text-gray-400">
                  <BookOpen size={16} />
                  <span>{totalPosts} articles published</span>
                </div>
                <div className="flex items-center gap-2 text-text-muted dark:text-gray-400">
                  <TrendingUp size={16} />
                  <span>Updated weekly</span>
                </div>
              </div>
            </motion.div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-20"
              >
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp
                    className="text-signature-burgundy dark:text-rose-gold"
                    size={20}
                  />
                  <h2 className="text-2xl font-semibold text-text-primary dark:text-white">
                    Featured Articles
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredPosts.slice(0, 2).map((post, index) => (
                    <motion.div
                      key={post._id}
                      variants={itemVariants}
                      className={cn(
                        index === 0 &&
                          featuredPosts.length > 1 &&
                          "lg:row-span-1"
                      )}
                    >
                      <BlogCard
                        post={post}
                        size={index === 0 ? "large" : "default"}
                        showExcerpt={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-bg-secondary dark:bg-gray-900 rounded-2xl p-6 shadow-card dark:shadow-2xl mb-12"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search articles, topics, technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-bg-primary dark:bg-gray-800 border border-bg-accent dark:border-gray-700 rounded-xl text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-signature-burgundy dark:focus:ring-rose-gold focus:border-transparent transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                  <Filter
                    className="text-text-muted dark:text-gray-400 flex-shrink-0"
                    size={20}
                  />
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                          selectedCategory === category
                            ? "bg-signature-burgundy dark:bg-rose-gold text-white dark:text-gray-900"
                            : "bg-bg-primary dark:bg-gray-800 text-text-secondary dark:text-gray-300 hover:bg-bg-accent dark:hover:bg-gray-700"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Articles Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <BlogCard post={post} showExcerpt={true} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {!isLoading && filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-bg-accent dark:bg-gray-800 flex items-center justify-center">
                  <Search
                    className="text-text-muted dark:text-gray-400"
                    size={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-text-secondary dark:text-gray-300 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Posts");
                  }}
                  className="btn-primary dark:bg-signature-burgundy dark:hover:bg-signature-burgundy/90 dark:text-white"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Load More / Pagination */}
            {filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mt-16"
              >
                <button className="group flex items-center gap-2 px-8 py-4 bg-bg-secondary dark:bg-gray-800 hover:bg-signature-burgundy dark:hover:bg-rose-gold text-text-primary dark:text-white hover:text-white dark:hover:text-gray-900 rounded-xl transition-all duration-300 font-medium">
                  <span>Load More Articles</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    );

}