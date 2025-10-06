import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { cn } from '@/lib/utils'
import { Footer } from "@/components/layout/Footer";
import icon from "@images/Logo.jpg"


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chris Norton - Software Engineer",
    template: "%s | Chris Norton",
  },
  description: "System Architect Chris Norton | Scalable software engineering, web development & automation solutions. Build once. Scale forever. Portfolio & insights.",
  keywords: [
    'system architect',
    'automation',
    'software engineering',
    'devops',
    'web development',
    'scalable systems',
    'process automation',
    'strategic consulting',
    'christopher norton',
    'chris norton jr',
    'fullstack developer',
    'system design',
    'technical leadership'
  ],
  authors: [{ name: 'Christopher Norton', url: 'https://chrisnortonjr.com' }],
  creator: 'Christopher Norton',
  publisher: 'Christopher Norton',
  
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chrisnortonjr.com',
    title: 'Christopher Norton - The System Architect',
    description: 'Build systems that scale. Results with precision.',
    siteName: 'Christopher Norton Portfolio',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Christopher Norton - System Architect',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Christopher Norton - The System Architect',
    description: 'Build systems that scale. Results with precision.',
    images: ['/favicon.ico'],
    creator: '@theWebTechNinja',
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'your-google-verification-code',
  },
  
  alternates: {
    canonical: 'https://chrisnortonjr.com',
  },
}

// Viewport configuration for modern devices
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#8B1538',
}

interface RootLayoutProps {
  children: React.ReactNode
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(
        'scroll-smooth antialiased',
        inter.variable,
        jetbrainsMono.variable,
        playfairDisplay.variable
      )}
      suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Favicon and app icons */}
        <link rel="icon" href={"/favicon.ico"} sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Analytics and performance monitoring */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      {/* <Provider> */}
          <body className={`${inter.variable} ${jetbrainsMono.variable} font-primary bg-bg-primary text-text-primary selection:bg-deep-magenta/20 selection:text-signature-burgundy antialiased`}>
            {/* Skip link for accessibility */}
          <Navigation />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-100 bg-signature-burgundy text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Skip to main content
        </a>
        
        {/* Main application */}
        <div id="app" className="min-h-screen flex flex-col">
          {children}
             </div>
        
        {/* Development tools - only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 z-100 bg-charcoal-gray text-white px-3 py-1 rounded text-xs font-mono">
            DEV
          </div>
          )}
          
            {/* Performance monitoring script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Web Vitals tracking
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                      console.log('CLS:', entry.value);
                    }
                  }
                }).observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
              `,
            }}
          />
        )}
        <Footer />
        </body>
      {/* </Provider> */}
    </html>
  );
}
