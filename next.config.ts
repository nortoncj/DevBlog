import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.tailwindcss.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
              "media-src 'self' https:",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
  /* config options here */
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
    // Disable experimental features that may conflict with Sanity
    // reactCompiler: true,  // Disabled for Sanity compatibility
    // ppr: true,  // Disabled for Sanity compatibility
  },
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/webp", "image/avif"],
    domains: [
      "images.unsplash.com",
      "thumbs.dreamstime.com",
      "static.vecteezy.com",
      "www.shutterstock.com",
      "cdn.sanity.io", // Sanity CDN for dynamic images
    ],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
