import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPosts,
  urlFor,
  calculateReadingTimeFromBlocks,
} from "@/lib/sanity";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { PortableText } from "@/components/sanity/PortableText";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}


// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Chris Norton",
    };
  }

  return {
    title: `${post.title} | Chris Norton`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Chris Norton"],
      images: post.image
        ? [
            {
              url: urlFor(post.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.image
        ? [urlFor(post.image).width(1200).height(630).url()]
        : [],
    },
  };
}

// Generate static paths for better performance
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post:any) => ({
    slug: post.slug?.current || post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryName = (categories: any[]) => {
    return categories?.[0]?.title || "General";
  };

  const readingTime = post.body
    ? calculateReadingTimeFromBlocks(post.body)
    : "5 min read";

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-bg-primary/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-bg-accent dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-signature-burgundy dark:hover:text-rose-gold transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to Blog</span>
            </Link>
          </div>
        </div>
      </nav> */}

      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <article className="px-6 pt-12 pb-8">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-signature-burgundy/10 dark:bg-rose-gold/10 text-signature-burgundy dark:text-rose-gold rounded-full text-sm font-medium border border-signature-burgundy/20 dark:border-rose-gold/20">
              {getCategoryName(post.categories)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-text-secondary dark:text-gray-300 mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-text-muted dark:text-gray-400 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-hero dark:bg-signature-burgundy flex items-center justify-center text-white font-semibold">
                CN
              </div>
              <div>
                <div className="text-text-primary dark:text-white font-medium">
                  Chris Norton
                </div>
                <div className="text-sm text-text-muted dark:text-gray-400">
                  System Architect
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{readingTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>
                  {post.body
                    ? `${Math.ceil(post.body.length / 5)} blocks`
                    : "0 blocks"}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12 -mx-6 sm:mx-0 sm:rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-bg-accent dark:bg-gray-800">
                <Image
                  src={urlFor(post.image)
                    .width(1200)
                    .height(630)
                    .quality(95)
                    .url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}
        </article>

        {/* Article Content */}
        <div className="px-6 pb-16">
          {/* Main Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <div
              className="
              prose-headings:text-text-primary dark:prose-headings:text-white
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
              prose-p:text-text-secondary dark:prose-p:text-gray-300
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-signature-burgundy dark:prose-a:text-rose-gold
              prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-primary dark:prose-strong:text-white
              prose-code:text-signature-burgundy dark:prose-code:text-rose-gold
              prose-code:bg-bg-accent dark:prose-code:bg-gray-800
              prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-bg-secondary dark:prose-pre:bg-gray-900
              prose-pre:border prose-pre:border-bg-accent dark:prose-pre:border-gray-700
              prose-blockquote:border-l-signature-burgundy dark:prose-blockquote:border-l-rose-gold
              prose-blockquote:bg-bg-accent dark:prose-blockquote:bg-gray-800/50
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-ul:text-text-secondary dark:prose-ul:text-gray-300
              prose-ol:text-text-secondary dark:prose-ol:text-gray-300
              prose-li:mb-2
              prose-img:rounded-lg prose-img:shadow-lg
            "
            >
              <PortableText value={post.body} />
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: any) => (
                  <span
                    key={tag._id}
                    className="px-4 py-2 bg-bg-accent dark:bg-gray-800 text-text-secondary dark:text-gray-300 rounded-lg text-sm hover:bg-signature-burgundy/10 dark:hover:bg-rose-gold/10 hover:text-signature-burgundy dark:hover:text-rose-gold transition-colors cursor-pointer"
                  >
                    #{tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog Link */}
          <div className="border-t border-bg-accent dark:border-gray-700 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-signature-burgundy dark:text-rose-gold hover:underline font-medium"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
