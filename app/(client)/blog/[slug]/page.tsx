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
import { FeaturedMedia } from "@/components/blog/FeatureMedia";
import avi from "@images/Avatar.jpeg"

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO and OpenGraph
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found | Chris Norton Jr",
        description: "The requested blog post could not be found.",
      };
    }

    // Construct absolute URLs
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://chrisnortonjr.com";
    const postUrl = `${baseUrl}/blog/${slug}`;

    // Get optimized image URL
    const imageUrl = post.image
      ? urlFor(post.image).width(1200).height(630).quality(95).url()
      : `${baseUrl}/images/default-blog-og.jpg`; // Fallback image

    // Clean description (remove HTML and limit length)
    const description = post.excerpt
      ? post.excerpt.substring(0, 160).trim()
      : `Read "${post.title}" by Chris Norton Jr - Strategic insights on system architecture, automation, and technology leadership.`;

    // Get author information
    const author = post.author?.name || "Chris Norton Jr";

    // Get category for keywords
    const category = post.categories?.[0]?.title || "Technology";
    const tags = post.tags?.map((tag: any) => tag.title).join(", ") || "";

    return {
      title: `${post.title} | Chris Norton Jr`,
      description,
      keywords: [
        post.title,
        "Chris Norton Jr",
        "Engineer",
        "Technology Leadership",
        "Automation",
        category,
        ...tags.split(", ").filter(Boolean),
      ].join(", "),
      authors: [{ name: author }],
      creator: author,
      publisher: "Chris Norton Jr",
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        type: "article",
        title: post.title,
        description,
        url: postUrl,
        siteName: "Chris Norton Jr - Engineer",
        locale: "en_US",
        publishedTime: post.publishedAt,
        modifiedTime: post._updatedAt || post.publishedAt,
        authors: [author],
        section: category,
        tags: post.tags?.map((tag: any) => tag.title) || [],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
            type: "image/jpeg",
          },
          // Additional sizes for different platforms
          {
            url: post.image
              ? urlFor(post.image).width(800).height(600).quality(90).url()
              : imageUrl,
            width: 800,
            height: 600,
            alt: post.title,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@thewebtechninja", // Replace with your actual Twitter handle
        creator: "@thewebtechninja", // Replace with your actual Twitter handle
        title: post.title,
        description,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      // Article-specific metadata
      other: {
        "article:published_time": post.publishedAt,
        "article:modified_time": post._updatedAt || post.publishedAt,
        "article:author": author,
        "article:section": category,
        "article:tag": tags,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | Chris Norton Jr",
      description:
        "Strategic insights on system architecture and technology leadership.",
    };
  }
}

// Generate static paths for better performance
export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post: any) => ({
      slug: post.slug?.current || post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
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

  // Structured Data (JSON-LD) for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.image
      ? [
          urlFor(post.image).width(1200).height(630).url(),
          urlFor(post.image).width(800).height(600).url(),
          urlFor(post.image).width(400).height(300).url(),
        ]
      : [],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Chris Norton Jr",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://chrisnortonjr.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Chris Norton Jr",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://chrisnortonjr.com"}/icons/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://chrisnortonjr.com"}/blog/${slug}`,
    },
    articleSection: getCategoryName(post.categories),
    keywords: post.tags?.map((tag: any) => tag.title).join(", ") || "",
    wordCount: post.body ? post.body.length * 5 : 0, // Rough estimate
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-bg-primary dark:bg-gray-950 transition-colors duration-300">
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
                  <Image
                                    src={avi}
                                    alt={post.author?.name}
                                    className="object-cover  duration-300 group-hover:scale-105 rounded-2xl"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                </div>
                <div>
                  <div className="text-text-primary dark:text-white font-medium">
                    {post.author?.name || "Chris Norton"}
                  </div>
                  <div className="text-sm text-text-muted dark:text-gray-400">
                    Engineer
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
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
            <FeaturedMedia
              video={post.video}
              image={post.image}
              title={post.title}
            />
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
    </>
  );
}
