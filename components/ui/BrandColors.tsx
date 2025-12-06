// VIBRANT BRAND COLORS - Enhanced saturation and brightness
// Signature burgundy, deep magenta, soft purple, and rose gold
// Now with MORE PUNCH and vibrancy while maintaining sophistication

// ENHANCED PRIMARY BRAND GRADIENTS
const brandGradients = {
  // Main brand gradient (vibrant burgundy to magenta)
  primary: "from-[#A01848] to-[#D63D7F]",
  primaryLight: "from-[#D63D7F] to-[#F5A5C8]",
  primaryDark: "from-[#7A0F30] to-[#A01848]",

  // Sophisticated accent (vibrant purple to rose gold)
  accent: "from-[#9854B8] to-[#F5A5C8]",
  accentLight: "from-[#F5A5C8] to-[#FFE5F0]",
  accentDark: "from-[#6B2D8A] to-[#9854B8]",

  // Tech flow (multi-stop with enhanced vibrancy)
  tech: "from-[#A01848] via-[#9854B8] to-[#D63D7F]",

  // Ultra vibrant variants for high-impact elements
  ultraVibrant: "from-[#C21E5B] to-[#FF4D9A]",
  ultraAccent: "from-[#B565E0] to-[#FF88CC]",
};

// UPDATED CLASS MAPPINGS WITH VIBRANT COLORS
const classUpdates = {
  // Main gradient - significantly more vibrant
  light: "from-[#A01848] to-[#D63D7F]",
  dark: "dark:from-[#D63D7F] dark:to-[#F5A5C8]",
  combined: "from-[#A01848] to-[#D63D7F] dark:from-[#D63D7F] dark:to-[#F5A5C8]",

  // Hover states with enhanced vibrancy
  hoverBorder: "hover:border-[#A01848] dark:hover:bg-[#F5A5C8]",

  // Text accent with vivid colors
  textAccent: "text-[#9854B8] dark:text-[#F5A5C8]",

  // Subtle gradient with more presence
  subtleGradient:
    "from-[#A01848]/15 to-[#F5A5C8]/25 dark:from-[#A01848]/40 dark:to-[#D63D7F]/40 text-[#A01848] dark:text-[#F5A5C8]",
};

// VIBRANT OVERLAY CLASSES
const overlayClass =
  "absolute inset-0 bg-gradient-to-br from-[#A01848]/97 to-[#D63D7F]/97 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center";

const overlayClassWithDarkMode =
  "absolute inset-0 bg-gradient-to-br from-[#A01848]/97 to-[#D63D7F]/97 dark:from-[#D63D7F]/95 dark:to-[#F5A5C8]/95 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center";

const overlayClassWithPattern =
  "absolute inset-0 bg-gradient-to-br from-[#A01848]/97 to-[#D63D7F]/97 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]";

const overlayClassAccent =
  "absolute inset-0 bg-gradient-to-br from-[#9854B8]/97 to-[#F5A5C8]/97 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center";

const overlayClassTech =
  "absolute inset-0 bg-gradient-to-br from-[#A01848]/97 via-[#9854B8]/97 to-[#D63D7F]/97 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center";

// Ultra vibrant overlay for hero sections
const overlayClassUltra =
  "absolute inset-0 bg-gradient-to-br from-[#C21E5B]/97 to-[#FF4D9A]/97 backdrop-blur-sm p-6 sm:p-8 opacity-0 translate-y-5 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto flex flex-col justify-center";

// ADDITIONAL COLOR GRADIENTS (Enhanced vibrancy)
const gradients = {
  // YELLOW - More golden and vibrant
  yellow: {
    default: "bg-gradient-to-br from-amber-400 to-yellow-500 dark:from-amber-400 dark:to-yellow-500",
    subtle:
      "from-amber-100 to-yellow-200 dark:from-amber-900/40 dark:to-yellow-800/40",
    text: "text-amber-600 dark:text-amber-400",
  },

  // GREEN - Vivid emerald
  green: {
    default: "bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-500 dark:to-green-600",
    subtle:
      "from-emerald-100 to-green-200 dark:from-emerald-900/40 dark:to-green-800/40",
    text: "text-emerald-600 dark:text-emerald-400",
  },

  // RED - Bold and striking
  red: {
    default: "bg-gradient-to-br from-rose-600 to-red-700 dark:from-rose-500 dark:to-red-600",
    subtle: "from-rose-100 to-red-200 dark:from-rose-900/40 dark:to-red-800/40",
    text: "text-rose-600 dark:text-rose-400",
  },

  // ORANGE - Fiery and energetic
  orange: {
    default: "bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500",
    subtle:
      "from-orange-100 to-red-200 dark:from-orange-900/40 dark:to-red-800/40",
    text: "text-orange-600 dark:text-orange-400",
  },

  // SKY BLUE - Bright and electric
  skyBlue: {
    default: "bg-gradient-to-br from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500",
    subtle: "from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-800/40",
    text: "text-sky-600 dark:text-sky-400",
  },

  // BLUE - Deep and vibrant
  blue: {
    default: "bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500",
    subtle:
      "from-blue-100 to-cyan-200 dark:from-blue-900/40 dark:to-cyan-800/40",
    text: "text-blue-600 dark:text-blue-400",
  },

  // PURPLE - Rich and royal
  purple: {
    default: "bg-gradient-to-br from-purple-600 to-violet-700 dark:from-purple-500 dark:to-violet-600",
    subtle:
      "from-purple-100 to-violet-200 dark:from-purple-900/40 dark:to-violet-800/40",
    text: "text-purple-600 dark:text-purple-400",
  },

  // SLATE/CHARCOAL - Deep with contrast
  slate: {
    default:
      "bg-gradient-to-br from-slate-700 to-gray-800 dark:from-slate-600 dark:to-gray-700",
    subtle:
      "from-slate-200 to-gray-300 dark:from-slate-800/60 dark:to-gray-900/60",
    text: "text-slate-700 dark:text-slate-400",
  },

  // FUSCHIA - Bold and eye-catching
  fuschia: {
    default:
      "bg-gradient-to-br from-fuchsia-600 to-pink-700 dark:from-fuchsia-500 dark:to-pink-600",
    subtle:
      "from-fuchsia-100 to-pink-200 dark:from-fuchsia-900/40 dark:to-pink-800/40",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
  },

  // LIGHT GRAY/SMOKE - Warm neutrals
  smoke: {
    default:
      "bg-gradient-to-br from-gray-300 to-slate-400 dark:from-gray-600 dark:to-slate-700",
    subtle:
      "from-gray-100 to-slate-200 dark:from-gray-800/40 dark:to-slate-900/40",
    text: "text-gray-600 dark:text-gray-400",
  },
};

// USAGE EXAMPLES WITH VIBRANT COLORS
const brand = {
  // Brand primary button - more vibrant
  brandButton:
    "bg-gradient-to-r from-[#A01848] to-[#D63D7F] hover:from-[#7A0F30] hover:to-[#A01848] text-white shadow-lg shadow-[#D63D7F]/30",

  // Brand accent card - enhanced purple to rose
  brandCard:
    "bg-gradient-to-br from-[#9854B8] to-[#F5A5C8] dark:from-[#6B2D8A] dark:to-[#9854B8]",

  // Subtle brand background - more noticeable
  brandSubtle:
    "from-[#A01848]/10 to-[#F5A5C8]/20 dark:from-[#A01848]/30 dark:to-[#D63D7F]/30",

  // Badge with vibrant brand colors
  brandBadge:
    "bg-gradient-to-r from-[#A01848] to-[#D63D7F] text-white shadow-md",

  // Text gradient - eye-catching
  brandText:
    "bg-gradient-to-r from-[#A01848] to-[#D63D7F] bg-clip-text text-transparent",

  // Ultra vibrant hero
  heroUltra: "bg-gradient-to-br from-[#C21E5B] to-[#FF4D9A] text-white",

  // Vibrant accent highlight
  accentHighlight: "bg-gradient-to-r from-[#B565E0] to-[#FF88CC] text-white",

  // Status colors
  yellowStatus:
    "bg-gradient-to-br from-amber-500 to-yellow-600 dark:from-amber-400 dark:to-yellow-500",
  greenSuccess:
    "bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-500 dark:to-green-600",
  redError:
    "bg-gradient-to-br from-rose-600 to-red-700 dark:from-rose-500 dark:to-red-600",
};

// VIBRANT COLOR REFERENCE
const colors = {
  // Enhanced burgundy/maroon
  burgundy: {
    base: "#A01848", // More saturated burgundy
    light: "#C21E5B", // Brighter burgundy
    dark: "#7A0F30", // Deeper burgundy
  },

  // Enhanced magenta/rose
  magenta: {
    base: "#D63D7F", // Vibrant magenta
    light: "#FF4D9A", // Bright hot pink
    ultraLight: "#F5A5C8", // Soft rose
  },

  // Enhanced purple
  purple: {
    base: "#9854B8", // Vivid purple
    light: "#B565E0", // Bright lavender
    dark: "#6B2D8A", // Deep purple
  },

  // Enhanced charcoal (same as original - already vibrant)
  charcoal: {
    base: "#2C2C2C",
    light: "#404040",
    dark: "#1a1a1a",
  },

  // Enhanced warm whites
  warm: {
    white: "#FEFCFC",
    light: "#FFE5F0", // Warmer, more pink-tinted
    cream: "#F8F6F7",
  },
};

export {
  brandGradients,
  classUpdates,
  gradients,
  brand,
  overlayClass,
  overlayClassWithDarkMode,
  overlayClassWithPattern,
  overlayClassAccent,
  overlayClassTech,
  overlayClassUltra,
  colors,
};
