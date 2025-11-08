"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";



// Type definitions
interface VideoObject {
  url?: string;
  videoUrl?: string;
  link?: string;
  href?: string;
}

interface BlogPost {
  title: string;
  video?: string | VideoObject;
  image?: any;
}

interface FeaturedMediaProps {
  post: BlogPost;
  heroInView: boolean;
}

/**
 * FeaturedMedia Component
 *
 * Displays YouTube videos or featured images with glassmorphic styling.
 * Supports multiple YouTube URL formats with smart fallback to images.
 *
 * @component
 * @example
 * ```tsx
 * <FeaturedMedia post={post} heroInView={heroInView} />
 * ```
 */
export const revalidate = 3600;
export default function FeaturedMedia({
  post,
  heroInView,
}: FeaturedMediaProps) {
  /**
   * Extract video URL from various Sanity field structures
   */
  const getVideoUrl = (): string => {
    if (!post?.video) return "";

    if (typeof post.video === "object" && post.video !== null) {
      return (
        post.video.url ||
        post.video.videoUrl ||
        post.video.link ||
        post.video.href ||
        ""
      );
    }

    if (typeof post.video === "string") {
      return post.video;
    }

    return "";
  };

  /**
   * Extract YouTube video ID from URL using regex patterns
   * Supports: youtube.com/watch, youtu.be, youtube.com/embed, youtube.com/v
   */
  const extractVideoId = (url: string): string | null => {
    if (!url) return null;

    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }

    return null;
  };

  // Extract video URL and ID
  const videoUrl = getVideoUrl();
  const videoId = extractVideoId(videoUrl);

  // Don't render if no media
  if (!videoId && !post?.image) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={heroInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative mb-16 group"
    >
      {/* Glassmorphic container */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 backdrop-blur-sm">
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
          {/* YouTube Video */}
          {videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&color=white`}
              title={post.title || "Video"}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
            />
          )}

          {/* Fallback Image */}
          {!videoId && post?.image && (
            <>
              <Image
                src={urlFor(post.image).width(1200).quality(90).url()}
                alt={post.title || "Blog post image"}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
