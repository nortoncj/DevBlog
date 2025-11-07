"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard2";
import {
  FiArrowRight,
  FiTrendingUp,
  FiBookOpen,
  FiUsers,
  FiStar,
} from "react-icons/fi";
import { getFeaturedBlogPosts } from "@/data/sanity-data";
import { BlogPost } from "@/types/sanity";

interface BlogSectionProps {
  initialPosts?: BlogPost[];
}
const ensureBlogPostCompatibility = (post: any): any => {
  return {
    ...post,
    _id:
      post._id ||
      post.id ||
      `blog-${post.title?.replace(/\\s+/g, "-").toLowerCase()}`,
    // Convert Sanity image format to BlogCard compatible format
    image: post.image
      ? {
          asset: post.image.asset
            ? {
                url: post.image.asset.url || undefined,
                _ref: post.image.asset._ref,
                _type: post.image.asset._type,
              }
            : { url: typeof post.image === "string" ? post.image : undefined },
        }
      : undefined,
    // Ensure required fields exist with proper types for BlogCard
    categories: (post.categories || []).map((cat: any, index: number) => ({
      title: typeof cat === "string" ? cat : cat?.title || "General",
      _id: cat?._id || `cat-${index}`,
    })),
    tags: (post.tags || []).map((tag: any, index: number) => ({
      _id: tag?._id || `tag-${index}`,
      title: typeof tag === "string" ? tag : tag?.title || "General",
    })),
    author: post.author || { name: "Chris Norton Jr" },
    readTime: post.readTime || "5 min read",
  };
};
// Particle background component (matching projects section)
const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
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

// Enhanced stats card component
const StatCard = ({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: any;
  value: string;
  label: string;
  delay: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative bg-gray-50/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:bg-gray-100/80 dark:hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Gradient hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {value}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Topic tag component
const TopicTag = ({
  name,
  count,
  delay,
}: {
  name: string;
  count?: number;
  delay: number;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/blog?topic=${encodeURIComponent(name.toLowerCase())}`}
        className="group relative block"
      >
        <div className="relative bg-gray-50/80 dark:bg-white/5 backdrop-blur-xl rounded-xl px-6 py-4 border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-500 hover:bg-gray-100/80 dark:hover:bg-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
          {/* Gradient hover effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-white transition-colors duration-300">
              {name}
            </span>
            {count && (
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-200/80 dark:bg-white/10 rounded-full px-3 py-1">
                {count}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export function BlogSection({ initialPosts = [] }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(!initialPosts.length);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!initialPosts.length) {
      const loadPosts = async () => {
        try {
          const { getFeaturedBlogPosts } = await import("@/data/sanity-data");
          const fetchedPosts = await getFeaturedBlogPosts(5); // Load 5 posts: 1 hero + 4 grid
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Failed to load blog posts:", error);
        } finally {
          setLoading(false);
        }
      };

      loadPosts();
    }
  }, [initialPosts.length]);

  // Split posts: first one is hero, rest are grid
  const heroPosts = useMemo(() => posts.slice(0, 1), [posts]);
  const gridPosts = useMemo(() => posts.slice(1, 5), [posts]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Stats data
  const stats = [
    { icon: FiBookOpen, value: "50+", label: "Technical Articles", delay: 0.1 },
    { icon: FiUsers, value: "100K+", label: "Readers Reached", delay: 0.2 },
    { icon: FiStar, value: "40+", label: "Case Studies", delay: 0.3 },
    {
      icon: FiTrendingUp,
      value: "95%",
      label: "Reader Satisfaction",
      delay: 0.4,
    },
  ];

  // Topics data
  const topics = [
    { name: "Web Development", count: 24 },
    { name: "React & Next.js", count: 18 },
    { name: "TypeScript", count: 15 },
    { name: "UI/UX Design", count: 12 },
    { name: "Performance", count: 10 },
    { name: "Best Practices", count: 20 },
    { name: "Case Studies", count: 8 },
    { name: "Tutorials", count: 16 },
  ];

  return (
    <section
      id="blog"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-xl">
              <FiBookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                Latest Insights
              </span>
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
              Deep Technical Insights
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Exploring modern web development, design patterns, and engineering
            excellence through detailed technical articles and case studies
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Blog Posts - Hero + Grid Layout */}
        {loading ? (
          <div className="space-y-8">
            {/* Hero skeleton */}
            <div className="w-full h-[500px] bg-gray-200 dark:bg-white/5 rounded-3xl animate-pulse" />
            {/* Grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-full h-[400px] bg-gray-200 dark:bg-white/5 rounded-3xl animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Hero Post - Full Width */}
            {heroPosts.length > 0 && (
              <motion.div variants={itemVariants}>
                <BlogCard post={ensureBlogPostCompatibility(heroPosts[0])} />
              </motion.div>
            )}

            {/* Grid Posts - 2 Columns */}
            {gridPosts.length > 0 && (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              >
                {gridPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogCard post={ensureBlogPostCompatibility(post)} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300"
          >
            <span>Explore All Articles</span>
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Popular Topics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
                Popular Topics
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover articles organized by technology and topic
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <TopicTag key={topic.name} {...topic} delay={0.05 * index} />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative mt-24 rounded-3xl overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl mb-6">
                <FiBookOpen className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Updated with Latest Articles
            </h3>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Get notified when I publish new technical insights, case studies,
              and tutorials
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-purple-600 font-semibold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
              >
                <span>Browse All Posts</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl text-white font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <span>Subscribe to Newsletter</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
