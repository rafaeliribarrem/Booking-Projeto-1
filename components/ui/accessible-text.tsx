import React from "react";
import { cn } from "@/lib/utils";
import {
  validatedColorCombinations,
  screenReader,
} from "@/lib/utils/accessibility";

interface AccessibleTextProps {
  /**
   * Text content
   */
  children: React.ReactNode;

  /**
   * Validated color combination
   */
  colorScheme?: "primary" | "secondary" | "accent" | "interactive";

  /**
   * Text size (affects contrast requirements)
   */
  size?: "small" | "normal" | "large";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Screen reader only text
   */
  srOnly?: boolean;

  /**
   * ARIA label for additional context
   */
  ariaLabel?: string;

  /**
   * ARIA described by ID
   */
  ariaDescribedBy?: string;

  /**
   * Live region for dynamic content
   */
  liveRegion?: "polite" | "assertive" | "off";

  /**
   * HTML element type
   */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Accessible text component with validated color combinations
 */
export function AccessibleText({
  children,
  colorScheme = "primary",
  size = "normal",
  className,
  srOnly = false,
  ariaLabel,
  ariaDescribedBy,
  liveRegion,
  as: Component = "span",
}: AccessibleTextProps) {
  // Get validated color classes based on scheme
  const colorClasses = {
    primary: "text-sand-900", // Passes AAA on cream-50/sand-50
    secondary: "text-sand-700", // Passes AA on cream-50
    accent: "text-terracotta-600", // Passes AA on cream-50
    interactive: "text-terracotta-600 hover:text-terracotta-700", // Passes AA
  };

  // Size-based classes
  const sizeClasses = {
    small: "text-sm", // 14px - needs higher contrast
    normal: "text-base", // 16px - standard contrast
    large: "text-lg", // 18px+ - can use lower contrast
  };

  return (
    <Component
      className={cn(
        colorClasses[colorScheme],
        sizeClasses[size],
        srOnly && screenReader.only,
        className
      )}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-live={liveRegion}
    >
      {children}
    </Component>
  );
}

/**
 * Accessible heading component with proper semantic levels
 */
interface AccessibleHeadingProps {
  /**
   * Semantic heading level
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Visual size (can differ from semantic level)
   */
  visualSize?: "small" | "medium" | "large" | "xlarge";

  /**
   * Heading content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for additional context
   */
  ariaLabel?: string;
}

export function AccessibleHeading({
  level,
  visualSize = "medium",
  children,
  className,
  ariaLabel,
}: AccessibleHeadingProps) {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;

  // Visual size classes (independent of semantic level)
  const visualClasses = {
    small: "text-lg md:text-xl font-semibold",
    medium: "text-xl md:text-2xl lg:text-3xl font-semibold",
    large: "text-2xl md:text-3xl lg:text-4xl font-bold",
    xlarge: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold",
  };

  return (
    <Component
      className={cn(
        "text-sand-900 font-display leading-tight", // Passes AAA contrast
        visualClasses[visualSize],
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}

/**
 * Accessible link component with proper focus states
 */
interface AccessibleLinkProps {
  /**
   * Link destination
   */
  href: string;

  /**
   * Link content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * External link (opens in new tab)
   */
  external?: boolean;

  /**
   * ARIA label for additional context
   */
  ariaLabel?: string;

  /**
   * Describes the link purpose
   */
  ariaDescribedBy?: string;
}

export function AccessibleLink({
  href,
  children,
  className,
  external = false,
  ariaLabel,
  ariaDescribedBy,
}: AccessibleLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        // Color with sufficient contrast
        "text-terracotta-600 hover:text-terracotta-700",
        // Focus states
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2",
        // Underline for clarity
        "underline underline-offset-2 hover:underline-offset-4",
        // Smooth transitions
        "transition-all duration-200",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {children}
      {external && (
        <span className={screenReader.only}>(opens in new tab)</span>
      )}
    </a>
  );
}

/**
 * Accessible status message component
 */
interface AccessibleStatusProps {
  /**
   * Status type
   */
  type: "success" | "error" | "warning" | "info";

  /**
   * Message content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Live region urgency
   */
  urgency?: "polite" | "assertive";
}

export function AccessibleStatus({
  type,
  children,
  className,
  urgency = "polite",
}: AccessibleStatusProps) {
  const statusClasses = {
    success: "text-sage-700 bg-sage-50 border-sage-200",
    error: "text-terracotta-700 bg-terracotta-50 border-terracotta-200",
    warning: "text-clay-700 bg-clay-50 border-clay-200",
    info: "text-sand-700 bg-sand-50 border-sand-200",
  };

  const statusIcons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div
      className={cn("p-4 rounded-base border", statusClasses[type], className)}
      role="status"
      aria-live={urgency}
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 font-bold" aria-hidden="true">
          {statusIcons[type]}
        </span>
        <div className="flex-1">
          <span className={screenReader.only}>
            {type === "error"
              ? "Error: "
              : type === "warning"
              ? "Warning: "
              : type === "success"
              ? "Success: "
              : "Info: "}
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}
