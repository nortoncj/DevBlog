import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface FeaturedMediaProps {
  video?: string;
  image?: any;
  title: string;
  className?: string;
}

// Extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Check if URL is a valid YouTube URL
function isYouTubeUrl(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}

export function FeaturedMedia({
  video,
  image,
  title,
  className = "",
}: FeaturedMediaProps) {
  // Prioritize video if it exists and is a valid YouTube URL
  const hasValidVideo = video && isYouTubeUrl(video);
  const videoId = hasValidVideo ? getYouTubeVideoId(video) : null;

  // Return null if no media is available
  if (!hasValidVideo && !image) {
    return null;
  }

  return (
    <div
      className={`mb-12 -mx-6 sm:mx-0 sm:rounded-2xl overflow-hidden ${className}`}
    >
      <div className="relative aspect-video bg-bg-accent dark:bg-gray-800">
        {hasValidVideo && videoId ? (
          // YouTube video embed
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&color=white`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : image ? (
          // Fallback to image
          <Image
            src={urlFor(image).width(1200).height(630).quality(95).url()}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        ) : null}
      </div>
    </div>
  );
}
