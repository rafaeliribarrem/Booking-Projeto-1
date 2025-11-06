/**
 * Responsive design utilities for mobile-first development
 */

/**
 * Breakpoint values matching Tailwind CSS defaults
 */
export const breakpoints = {
  sm: 640, // Small devices (landscape phones)
  md: 768, // Medium devices (tablets)
  lg: 1024, // Large devices (desktops)
  xl: 1280, // Extra large devices
  "2xl": 1536, // 2X large devices
} as const;

/**
 * Common responsive patterns for class names
 */
export const responsivePatterns = {
  // Grid layouts
  grid: {
    singleToDouble: "grid-cols-1 md:grid-cols-2",
    singleToTriple: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    singleToQuad: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    autoFit: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  },

  // Flex layouts
  flex: {
    stackToRow: "flex-col sm:flex-row",
    rowToStack: "flex-row sm:flex-col",
    centerToStart: "items-center sm:items-start",
    centerToEnd: "items-center sm:items-end",
  },

  // Spacing
  spacing: {
    responsive: "gap-4 md:gap-6 lg:gap-8",
    padding: "px-4 lg:px-8",
    margin: "mx-4 lg:mx-8",
  },

  // Typography
  text: {
    heroResponsive: "text-4xl md:text-5xl lg:text-6xl",
    headingResponsive: "text-2xl md:text-3xl lg:text-4xl",
    bodyResponsive: "text-base md:text-lg",
    smallResponsive: "text-sm md:text-base",
  },

  // Touch targets
  touch: {
    minimum: "min-h-[44px] min-w-[44px]",
    button: "h-11 px-6 py-3 min-h-[44px]",
    input: "h-11 min-h-[44px]",
  },

  // Visibility
  visibility: {
    mobileOnly: "block md:hidden",
    desktopOnly: "hidden md:block",
    tabletUp: "hidden md:block",
    mobileToTablet: "block lg:hidden",
  },
} as const;

/**
 * Mobile-first responsive utilities
 */
export const mobileFirst = {
  /**
   * Check if current screen size matches breakpoint
   */
  isBreakpoint: (breakpoint: keyof typeof breakpoints): boolean => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= breakpoints[breakpoint];
  },

  /**
   * Get responsive class names based on screen size
   */
  getResponsiveClasses: (
    mobile: string,
    tablet?: string,
    desktop?: string
  ): string => {
    const classes = [mobile];
    if (tablet) classes.push(`md:${tablet}`);
    if (desktop) classes.push(`lg:${desktop}`);
    return classes.join(" ");
  },

  /**
   * Generate responsive grid classes
   */
  gridCols: (mobile: number, tablet?: number, desktop?: number): string => {
    const classes = [`grid-cols-${mobile}`];
    if (tablet) classes.push(`md:grid-cols-${tablet}`);
    if (desktop) classes.push(`lg:grid-cols-${desktop}`);
    return classes.join(" ");
  },

  /**
   * Generate responsive text size classes
   */
  textSize: (mobile: string, tablet?: string, desktop?: string): string => {
    const classes = [`text-${mobile}`];
    if (tablet) classes.push(`md:text-${tablet}`);
    if (desktop) classes.push(`lg:text-${desktop}`);
    return classes.join(" ");
  },
} as const;

/**
 * Touch-friendly interaction utilities
 */
export const touchFriendly = {
  /**
   * Minimum touch target size (44x44px)
   */
  minTouchTarget: "min-h-[44px] min-w-[44px]",

  /**
   * Button with proper touch target
   */
  button: "h-11 px-6 py-3 min-h-[44px] touch-manipulation",

  /**
   * Input with proper touch target
   */
  input: "h-11 min-h-[44px] touch-manipulation",

  /**
   * Link with proper touch target
   */
  link: "min-h-[44px] flex items-center touch-manipulation",

  /**
   * Icon button with proper touch target
   */
  iconButton: "h-11 w-11 min-h-[44px] min-w-[44px] touch-manipulation",
} as const;

/**
 * Common mobile layout patterns
 */
export const mobileLayouts = {
  /**
   * Full-width container with responsive padding
   */
  container: "w-full px-4 sm:px-6 lg:px-8",

  /**
   * Centered content with max width
   */
  centeredContent: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

  /**
   * Card grid that stacks on mobile
   */
  cardGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

  /**
   * Two-column layout that stacks on mobile
   */
  twoColumn: "grid grid-cols-1 lg:grid-cols-2 gap-8",

  /**
   * Sidebar layout that stacks on mobile
   */
  sidebar: "grid grid-cols-1 lg:grid-cols-4 gap-8",

  /**
   * Navigation that becomes hamburger on mobile
   */
  navigation: "hidden md:flex md:items-center md:gap-6",

  /**
   * Mobile menu overlay
   */
  mobileMenu: "fixed inset-0 z-50 md:hidden",
} as const;

/**
 * Performance optimizations for mobile
 */
export const mobilePerformance = {
  /**
   * Lazy loading for images below the fold
   */
  lazyImage: "loading-lazy",

  /**
   * Reduce motion for users who prefer it
   */
  reduceMotion: "motion-reduce:transition-none motion-reduce:animate-none",

  /**
   * Optimize touch interactions
   */
  touchOptimized: "touch-manipulation select-none",

  /**
   * Prevent zoom on input focus (iOS)
   */
  preventZoom: "text-base", // 16px minimum to prevent zoom
} as const;

/**
 * Accessibility helpers for mobile
 */
export const mobileA11y = {
  /**
   * Screen reader only text
   */
  srOnly: "sr-only",

  /**
   * Focus visible styles
   */
  focusVisible:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500",

  /**
   * Skip to main content link
   */
  skipLink:
    "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50",

  /**
   * High contrast mode support
   */
  highContrast: "contrast-more:border-2 contrast-more:border-current",
} as const;
