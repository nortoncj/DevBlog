import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Strategic utility function for conditional class merging
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Debounce function for performance optimization
 * Prevents excessive function calls during rapid events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * Ensures function is called at most once per specified interval
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Format date string for consistent display
 * Strategic date formatting for blog posts and project timelines
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * Format date for relative display (e.g., "2 days ago")
 * Useful for dynamic content timestamps
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
}

/**
 * Generate slugs for URLs from titles
 * Strategic URL generation for blog posts and projects
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Truncate text with ellipsis
 * Strategic text truncation for excerpts and descriptions
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

/**
 * Calculate reading time for blog posts
 * Strategic reading time estimation (average 200 words per minute)
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

/**
 * Validate email addresses
 * Strategic email validation for forms
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format phone numbers
 * Strategic phone number formatting for contact information
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11 && cleaned[0] === "1") {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phoneNumber; // Return original if format doesn't match
}

/**
 * Strategic scroll utilities
 */
export const scrollUtils = {
  /**
   * Smooth scroll to element by ID
   */
  scrollToElement: (elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  },

  /**
   * Get current scroll position
   */
  getScrollPosition: () => ({
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }),

  /**
   * Check if element is in viewport
   */
  isInViewport: (element: HTMLElement, threshold: number = 0) => {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  },
};

/**
 * Strategic animation utilities
 */
export const animationUtils = {
  /**
   * Create staggered animation delay
   */
  getStaggerDelay: (index: number, baseDelay: number = 100) => {
    return index * baseDelay;
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: () => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  },

  /**
   * Safe animation wrapper that respects user preferences
   */
  safeAnimate: (callback: () => void, fallback?: () => void) => {
    if (animationUtils.prefersReducedMotion()) {
      fallback && fallback();
    } else {
      callback();
    }
  },
};

/**
 * Strategic performance utilities
 */
export const performanceUtils = {
  /**
   * Preload images for better performance
   */
  preloadImages: (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  },

  /**
   * Lazy load images with intersection observer
   */
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  },

  /**
   * Measure and log Web Vitals
   */
  measureWebVitals: () => {
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log("LCP:", entry.startTime);
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // @ts-ignore
          console.log("FID:", entry.processingStart - entry.startTime);
        }
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // @ts-ignore
          if (!entry.hadRecentInput) {
            // @ts-ignore
            console.log("CLS:", entry.value);
          }
        }
      }).observe({ entryTypes: ["layout-shift"] });
    }
  },
};

/**
 * Strategic error handling
 */
export const errorUtils = {
  /**
   * Log error with context
   */
  logError: (error: Error, context?: string) => {
    if (process.env.NODE_ENV === "development") {
      console.error(`[${context || "Error"}]:`, error);
    } else {
      // In production, send to error tracking service
      // Example: Sentry, LogRocket, etc.
    }
  },

  /**
   * Safe JSON parse
   */
  safeJsonParse: <T>(json: string, fallback: T): T => {
    try {
      return JSON.parse(json);
    } catch {
      return fallback;
    }
  },

  /**
   * Retry function with exponential backoff
   */
  retryWithBackoff: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) throw error;

        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error("Max retries exceeded");
  },
};

/**
 * Strategic local storage utilities
 */
export const storageUtils = {
  /**
   * Safe localStorage setItem
   */
  setItem: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Safe localStorage getItem
   */
  getItem: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Safe localStorage removeItem
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};
