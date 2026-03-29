/**
 * BlogIndexPage - SERVER COMPONENT
 *
 * Optimized for Sanity Free Tier:
 * - Server-side data fetching (runs once during build/revalidate)
 * - No client-side API calls
 * - React.cache() for request deduplication
 * - Client component handles UI interactions (search/filter)
 */

import {
  getPosts,
  getFeaturedPosts,
  getCategories,
  calculateReadingTimeFromBlocks,
  urlFor,
} from "@/lib/sanity";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Blog - Engineering Insights | Chris Norton Jr",
  description:
    "Deep technical insights, architectural patterns, and systematic approaches to building scalable enterprise systems.",
};

// Revalidate every 12 hours (optimized for Sanity free tier)
export const revalidate = 43200;

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

// Server Component - Fetches data once
export default async function BlogIndexPage() {
  // Fetch all data in parallel on the server
  const [sanityPosts, sanityFeaturedPosts, sanityCategories] =
    await Promise.all([getPosts(), getFeaturedPosts(), getCategories()]);

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

  // Pass data to client component for interactive features
  return (
    <BlogIndexClient
      initialPosts={transformedPosts}
      initialFeaturedPosts={transformedFeatured}
      initialCategories={categoryTitles}
    />
  );
}
