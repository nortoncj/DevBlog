"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import { getRelatedPosts } from "@/lib/sanity";

interface RelatedPostsProps {
  currentPost: any;
  className?: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: any;
  publishedAt: string;
  categories?: any[];
  estimatedReadingTime?: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function RelatedPosts({ currentPost, className }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedPosts() {
      try {
        // Try to get related posts from Sanity
        const posts = await getRelatedPosts(
          currentPost._id,
          currentPost.categories
        );
        setRelatedPosts(posts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
        // Fallback to empty array if there's an error
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedPosts();
  }, [currentPost._id, currentPost.categories]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryName = (categories: any[]) => {
    return categories?.[0]?.title || "General";
  };

  if (loading) {
    return (
      <div className={cn("", className)}>
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-8">
          Related Articles
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-bg-accent dark:bg-gray-800 rounded-xl h-48 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-bg-accent dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-bg-accent dark:bg-gray-800 rounded w-1/2"></div>
                <div className="h-3 bg-bg-accent dark:bg-gray-800 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return (
      <div className={cn("", className)}>
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-8">
          Related Articles
        </h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-accent dark:bg-gray-800 flex items-center justify-center">
            <ChevronRight
              size={24}
              className="text-text-muted dark:text-gray-400"
            />
          </div>
          <p className="text-text-muted dark:text-gray-400 mb-4">
            No related articles found yet
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-signature-burgundy dark:text-rose-gold hover:underline font-medium"
          >
            Explore all articles
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("", className)}
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-2xl font-bold text-text-primary dark:text-white mb-8"
      >
        Related Articles
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.slice(0, 3).map((post, index) => (
          <motion.article key={post._id} variants={fadeInUp} className="group">
            <Link href={`/blog/${post.slug.current}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-bg-accent dark:border-gray-700 hover:border-signature-burgundy/20 dark:hover:border-rose-gold/20">
                {/* Image */}
                <div className="relative aspect-video bg-bg-accent dark:bg-gray-700 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={urlFor(post.image)
                        .width(400)
                        .height(250)
                        .quality(90)
                        .url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-hero dark:bg-signature-burgundy flex items-center justify-center">
                      <div className="text-white font-bold text-2xl">
                        {post.title.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-signature-burgundy dark:text-rose-gold text-xs font-medium rounded-full">
                      {getCategoryName(post.categories)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-signature-burgundy dark:group-hover:text-rose-gold transition-colors">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-text-muted dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-text-muted dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.estimatedReadingTime || 5} min read</span>
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-signature-burgundy dark:text-rose-gold group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* View All Link */}
      <motion.div variants={fadeInUp} className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-signature-burgundy dark:bg-rose-gold text-white dark:text-gray-900 rounded-lg font-medium hover:bg-signature-burgundy/90 dark:hover:bg-rose-gold/90 transition-colors shadow-lg hover:shadow-xl"
        >
          View All Articles
          <ChevronRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Fallback component for when Sanity is not available
export function RelatedPostsFallback({
  currentPost,
  className,
}: RelatedPostsProps) {
  // Mock related posts for development
  const mockPosts = [
    {
      _id: "1",
      title: "Advanced System Architecture Patterns",
      slug: { current: "advanced-system-architecture-patterns" },
      excerpt:
        "Exploring modern patterns for scalable system design and implementation.",
      publishedAt: "2024-01-15",
      categories: [{ title: "Architecture" }],
      estimatedReadingTime: 8,
    },
    {
      _id: "2",
      title: "The Future of Web Development",
      slug: { current: "future-of-web-development" },
      excerpt:
        "Insights into emerging technologies and frameworks shaping web development.",
      publishedAt: "2024-01-10",
      categories: [{ title: "Technology" }],
      estimatedReadingTime: 6,
    },
    {
      _id: "3",
      title: "Building Resilient Teams",
      slug: { current: "building-resilient-teams" },
      excerpt:
        "Leadership strategies for creating high-performing, adaptable teams.",
      publishedAt: "2024-01-05",
      categories: [{ title: "Leadership" }],
      estimatedReadingTime: 7,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className={cn("", className)}
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-2xl font-bold text-text-primary dark:text-white mb-8"
      >
        Related Articles
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post, index) => (
          <motion.article key={post._id} variants={fadeInUp} className="group">
            <Link href={`/blog/${post.slug.current}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-bg-accent dark:border-gray-700 hover:border-signature-burgundy/20 dark:hover:border-rose-gold/20">
                {/* Placeholder Image */}
                <div className="relative aspect-video bg-gradient-hero dark:bg-signature-burgundy flex items-center justify-center">
                  <div className="text-white font-bold text-2xl">
                    {post.title.charAt(0).toUpperCase()}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-signature-burgundy dark:text-rose-gold text-xs font-medium rounded-full">
                      {post.categories[0].title}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-signature-burgundy dark:group-hover:text-rose-gold transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-text-muted dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-text-muted dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.estimatedReadingTime} min read</span>
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-signature-burgundy dark:text-rose-gold group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
    