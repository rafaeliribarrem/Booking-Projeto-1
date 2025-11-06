import React from "react";
import { cn } from "@/lib/utils";
import {
  typographyPresets,
  responsiveTypography,
  fontWeights,
  fontFamilies,
  colorTypography,
  lineHeights,
  type TypographyProps,
} from "@/lib/utils/typography";

/**
 * Typography component for consistent text styling
 */
export function Typography({
  variant,
  size,
  weight,
  family,
  color,
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  // Build classes based on props
  const classes = [];

  if (variant) {
    classes.push(typographyPresets[variant]);
  } else {
    // Build custom typography from individual props
    if (size) classes.push(responsiveTypography[size].combined);
    if (weight) classes.push(fontWeights[weight]);
    if (family) classes.push(fontFamilies[family]);
    if (color) classes.push(colorTypography[color]);
  }

  return (
    <span className={cn(classes.join(" "), className)} {...props}>
      {children}
    </span>
  );
}

/**
 * Preset typography components for common use cases
 */
export const TypographyVariants = {
  /**
   * Hero title component
   */
  HeroTitle: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <h1 className={cn(typographyPresets.heroTitle, className)} {...props}>
      {children}
    </h1>
  ),

  /**
   * Page title component
   */
  PageTitle: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <h1 className={cn(typographyPresets.pageTitle, className)} {...props}>
      {children}
    </h1>
  ),

  /**
   * Section heading component
   */
  SectionHeading: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <h2 className={cn(typographyPresets.sectionHeading, className)} {...props}>
      {children}
    </h2>
  ),

  /**
   * Card title component
   */
  CardTitle: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <h3 className={cn(typographyPresets.cardTitle, className)} {...props}>
      {children}
    </h3>
  ),

  /**
   * Body text component
   */
  Body: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <p className={cn(typographyPresets.bodyText, className)} {...props}>
      {children}
    </p>
  ),

  /**
   * Lead text component
   */
  Lead: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <p className={cn(typographyPresets.leadText, className)} {...props}>
      {children}
    </p>
  ),

  /**
   * Small text component
   */
  Small: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <span className={cn(typographyPresets.smallText, className)} {...props}>
      {children}
    </span>
  ),

  /**
   * Caption text component
   */
  Caption: ({
    className,
    children,
    ...props
  }: Omit<TypographyProps, "variant">) => (
    <span className={cn(typographyPresets.captionText, className)} {...props}>
      {children}
    </span>
  ),
} as const;

/**
 * Responsive heading component with automatic semantic levels
 */
interface ResponsiveHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "hero" | "display" | "heading" | "subheading";
  className?: string;
  children: React.ReactNode;
}

export function ResponsiveHeading({
  level,
  size = "heading",
  className,
  children,
}: ResponsiveHeadingProps) {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;

  const sizeClasses = {
    hero: typographyPresets.heroTitle,
    display:
      responsiveTypography.display.combined +
      " " +
      fontFamilies.display +
      " " +
      fontWeights.bold,
    heading:
      responsiveTypography.heading.combined +
      " " +
      fontFamilies.display +
      " " +
      fontWeights.semibold,
    subheading:
      responsiveTypography.subheading.combined +
      " " +
      fontFamilies.sans +
      " " +
      fontWeights.semibold,
  };

  return (
    <Component className={cn(sizeClasses[size], lineHeights.tight, className)}>
      {children}
    </Component>
  );
}

/**
 * Responsive text component with automatic sizing
 */
interface ResponsiveTextProps {
  size?: "large" | "normal" | "small" | "caption";
  weight?: keyof typeof fontWeights;
  color?: keyof typeof colorTypography;
  className?: string;
  children: React.ReactNode;
}

export function ResponsiveText({
  size = "normal",
  weight = "normal",
  color = "primary",
  className,
  children,
}: ResponsiveTextProps) {
  const sizeClasses = {
    large: responsiveTypography.bodyLarge.combined,
    normal: responsiveTypography.body.combined,
    small: responsiveTypography.bodySmall.combined,
    caption: responsiveTypography.caption.combined,
  };

  return (
    <span
      className={cn(
        sizeClasses[size],
        fontWeights[weight],
        colorTypography[color],
        lineHeights.relaxed,
        className
      )}
    >
      {children}
    </span>
  );
}
