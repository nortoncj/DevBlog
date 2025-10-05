"use client";

import { PortableText as SanityPortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { getOptimizedImageUrl } from "@/lib/sanity-transform";
import { cn } from "@/lib/utils";


interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

// Custom components for rendering Sanity Portable Text
const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-bg-accent">
            <Image
              src={getOptimizedImageUrl(value, {
                width: 800,
                height: 450,
                quality: 90,
              })}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-sm text-text-muted text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    video: ({ value }: { value: { url: string; title?: string } }) => {
      if (!value?.url) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-bg-accent">
            <video
              src={value.url}
              controls
              className="w-full h-full object-cover"
              title={value.title}
            />
          </div>
          {value.title && (
            <figcaption className="mt-3 text-sm text-text-muted text-center italic">
              {value.title}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({
      value,
    }: {
      value: { code: string; language?: string; filename?: string };
    }) => {
      return (
        <div className="my-6">
          {value.filename && (
            <div className="bg-charcoal-gray text-silver-accent px-4 py-2 text-sm font-mono rounded-t-lg border-b border-silver-accent/20">
              {value.filename}
            </div>
          )}
          <pre
            className={cn(
              "bg-charcoal-gray text-light-gray p-4 rounded-lg overflow-x-auto font-mono text-sm",
              value.filename ? "rounded-t-none" : ""
            )}
          >
            <code className={`language-${value.language || "text"}`}>
              {value.code}
            </code>
          </pre>
        </div>
      );
    },
  },

  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: { href: string; blank?: boolean };
    }) => {
      const isExternal = value.href?.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={value.href}
            target={value.blank ? "_blank" : "_self"}
            rel={value.blank ? "noopener noreferrer" : undefined}
            className="text-signature-burgundy hover:text-deep-magenta underline decoration-2 underline-offset-2 transition-colors"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={value.href}
          className="text-signature-burgundy hover:text-deep-magenta underline decoration-2 underline-offset-2 transition-colors"
        >
          {children}
        </Link>
      );
    },

    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-bg-accent text-soft-purple px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),

    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),

    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-text-secondary">{children}</em>
    ),
  },

  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),

    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl lg:text-3xl font-semibold text-text-primary mt-10 mb-5 first:mt-0 border-b-2 border-rose-gold pb-2">
        {children}
      </h2>
    ),

    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl lg:text-2xl font-semibold text-signature-burgundy mt-8 mb-4 first:mt-0">
        {children}
      </h3>
    ),

    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-lg lg:text-xl font-medium text-text-primary mt-6 mb-3 first:mt-0">
        {children}
      </h4>
    ),

    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-text-secondary leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),

    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-signature-burgundy bg-bg-secondary pl-6 py-4 my-6 italic text-lg text-text-primary rounded-r-lg">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 my-4 text-text-secondary pl-4">
        {children}
      </ul>
    ),

    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 text-text-secondary pl-4">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),

    number: ({ children }: { children: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

export function PortableText({ value, className }: PortableTextProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
      <SanityPortableText value={value} components={components} />
    </div>
  );
}

// Simplified version for excerpts and previews
export function PortableTextPreview({
  value,
  length = 200,
  className,
}: {
  value: PortableTextBlock[];
  length?: number;
  className?: string;
}) {
  if (!value || !Array.isArray(value)) return null;

  // Extract plain text for preview
  const text = value
    .filter((block) => block._type === "block")
    .map(
      (block) =>
        // @ts-ignore - Sanity block structure
        block.children?.map((child) => child.text).join("") || ""
    )
    .join(" ")
    .trim();

  const truncated =
    text.length > length
      ? text.slice(0, length).replace(/\s+\S*$/, "") + "..."
      : text;

  return (
    <p className={cn("text-text-secondary leading-relaxed", className)}>
      {truncated}
    </p>
  );
}
