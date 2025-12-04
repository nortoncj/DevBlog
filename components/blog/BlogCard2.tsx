"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Star, ArrowRight, Eye, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import avi from "@images/Avatar.jpeg";

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
  index?: number;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  "System Design": "from-blue-500 to-blue-600",
  Automation: "from-green-500 to-emerald-600",
  Strategy: "from-purple-500 to-purple-600",
  Development: "from-orange-500 to-orange-600",
  "Data Engineering": "from-red-500 to-red-600",
  "Technical Leadership": "from-indigo-500 to-indigo-600",
};

const getCategoryInfo = (
  categories: { title: string }[]
): { name: string; gradient: string } => {
  const categoryName = categories?.[0]?.title || "General";
  const gradient =
    categoryColors[categoryName] || "from-purple-600 to-pink-600";
  return { name: categoryName, gradient };
};

const formatDisplayDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export const revalidate = 3600;
export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { name: categoryName } = getCategoryInfo(post.categories);

  const getImageUrl = () => {
    if (post.image?.asset) {
      return urlFor(post.image).width(800).height(500).quality(85).url();
    }
    if (post.thumbnail) {
      return post.thumbnail;
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        className="blog-card group cursor-pointer relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border-2 border-transparent hover:border-purple-500/50 dark:hover:border-purple-400/60 hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col transition-all duration-400"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Thumbnail - Full Card */}
        <div className="relative w-full h-full min-h-[400px] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-[0.4]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800">
              <Calendar
                size={64}
                className="text-purple-300 dark:text-gray-500"
              />
            </div>
          )}

          {/* Featured Badge (Top Right) */}
          {post.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg z-10">
              <Star size={14} fill="white" />
              Featured
            </div>
          )}

          {/* Category Badge (Top Left) */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full border border-purple-200 dark:border-purple-800">
              {categoryName}
            </span>
          </div>

          {/* Bottom Info Bar (Always Visible) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-all duration-400 group-hover:opacity-0">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
              {post.title}
            </h3>
            <div className="flex items-center justify-between text-white/90 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDisplayDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30">
                  <Image
                    src={avi}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium">{post.author.name}</span>
              </div>
            </div>
          </div>

          {/* Hover Popover (Full Details) */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/97 to-pink-600/97 backdrop-blur-sm p-6 opacity-0 translate-y-5 pointer-events-none transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center">
            {/* Category at top */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1.5 bg-white/20 border border-white/30 text-white text-xs font-bold rounded-full backdrop-blur-md">
                {categoryName}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-white/95 text-sm leading-relaxed mb-5 line-clamp-4">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-white/90 text-xs mb-5">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDisplayDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
              {post.views && (
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {post.views.toLocaleString()}
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.slice(0, 4).map((tag, tagIndex) => (
                  <span
                    key={tag._id || tagIndex}
                    className="px-2.5 py-1 bg-white/25 border border-white/40 text-white text-xs font-semibold rounded-md backdrop-blur-md hover:bg-white/35 transition-colors"
                  >
                    {tag.title}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="px-2.5 py-1 bg-white/25 border border-white/40 text-white text-xs font-semibold rounded-md backdrop-blur-md">
                    +{post.tags.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Bottom: Author & CTA */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30">
                  <Image
                    src={avi}
                    alt={post.author.name}
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <div className="text-xs">
                  <div className="text-white font-bold">{post.author.name}</div>
                  <div className="text-white/80">Engineer</div>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 rounded-xl text-sm font-bold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all">
                <span>Read Article</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .blog-card {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }

          .dark .blog-card {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .blog-card:hover {
            box-shadow: 0 24px 48px rgba(147, 51, 234, 0.25);
          }

          .dark .blog-card:hover {
            box-shadow: 0 24px 48px rgba(168, 85, 247, 0.35);
          }

          .duration-400 {
            transition-duration: 0.4s;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          .duration-600 {
            transition-duration: 0.6s;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </motion.article>
    </Link>
  );
}
