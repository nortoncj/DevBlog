/**
 * Sanity CMS Type Definitions
 * Types that match your Sanity schema structure
 */

import { PortableTextBlock } from "@portabletext/types";

// ================================
// Base Sanity Types
// ================================

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityReference {
  _type: "reference";
  _ref: string;
  _key?: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// ================================
// Category & Tag Types
// ================================

export interface SanityCategory extends SanityDocument {
  _type: "category";
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: string;
}

export interface SanityTag extends SanityDocument {
  _type: "tag";
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: string;
}

// ================================
// Post Type (matches your postType)
// ================================

export interface SanityPost extends SanityDocument {
  _type: "post";
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt: string;
  video?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];
  categories?: SanityCategory[];
  tags?: SanityTag[];
}

// ================================
// Project Type (matches your projectType)
// ================================

export interface SanityProject extends SanityDocument {
  _type: "project";
  title: string;
  link: string;
  github?: string;
  image: SanityImage;
  video?: string;
  description: PortableTextBlock[];
  techStack: string[];
  categories?: SanityCategory[];
  tags?: SanityTag[];
}

// ================================
// Transformed Types for Frontend
// ================================

export interface BlogPost {
  id?: string | number;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  image?: SanityImage;
  video?: string;
  content?: PortableTextBlock[];
  categories: SanityCategory[];
  tags: SanityTag[];
  readTime: string;
  featured?: boolean;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: SanityImage;
  video?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  categories: SanityCategory[];
  tags: SanityTag[];
  featured?: boolean;
  content?: PortableTextBlock[];
}

// ================================
// Sanity Query Response Types
// ================================

export interface SanityPostsResponse {
  posts: SanityPost[];
  total: number;
}

export interface SanityProjectsResponse {
  projects: SanityProject[];
  total: number;
}

// ================================
// Filter & Search Types
// ================================

export interface CategoryFilter {
  id: string;
  title: string;
  slug: string;
  count?: number;
}

export interface TagFilter {
  id: string;
  title: string;
  slug: string;
  count?: number;
}

export interface ContentFilters {
  categories: CategoryFilter[];
  tags: TagFilter[];
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// ================================
// Portable Text Component Types
// ================================

export interface CustomPortableTextComponents {
  types?: {
    image?: React.ComponentType<{
      value: SanityImage & {
        alt?: string;
        caption?: string;
      };
    }>;
    video?: React.ComponentType<{
      value: {
        url: string;
        title?: string;
      };
    }>;
    code?: React.ComponentType<{
      value: {
        code: string;
        language?: string;
        filename?: string;
      };
    }>;
  };
  marks?: {
    link?: React.ComponentType<{
      children: React.ReactNode;
      value: {
        href: string;
        blank?: boolean;
      };
    }>;
    code?: React.ComponentType<{
      children: React.ReactNode;
    }>;
  };
  block?: {
    h1?: React.ComponentType<{ children: React.ReactNode }>;
    h2?: React.ComponentType<{ children: React.ReactNode }>;
    h3?: React.ComponentType<{ children: React.ReactNode }>;
    h4?: React.ComponentType<{ children: React.ReactNode }>;
    normal?: React.ComponentType<{ children: React.ReactNode }>;
    blockquote?: React.ComponentType<{ children: React.ReactNode }>;
  };
  list?: {
    bullet?: React.ComponentType<{ children: React.ReactNode }>;
    number?: React.ComponentType<{ children: React.ReactNode }>;
  };
  listItem?: {
    bullet?: React.ComponentType<{ children: React.ReactNode }>;
    number?: React.ComponentType<{ children: React.ReactNode }>;
  };
}

// ================================
// API Response Types
// ================================

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

// ================================
// Sanity Studio Preview Types
// ================================

export interface PreviewProps {
  title?: string;
  subtitle?: string;
  media?: SanityImage;
  description?: string;
}

// ================================
// Search & Pagination Types
// ================================

export interface SearchParams {
  query?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchResults<T> {
  results: T[];
  pagination: PaginationInfo;
  filters: ContentFilters;
}

// ================================
// Utility Types
// ================================

export type SanityImageAsset = {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
    blurHash?: string;
  };
};

export type SanityImageWithAsset = SanityImage & {
  asset: SanityImageAsset;
};

// ================================
// Form Types for Sanity Integration
// ================================

export interface SanityFormData {
  title: string;
  slug?: string;
  content: PortableTextBlock[];
  categories?: string[];
  tags?: string[];
  image?: File | SanityImage;
  publishedAt?: string;
  excerpt?: string;
}

// ================================
// Webhook Types
// ================================

export interface SanityWebhookPayload {
  _type: string;
  _id: string;
  operation: "create" | "update" | "delete";
  document: SanityDocument;
  previous?: SanityDocument;
}

export interface RevalidationRequest {
  paths: string[];
  type: "post" | "project" | "page";
  operation: "create" | "update" | "delete";
}
