import { Metadata } from "next";
     import { notFound } from "next/navigation";
	import BlogPostContent from "@/components/blog/BlogContent";
     	import { getPosts, getPostBySlug } from "@/lib/sanity";
     	
     	// Type for async params in Next.js 13+
     	type PageProps = {
     	  params: Promise<{ slug: string }>;
     	};
    	
    	// Generate static params for all blog posts
    	export async function generateStaticParams() {
    	  const posts = await getPosts();
    	  return posts.map((post: any) => ({
    	    slug: post.slug?.current || post.slug,
    	  }));
    	}
    	
    	// Generate metadata for SEO
    	export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    	  const resolvedParams = await params;
    	  const slug = resolvedParams.slug;
    	  const post = await getPostBySlug(slug);
    	
    	  if (!post) {
    	    return {
    	      title: "Post Not Found",
    	    };
    	  }
    	
    	  const { title, excerpt, image, author, publishedAt, categories } = post;
    	
    	  // Build OpenGraph image URL
    	  const ogImage = image
    	    ? typeof image === "string"
    	      ? image
    	      : image.asset?.url || ""
    	    : "";
    	
    	  return {
    	    title: `${title} | Chris Norton Jr Blog`,
    	    description: excerpt || `Read ${title} on Chris Norton Jr's Blog`,
    	    authors: author?.name ? [{ name: author.name }] : undefined,
    	    openGraph: {
    	      title,
    	      description: excerpt,
    	      type: "article",
    	      publishedTime: publishedAt,
    	      authors: author?.name ? [author.name] : undefined,
    	      images: ogImage ? [{ url: ogImage }] : [],
    	      tags: categories?.map((cat: any) => cat.title || cat) || [],
    	    },
    	    twitter: {
    	      card: "summary_large_image",
    	      title,
    	      description: excerpt,
    	      images: ogImage ? [ogImage] : [],
    	    },
    	  };
    	}
    	
    	// Main blog post page component (SERVER COMPONENT)
    	export default async function BlogPostPage({ params }: PageProps) {
    	  const resolvedParams = await params;
    	  const slug = resolvedParams.slug;
    	  
    	  console.log("Fetching post with slug:", slug);
    	  const post = await getPostBySlug(slug);
    	  console.log("Post data:", post ? "Found" : "Not found");
    	  console.log("Post title:", post?.title);
    	  console.log("Post body:", post?.body ? "Has body" : "No body");
    	
    	  if (!post) {
    	    notFound();
    	  }
    	
    	  // JSON-LD structured data for SEO
    	  const jsonLd = {
    	    "@context": "https://schema.org",
    	    "@type": "BlogPosting",
    	    headline: post.title,
    	    description: post.excerpt,
    	    image: post.image?.asset?.url || "",
    	    datePublished: post.publishedAt,
    	    dateModified: post._updatedAt || post.publishedAt,
    	    author: {
    	      "@type": "Person",
    	      name: post.author?.name || "Chris Norton Jr",
    	      url: "https://chrisnortonjr.com",
    	    },
    	    publisher: {
    	      "@type": "Person",
    	      name: "Chris Norton Jr",
    	    },
    	  };
    	
    	  return (
    	    <>
    	      {/* JSON-LD for structured data */}
   	      <script
   	        type="application/ld+json"
   	        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
   	      />
   	
   	      {/* Client component for animations and interactivity */}
   	      <BlogPostContent post={post} />
   	    </>
   	  );
   	}
   	