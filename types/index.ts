/**
 * Strategic Type Definitions for Christopher Norton Portfolio
 * Systematic typing for scalable architecture
 */

// ================================
// Project System Types
// ================================

export type ProjectCategory =
  | "automation"
  | "web-apps"
  | "data"
  | "integrations";

export interface ProjectDetails {
  overview: string;
  challenges: string;
  solution: string;
  results: string;
  features: string[];
  timeline: string;
  client: string;
}

export interface Project {
  id?: number | string;
  _id?: string;
  title: string;
  category?: string | { title: string; slug?: { current: string } };
  categories?: Array<{ title: string; slug?: { current: string } }>;
  description?: string;
  excerpt?: string;
  thumbnail?: string;
  image?: any;
  technologies?: string[];
  techStack?: string[];
  timeline?: {
    duration?: string;
    startDate?: string;
    endDate?: string;
  };
  details?: {
    timeline?: {
      duration?: string;
      startDate?: string;
      endDate?: string;
    };
    [key: string]: any;
  };
  featured?: boolean;
  modal?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  [key: string]: any;
}

// ================================
// Blog System Types
// ================================

export type BlogCategory =
  | "System Design"
  | "Automation"
  | "Strategy"
  | "Development"
  | "Data Engineering"
  | "Technical Leadership";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: BlogCategory;
  date: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  published: boolean;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// ================================
// Contact & Form Types
// ================================

export type ProjectType =
  | "automation"
  | "web-app"
  | "integration"
  | "consulting"
  | "other";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: ProjectType;
  budget?: string;
  timeline?: string;
  message: string;
  newsletter?: boolean;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  interests?: string[];
}

// ================================
// Navigation & UI Types
// ================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

// ================================
// Component Prop Types
// ================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  background?: "primary" | "secondary" | "accent" | "gradient";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export interface CardProps extends BaseComponentProps {
  variant?: "default" | "system" | "blueprint" | "premium";
  interactive?: boolean;
  shadow?: "sm" | "md" | "lg" | "xl";
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

// ================================
// Animation & Intersection Types
// ================================

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode?: "none" | "forwards" | "backwards" | "both";
  iterationCount?: number | "infinite";
}

export interface IntersectionConfig {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

// ================================
// SEO & Metadata Types
// ================================

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    siteName?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  structuredData?: Record<string, any>;
}

// ================================
// API & Response Types
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ================================
// Performance & Analytics Types
// ================================

export interface WebVitals {
  name: string;
  value: number;
  id: string;
  label: "web-vital" | "custom";
}

export interface AnalyticsEvent {
  name: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

// ================================
// Theme & Design System Types
// ================================

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  background: string;
  foreground: string;
  border: string;
}

export interface BreakpointConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

// ================================
// Error Handling Types
// ================================

export interface ErrorInfo {
  message: string;
  stack?: string;
  code?: string | number;
  context?: Record<string, any>;
  timestamp?: Date;
}

export interface FormError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormError[];
}

// ================================
// Filter & Search Types
// ================================

export interface FilterConfig<T = string> {
  key: string;
  label: string;
  options: Array<{
    value: T;
    label: string;
    count?: number;
  }>;
}

export interface SearchConfig {
  placeholder?: string;
  fields: string[];
  minLength?: number;
  debounceMs?: number;
}

export interface SortConfig<T = string> {
  key: string;
  label: string;
  field: T;
  direction: "asc" | "desc";
}

// ================================
// Utility Types
// ================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ================================
// Event Handler Types
// ================================

export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Form event handlers
export type FormSubmitHandler = EventHandler<React.FormEvent<HTMLFormElement>>;
export type InputChangeHandler = EventHandler<
  React.ChangeEvent<HTMLInputElement>
>;
export type TextareaChangeHandler = EventHandler<
  React.ChangeEvent<HTMLTextAreaElement>
>;
export type SelectChangeHandler = EventHandler<
  React.ChangeEvent<HTMLSelectElement>
>;

// Mouse event handlers
export type ClickHandler = EventHandler<React.MouseEvent<HTMLElement>>;
export type HoverHandler = EventHandler<React.MouseEvent<HTMLElement>>;

// Keyboard event handlers
export type KeyDownHandler = EventHandler<React.KeyboardEvent<HTMLElement>>;
export type KeyUpHandler = EventHandler<React.KeyboardEvent<HTMLElement>>;

// ================================
// Component State Types
// ================================

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  lastUpdated?: Date;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface FilterState<T = any> {
  activeFilters: Record<string, T>;
  searchQuery: string;
  sortBy: string;
  sortDirection: "asc" | "desc";
}

// ================================
// Feature Flags & Config Types
// ================================

export interface FeatureFlags {
  experimentalFeatures?: boolean;
  analyticsEnabled?: boolean;
  errorTrackingEnabled?: boolean;
  performanceMonitoring?: boolean;
  darkMode?: boolean;
  blogComments?: boolean;
  contactForm?: boolean;
  newsletter?: boolean;
}

export interface AppConfig {
  apiUrl?: string;
  cdnUrl?: string;
  features: FeatureFlags;
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
  contact?: {
    email: string;
    phone?: string;
    location?: string;
  };
  social: SocialLink[];
}
