/**
 * Responsive typography system for the Yoga Booking System
 * Provides consistent, scalable text sizing across all devices
 */

/**
 * Base typography scale following a modular scale
 * Based on 16px base size with 1.25 ratio (major third)
 */
export const typographyScale = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
  "8xl": "6rem", // 96px
  "9xl": "8rem", // 128px
} as const;

/**
 * Responsive typography classes for different text types
 */
export const responsiveTypography = {
  // Hero text - largest, most impactful
  hero: {
    mobile: "text-4xl", // 36px
    tablet: "md:text-5xl", // 48px
    desktop: "lg:text-6xl", // 60px
    large: "xl:text-7xl", // 72px
    combined: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  },

  // Display headings - for major sections
  display: {
    mobile: "text-3xl", // 30px
    tablet: "md:text-4xl", // 36px
    desktop: "lg:text-5xl", // 48px
    large: "xl:text-6xl", // 60px
    combined: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  },

  // Main headings - for page titles
  heading: {
    mobile: "text-2xl", // 24px
    tablet: "md:text-3xl", // 30px
    desktop: "lg:text-4xl", // 36px
    large: "xl:text-5xl", // 48px
    combined: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  },

  // Subheadings - for section titles
  subheading: {
    mobile: "text-xl", // 20px
    tablet: "md:text-2xl", // 24px
    desktop: "lg:text-3xl", // 30px
    large: "xl:text-4xl", // 36px
    combined: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  },

  // Large body text - for important content
  bodyLarge: {
    mobile: "text-lg", // 18px
    tablet: "md:text-xl", // 20px
    desktop: "lg:text-2xl", // 24px
    combined: "text-lg md:text-xl lg:text-2xl",
  },

  // Regular body text - for most content
  body: {
    mobile: "text-base", // 16px
    tablet: "md:text-lg", // 18px
    desktop: "lg:text-xl", // 20px
    combined: "text-base md:text-lg lg:text-xl",
  },

  // Small body text - for secondary content
  bodySmall: {
    mobile: "text-sm", // 14px
    tablet: "md:text-base", // 16px
    desktop: "lg:text-lg", // 18px
    combined: "text-sm md:text-base lg:text-lg",
  },

  // Caption text - for labels and metadata
  caption: {
    mobile: "text-xs", // 12px
    tablet: "md:text-sm", // 14px
    desktop: "lg:text-base", // 16px
    combined: "text-xs md:text-sm lg:text-base",
  },

  // Button text - optimized for touch targets
  button: {
    mobile: "text-base", // 16px (prevents zoom on iOS)
    tablet: "md:text-lg", // 18px
    combined: "text-base md:text-lg",
  },

  // Input text - optimized for forms
  input: {
    mobile: "text-base", // 16px (prevents zoom on iOS)
    tablet: "md:text-lg", // 18px
    combined: "text-base md:text-lg",
  },
} as const;

/**
 * Line height utilities for better readability
 */
export const lineHeights = {
  tight: "leading-tight", // 1.25
  snug: "leading-snug", // 1.375
  normal: "leading-normal", // 1.5
  relaxed: "leading-relaxed", // 1.625
  loose: "leading-loose", // 2
} as const;

/**
 * Font weight utilities
 */
export const fontWeights = {
  light: "font-light", // 300
  normal: "font-normal", // 400
  medium: "font-medium", // 500
  semibold: "font-semibold", // 600
  bold: "font-bold", // 700
  extrabold: "font-extrabold", // 800
} as const;

/**
 * Font family utilities
 */
export const fontFamilies = {
  sans: "font-sans", // Inter
  display: "font-display", // Playfair Display
  mono: "font-mono", // Monospace
} as const;

/**
 * Complete typography presets for common use cases
 */
export const typographyPresets = {
  // Hero section text
  heroTitle: `${responsiveTypography.hero.combined} ${fontFamilies.display} ${fontWeights.bold} ${lineHeights.tight}`,

  // Page titles
  pageTitle: `${responsiveTypography.heading.combined} ${fontFamilies.display} ${fontWeights.bold} ${lineHeights.tight}`,

  // Section headings
  sectionHeading: `${responsiveTypography.subheading.combined} ${fontFamilies.display} ${fontWeights.semibold} ${lineHeights.snug}`,

  // Card titles
  cardTitle: `${responsiveTypography.bodyLarge.combined} ${fontFamilies.sans} ${fontWeights.semibold} ${lineHeights.snug}`,

  // Body paragraphs
  bodyText: `${responsiveTypography.body.combined} ${fontFamilies.sans} ${fontWeights.normal} ${lineHeights.relaxed}`,

  // Lead paragraphs
  leadText: `${responsiveTypography.bodyLarge.combined} ${fontFamilies.sans} ${fontWeights.normal} ${lineHeights.relaxed}`,

  // Small text
  smallText: `${responsiveTypography.bodySmall.combined} ${fontFamilies.sans} ${fontWeights.normal} ${lineHeights.normal}`,

  // Caption text
  captionText: `${responsiveTypography.caption.combined} ${fontFamilies.sans} ${fontWeights.medium} ${lineHeights.normal}`,

  // Button text
  buttonText: `${responsiveTypography.button.combined} ${fontFamilies.sans} ${fontWeights.medium} ${lineHeights.normal}`,

  // Input text
  inputText: `${responsiveTypography.input.combined} ${fontFamilies.sans} ${fontWeights.normal} ${lineHeights.normal}`,
} as const;

/**
 * Accessibility-focused typography utilities
 */
export const accessibleTypography = {
  // High contrast text
  highContrast: "contrast-more:text-black contrast-more:font-bold",

  // Focus-visible text
  focusVisible:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500",

  // Screen reader only text
  srOnly: "sr-only",

  // Reduced motion
  reduceMotion: "motion-reduce:transition-none",

  // Minimum font size for touch targets
  touchFriendly: "text-base", // 16px minimum to prevent zoom on iOS
} as const;

/**
 * Color-aware typography utilities
 */
export const colorTypography = {
  // Primary text colors
  primary: "text-sand-900",
  secondary: "text-sand-700",
  muted: "text-sand-600",

  // Accent colors
  accent: "text-terracotta-600",
  success: "text-sage-600",
  warning: "text-clay-600",
  error: "text-terracotta-600",

  // Light text for dark backgrounds
  light: "text-cream-50",
  lightSecondary: "text-cream-100",

  // Interactive text
  link: "text-terracotta-600 hover:text-terracotta-700",
  linkLight: "text-cream-50 hover:text-cream-100",
} as const;

/**
 * Utility functions for dynamic typography
 */
export const typographyUtils = {
  /**
   * Get responsive text size classes
   */
  getResponsiveText: (
    mobile: keyof typeof typographyScale,
    tablet?: keyof typeof typographyScale,
    desktop?: keyof typeof typographyScale
  ): string => {
    const classes = [`text-${mobile}`];
    if (tablet) classes.push(`md:text-${tablet}`);
    if (desktop) classes.push(`lg:text-${desktop}`);
    return classes.join(" ");
  },

  /**
   * Combine typography classes
   */
  combine: (...classes: string[]): string => {
    return classes.filter(Boolean).join(" ");
  },

  /**
   * Get text color based on background
   */
  getTextColor: (background: "light" | "dark" | "accent"): string => {
    switch (background) {
      case "light":
        return colorTypography.primary;
      case "dark":
        return colorTypography.light;
      case "accent":
        return colorTypography.light;
      default:
        return colorTypography.primary;
    }
  },
} as const;

/**
 * Typography component props interface
 */
export interface TypographyProps {
  variant?: keyof typeof typographyPresets;
  size?: keyof typeof responsiveTypography;
  weight?: keyof typeof fontWeights;
  family?: keyof typeof fontFamilies;
  color?: keyof typeof colorTypography;
  className?: string;
  children: React.ReactNode;
}
