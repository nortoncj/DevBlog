"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getFeaturedBlogPosts } from "@/data/sanity-data";
// import { BlogPost } from "@/types/sanity";
import { ArrowRight, BookOpen } from "lucide-react";

interface FlexibleBlogPost {
  _id?: string;
  id?: string | number;
  title: string;
  slug: string;
  excerpt: string;
  image?: any; // Flexible image handling
  publishedAt: string;
  readTime: string;
  categories: { title: string }[] | any[];
  tags: { _id?: string; title: string }[] | any[];
  author: { name: string } | any;
  featured?: boolean;
  thumbnail?: string;
}

// Helper function to ensure blog post has required _id for BlogCard and handles image format
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
    author: post.author || { name: "Christopher Norton" },
    readTime: post.readTime || "5 min read",
  };
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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
      ease: "easeOut",
    },
  },
};

interface BlogSectionProps {
  initialPosts?: FlexibleBlogPost[];
}

export function BlogSection({ initialPosts = [] }: BlogSectionProps) {
  const [posts, setPosts] = useState<FlexibleBlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(!initialPosts.length);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Load posts if not provided as initial props
  useEffect(() => {
    async function loadPosts() {
      if (!initialPosts.length) {
        try {
          const featuredPosts = await getFeaturedBlogPosts(4);
          // Convert Sanity posts to compatible format
          const compatiblePosts = featuredPosts.map(
            ensureBlogPostCompatibility
          );
          setPosts(compatiblePosts);
        } catch (error) {
          console.error("Failed to load blog posts:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadPosts();
  }, [initialPosts]);

  return (
    <section
      id="blog"
      className="section-padding bg-bg-secondary dark:bg-gray-800"
      ref={ref}
    >
      <div className="container-strategic">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title text-text-primary dark:text-white">
              <span className="text-gradient-hero">Blogs</span>
            </h2>
            <p className="section-subtitle text-text-secondary dark:text-gray-300">
              <span className="dark:text-gray-300">Systematic thinking for scalable solutions</span>
            </p>
          </motion.div>

          {/* Blog Grid */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-bg-secondary dark:bg-gray-700 rounded-lg mb-4" />
                    <div className="h-4 bg-bg-secondary dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-bg-secondary dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-bg-secondary dark:bg-gray-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id || post.id || index}
                    variants={itemVariants}
                    custom={index}
                  >
                    <BlogCard post={ensureBlogPostCompatibility(post)} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Bottom Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-signature-burgundy dark:text-pink-400">
                  15+
                </div>
                <div className="text-text-secondary dark:text-gray-400">
                  Technical Articles
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-signature-burgundy dark:text-pink-400">
                  50K+
                </div>
                <div className="text-text-secondary dark:text-gray-400">
                  Readers Reached
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-signature-burgundy dark:text-pink-400">
                  25+
                </div>
                <div className="text-text-secondary dark:text-gray-400">
                  Case Studies Shared
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-hero rounded-2xl p-8 lg:p-12 text-white">
              <div className="max-w-3xl mx-auto">
                <BookOpen className="mx-auto mb-4" size={48} />
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Deep Technical Insights
                </h3>
                <p className="text-lg opacity-90 mb-6">
                  From system architecture to automation strategies, get
                  actionable insights from building systems that process
                  millions of requests daily.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/blog"
                    className="btn-primary bg-white text-signature-burgundy border-white hover:bg-bg-secondary dark:hover:bg-gray-100 group"
                  >
                    Read All Insights
                    <ArrowRight
                      size={20}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  <button
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="btn-white border-white text-white hover:bg-white/10 dark:hover:bg-white/20"
                  >
                    Subscribe to Updates
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Topics */}
            <motion.div
              variants={itemVariants}
              className="bg-bg-primary dark:bg-gray-900 border border-transparent dark:border-gray-700 rounded-xl p-6 lg:p-8"
            >
              <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-6 text-center">
                Popular Topics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "System Architecture",
                  "Process Automation",
                  "Data Pipelines",
                  "API Design",
                  "Performance Optimization",
                  "Technical Leadership",
                  "Scalability Patterns",
                  "DevOps Practices",
                ].map((topic, index) => (
                  <Link
                    key={topic}
                    href="/blog"
                    className="text-center p-4 rounded-lg bg-bg-secondary dark:bg-gray-800 text-text-primary dark:text-gray-300 hover:bg-signature-burgundy/10 dark:hover:bg-pink-400/10 hover:text-signature-burgundy dark:hover:text-pink-400 transition-colors group border border-transparent dark:border-gray-600 dark:hover:border-pink-400/50"
                  >
                    <div className="text-sm font-medium">{topic}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
