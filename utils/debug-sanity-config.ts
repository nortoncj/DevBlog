/**
 * Utility to debug Sanity configuration and data fetching
 */

import { validateSanityConfig } from "@/lib/sanity";

export function debugSanityConfiguration() {
  console.log("🔧 === SANITY CONFIGURATION DEBUG ===");

  // Check environment variables
  console.log("Environment Variables:");
  console.log(
    "- NEXT_PUBLIC_SANITY_PROJECT_ID:",
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "SET" : "MISSING"
  );
  console.log(
    "- NEXT_PUBLIC_SANITY_DATASET:",
    process.env.NEXT_PUBLIC_SANITY_DATASET || "MISSING"
  );
  console.log(
    "- SANITY_API_TOKEN:",
    process.env.SANITY_API_TOKEN ? "SET" : "MISSING"
  );

  // Check validation result
  const isValid = validateSanityConfig();
  console.log("- validateSanityConfig():", isValid);

  // Environment check
  console.log("- NODE_ENV:", process.env.NODE_ENV);

  if (!isValid) {
    console.log("❌ Sanity is NOT properly configured");
    console.log(
      "This means the system will use static project data instead of Sanity CMS"
    );
  } else {
    console.log("✅ Sanity appears to be properly configured");
    console.log("The system should fetch real data from Sanity CMS");
  }

  console.log("🔧 === END SANITY CONFIG DEBUG ===");

  return isValid;
}

// Make it available in browser console for testing
if (typeof window !== "undefined") {
  (window as any).debugSanityConfig = debugSanityConfiguration;
}
