"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Star, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import avi from "@images/Avatar.jpeg"

interface BlogPost {
  _id?: string | number;
  id?: string | number;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  categories: { title: string }[];
  tags: { _id: string; title: string }[];
  author: { name: string };
  thumbnail?: string;
  image?: { asset?: { url?: string } };
  views?: number;
  likes?: number;
}

interface BlogCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
  size?: "default" | "large";
}

const categoryColors: Record<string, string> = {
  "System Design":
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50",
  Automation:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50",
  Strategy:
    "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50",
  Development:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50",
  "Data Engineering":
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50",
  "Technical Leadership":
    "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/50",
};

// Helper function to get category name
const getBlogCategoryName = (categories: { title: string }[]): string => {
  return categories?.[0]?.title || "General";
};

// Helper function to format date
const formatDisplayDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function BlogCard({
  post,
  showExcerpt = true,
  size = "default",
}: BlogCardProps) {
  const isLarge = size === "large";
  const categoryName = getBlogCategoryName(post.categories);

  // Handle both Sanity images and direct URLs
  

  const getImageUrl = () => {
    // If we have a Sanity image, use urlFor to optimize it
    if (post.image && post.image.asset) {
      return urlFor(post.image)
        .width(isLarge ? 800 : 600)
        .height(isLarge ? 400 : 300)
        .quality(90)
        .url();
    }
    // Fallback to direct thumbnail URL
    if (post.thumbnail) {
      return post.thumbnail;
    }
    return null;
  };

  const imageUrl = getImageUrl();


  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className={cn(
          "group h-full flex flex-col bg-bg-primary dark:bg-[#1a1a1a] rounded-xl overflow-hidden",
          "border border-bg-accent dark:border-gray-700 hover:border-signature-burgundy/30 dark:hover:border-rose-gold/40",
          "shadow-card dark:shadow-2xl hover:shadow-card-hover dark:hover:shadow-signature-burgundy/20 transition-all duration-300",
          "transform hover:-translate-y-1 cursor-pointer"
        )}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Blog Thumbnail */}
        <div
          className={cn(
            "relative overflow-hidden bg-bg-accent dark:bg-gray-800",
            isLarge ? "h-64 lg:h-80" : "h-48 lg:h-56"
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-accent dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 text-white">
              <div className="text-4xl opacity-50">
                <Calendar size={48} />
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-hero dark:bg-signature-burgundy text-white px-3 py-1 rounded-full text-xs font-semibold">
              <Star size={12} fill="currentColor" />
              Featured
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                categoryColors[categoryName] ||
                  "bg-bg-primary/90 dark:bg-[#1a1a1a]/90 text-text-secondary dark:text-gray-300 border-bg-accent dark:border-gray-600"
              )}
            >
              {categoryName}
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Blog Content */}
        <div className={cn("flex flex-col flex-1", isLarge ? "p-8" : "p-6")}>
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-text-muted dark:text-gray-400 mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatDisplayDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "font-semibold text-text-primary dark:text-white mb-3 group-hover:text-signature-burgundy dark:group-hover:text-rose-gold transition-colors line-clamp-2",
              isLarge ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && (
            <p
              className={cn(
                "text-text-secondary dark:text-gray-300 leading-relaxed flex-1 line-clamp-3",
                isLarge ? "text-base mb-6" : "text-sm mb-4"
              )}
            >
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag?._id || `${tag?.title}-${index}`}
                className="badge-tech dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-xs"
              >
                {tag?.title}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="badge-tech dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 text-xs">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Author and Read More */}
          <div className="flex items-center justify-between pt-3 border-t border-bg-accent dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-hero dark:bg-signature-burgundy flex items-center justify-center text-white text-xs font-semibold">
                <Image
                  src={avi}
                  alt={post.author.name}
                  className="object-cover  duration-300 group-hover:scale-105 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="text-xs">
                <div className="text-text-primary dark:text-white font-medium">
                  {post.author.name}
                </div>
                <div className="text-text-muted dark:text-gray-400">
                  System Architect
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-signature-burgundy dark:text-rose-gold text-xs font-medium">
              <span>Read Article</span>
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
