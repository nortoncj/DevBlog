"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
  Facebook,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  post: any;
  showLabels?: boolean;
  className?: string;
}

interface ShareButton {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  url: string;
  color: string;
  hoverColor: string;
}

export function ShareButtons({
  post,
  showLabels = false,
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Get the current URL (in production this would be the actual URL)
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://chrisnortonjr.com/blog/${post.slug?.current}`;

  const shareText = `Check out "${post.title}" by Chris Norton Jr`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareButtons: ShareButton[] = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "text-blue-500",
      hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`,
      color: "text-blue-700",
      hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "text-blue-600",
      hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedText}&body=I thought you might find this interesting: ${currentUrl}`,
      color: "text-gray-600 dark:text-gray-400",
      hoverColor: "hover:bg-gray-50 dark:hover:bg-gray-800",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  if (!showLabels) {
    // Compact version for navigation
    return (
      <div className={cn("relative", className)}>
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 text-text-secondary dark:text-gray-400 hover:text-signature-burgundy dark:hover:text-rose-gold transition-colors rounded-lg hover:bg-bg-accent dark:hover:bg-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 size={20} />
          <span className="hidden sm:inline">Share</span>
        </motion.button>

        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-bg-accent dark:border-gray-700 py-2 min-w-[200px] z-50"
          >
            {shareButtons.map((button) => (
              <button
                key={button.name}
                onClick={() => {
                  handleShare(button.url);
                  setShowDropdown(false);
                }}
                className={cn(
                  "w-full px-4 py-3 flex items-center gap-3 text-left transition-colors",
                  button.hoverColor,
                  button.color
                )}
              >
                <button.icon size={18} />
                <span className="font-medium">Share on {button.name}</span>
              </button>
            ))}

            <hr className="my-2 border-bg-accent dark:border-gray-600" />

            <button
              onClick={() => {
                copyToClipboard();
                setShowDropdown(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary dark:text-gray-300"
            >
              {copied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <LinkIcon size={18} />
              )}
              <span className="font-medium">
                {copied ? "Link Copied!" : "Copy Link"}
              </span>
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // Full version with labels
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {shareButtons.map((button, index) => (
        <motion.button
          key={button.name}
          onClick={() => handleShare(button.url)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
            "border border-bg-accent dark:border-gray-700",
            "bg-white dark:bg-gray-800",
            button.color,
            button.hoverColor
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <button.icon size={18} />
          <span>{button.name}</span>
        </motion.button>
      ))}

      <motion.button
        onClick={copyToClipboard}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
          "border border-bg-accent dark:border-gray-700",
          "bg-white dark:bg-gray-800",
          "text-text-secondary dark:text-gray-300",
          "hover:bg-gray-50 dark:hover:bg-gray-700"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shareButtons.length * 0.1 }}
      >
        {copied ? (
          <>
            <Check size={18} className="text-green-500" />
            <span className="text-green-500">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon size={18} />
            <span>Copy Link</span>
          </>
        )}
      </motion.button>
    </div>
  );
}

// Click outside to close dropdown
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
}
