"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence , type Variants} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Search,
  Filter,
  TrendingUp,
  Calendar,
  ArrowRight,
  Eye,
  BookOpen,
  Clock,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/blog/BlogCard2";
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
    views: 0,
    likes: 0,
  };
}

// Particle background component
const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants :Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
export const revalidate = 3600;
export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All Posts"]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    
  // Fetch data from Sanity
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const [sanityPosts, sanityFeaturedPosts, sanityCategories] =
          await Promise.all([getPosts(), getFeaturedPosts(), getCategories()]);

        const transformedPosts = sanityPosts.map(adaptSanityPost);
        const transformedFeatured = sanityFeaturedPosts.map(adaptSanityPost);
        const categoryTitles = [
          "All Posts",
          ...sanityCategories.map((cat: any) => cat.title),
        ];

        setAllPosts(transformedPosts);
        setFeaturedPosts(transformedFeatured);
        setCategories(categoryTitles);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setAllPosts([]);
        setFeaturedPosts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter posts
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
  const totalViews = 150;
  const totalPosts = allPosts.length;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
        <ParticleBackground />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full blur-[128px] pointer-events-none" />

        <div className="relative container mx-auto px-6 pt-32">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400">
                Loading articles...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full blur-[128px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-6 relative z-10">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl mb-6"
            >
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                Technical Articles & Insights
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
                Engineering Insights
              </span>
              <br />
              <span className="text-gray-700 dark:text-gray-300">
                & Solutions
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deep technical insights, architectural patterns, and strategic
              engineering approaches from building scalable systems.
            </p>

            {/* Blog Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              {[
                {
                  icon: Eye,
                  label: `${totalViews.toLocaleString()} views`,
                  delay: 0.3,
                },
                { icon: BookOpen, label: `${totalPosts} articles`, delay: 0.4 },
                { icon: TrendingUp, label: "Updated weekly", delay: 0.5 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10"
                >
                  <stat.icon size={16} className="text-purple-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Articles
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post) => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-20" ref={ref}>
        <div className="container mx-auto px-6 relative z-10">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative bg-gray-50/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row gap-6 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full group">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search articles, topics, technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
                  <Filter className="text-gray-400 flex-shrink-0" size={20} />
                  <div className="flex gap-2">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "relative px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden",
                          selectedCategory === category
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        )}
                      >
                        {/* Active background */}
                        {selectedCategory === category && (
                          <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}

                        {/* Inactive background */}
                        {selectedCategory !== category && (
                          <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl" />
                        )}

                        <span className="relative z-10">{category}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          {!isLoading && filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 flex items-center justify-between"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {filteredPosts.length}
                </span>{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
              </p>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          )}

          {/* Articles Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post._id} variants={itemVariants}>
                  <BlogCard post={post}  />
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
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                <div className="relative w-24 h-24 rounded-full bg-gray-100 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 flex items-center justify-center">
                  <Search className="text-gray-400" size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or category filter to find what
                you're looking for.
              </p>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Posts");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                <X size={18} />
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-500/50">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />

                  <span className="relative z-10 font-semibold text-gray-900 dark:text-white">
                    Load More Articles
                  </span>
                  <ArrowRight
                    size={20}
                    className="relative z-10 text-purple-500 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
