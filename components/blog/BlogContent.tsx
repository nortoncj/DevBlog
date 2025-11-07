"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  BookOpen,
  User,
  Sparkles,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import {
  urlFor,
  calculateReadingTimeFromBlocks,
} from "@/lib/sanity";
import avi from "@images/Avatar.jpeg";
import FeaturedMedia from "./FeatureMedia2";
import  DiagnosticDebug  from "./DiagnosticDebug";
// import { FeaturedMedia } from "./FeatureMedia";

// Floating particle component
function Particle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
      }}
      animate={{
        y: [null, Math.random() * -100 - 50],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 3,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
}

// Enhanced PortableText components with glassmorphic styling
const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }: any) => (
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white"
      >
        {children}
      </motion.h3>
    ),
    h4: ({ children }: any) => (
      <motion.h4
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100"
      >
        {children}
      </motion.h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative my-8 pl-6 border-l-4 border-gradient-to-b from-purple-500 to-pink-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm rounded-r-xl -z-10" />
        <div className="italic text-xl text-gray-800 dark:text-gray-200 py-4">
          {children}
        </div>
      </motion.blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-3 my-6 ml-6">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-3 my-6 ml-6 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-lg text-gray-700 dark:text-gray-300">
        <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-lg text-gray-700 dark:text-gray-300 ml-4">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="px-2 py-1 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-purple-600 dark:text-purple-400 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 underline underline-offset-4 decoration-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    code: ({ value }: any) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative my-8 group"
      >
        {/* Glassmorphic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/10 -z-10" />

        {/* Code header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200/50 dark:border-white/10">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {value.language || "code"}
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Code content */}
        <pre className="px-6 py-4 overflow-x-auto">
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
            {value.code}
          </code>
        </pre>
      </motion.div>
    ),
    image: ({ value }: any) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative my-12 group"
      >
        {/* Glassmorphic container */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 backdrop-blur-sm">
          <div className="relative aspect-video">
            <Image
              src={urlFor(value).width(1200).quality(90).url()}
              alt={value.alt || "Blog post image"}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Caption */}
        {value.caption && (
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 italic">
            {value.caption}
          </p>
        )}
      </motion.div>
    ),
  },
};

// Scroll to top button
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/40 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Main component props
interface BlogPostContentProps {
  post: any;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentInViewRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate reading time
  const readingTime =
    post?.body && Array.isArray(post.body)
      ? calculateReadingTimeFromBlocks(post.body)
      : "5 min read";

  // Get primary category
  const primaryCategory =
    post?.categories && post.categories.length > 0
      ? post.categories[0].title || post.categories[0]
      : "Article";

  // Format date
  const formattedDate = new Date(post?.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Get author info
  const authorName = post?.author?.name || "Chris Norton Jr";
  const authorRole =
    post?.author?.role ||
    "Web Developer, Engineer, and Tech Enthusiast";
  const authorImage = post?.author?.image
    ? urlFor(post?.author.image).width(200).height(200).quality(90).url()
    : avi;

  return (
    <div className="relative mt-8 min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Animated particles */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} delay={i * 0.2} />
          ))}
        </div>
      )}

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </motion.div>

        {/* Hero section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <div className="relative px-6 py-2 rounded-full group">
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />

              {/* Glassmorphic background */}
              <div className="absolute inset-[1px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full" />

              {/* Content */}
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {primaryCategory}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 dark:from-purple-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
              {post?.title}
            </span>
          </motion.h1>

          {/* Excerpt */}
          {post?.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              {post?.excerpt}
            </motion.p>
          )}

          {/* Author card and meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center gap-6"
          >
            {/* Author card */}
            <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl group">
              {/* Glassmorphic background */}
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl" />

              {/* Avatar */}
              <div className="relative z-10">
                {authorImage ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                    <Image
                      src={authorImage}
                      alt={authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>

              {/* Author info */}
              <div className="relative z-10">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {authorName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {authorRole}
                </p>
              </div>
            </div>

            {/* Stat badges */}
            <div className="flex flex-wrap gap-3">
              {/* Date */}
              <div className="relative px-4 py-2 rounded-xl group">
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl" />
                <div className="relative flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Reading time */}
              <div className="relative px-4 py-2 rounded-xl group">
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl" />
                <div className="relative flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {readingTime}
                  </span>
                </div>
              </div>

              {/* Views (if available) */}
              {post?.views && (
                <div className="relative px-4 py-2 rounded-xl group">
                  <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl" />
                  <div className="relative flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {post.views.toLocaleString()} views
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Video or Image */}
      
        <FeaturedMedia post={post} heroInView={heroInView} />
        {/* <FeaturedMedia
                      video={post.video}
                      image={post.image}
                      title={post.title}
                    /> */}

        {/* Article content */}
        <motion.article
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div ref={contentInViewRef}>
            {/* Content container with glassmorphism */}
            <div className="relative px-8 py-12 rounded-3xl">
              {/* Glassmorphic background */}
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl -z-10" />

              {/* PortableText content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post?.body &&
                Array.isArray(post.body) &&
                post.body.length > 0 ? (
                  <PortableText
                    value={post.body}
                    components={portableTextComponents}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    No content available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Tags section */}
        {post?.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="relative px-8 py-6 rounded-2xl">
              {/* Glassmorphic background */}
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl" />

              <div className="relative flex items-center gap-4 flex-wrap">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Tags:
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: any, index: number) => {
                    // Handle both string tags and object tags from Sanity
                    const tagText =
                      typeof tag === "string"
                        ? tag
                        : tag.title || tag.name || tag;
                    const tagKey =
                      typeof tag === "string"
                        ? tag
                        : tag._id || tag.slug || `tag-${index}`;

                    return (
                      <motion.span
                        key={tagKey}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="relative px-4 py-2 rounded-xl cursor-pointer group"
                      >
                        {/* Glassmorphic background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 dark:group-hover:from-purple-500/30 dark:group-hover:to-pink-500/30 transition-all duration-300" />

                        <span className="relative text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          #{tagText}
                        </span>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Share section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button className="relative px-8 py-4 rounded-2xl group">
            {/* Gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

            {/* Glassmorphic background */}
            <div className="absolute inset-[2px] bg-white dark:bg-gray-900 backdrop-blur-xl rounded-2xl" />

            {/* Content */}
            <div className="relative flex items-center gap-3">
              <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Share this article
              </span>
            </div>
          </button>
        </motion.div>

        {/* Back to blog link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/blog"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl group"
          >
            {/* Glassmorphic background */}
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" />

            <BookOpen className="relative w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
            <span className="relative font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Explore more articles
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
