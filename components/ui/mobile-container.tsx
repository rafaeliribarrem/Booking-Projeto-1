import { cn } from "@/lib/utils";
import {
  mobileLayouts,
  touchFriendly,
  mobileA11y,
} from "@/lib/utils/responsive";

interface MobileContainerProps {
  /**
   * Container variant
   */
  variant?: "default" | "centered" | "full-width" | "narrow";

  /**
   * Whether to add safe area padding for mobile devices
   */
  safeArea?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children content
   */
  children: React.ReactNode;

  /**
   * Whether to add focus management
   */
  focusManagement?: boolean;
}

const containerVariants = {
  default: mobileLayouts.container,
  centered: mobileLayouts.centeredContent,
  "full-width": "w-full",
  narrow: "max-w-2xl mx-auto px-4 sm:px-6",
};

export function MobileContainer({
  variant = "default",
  safeArea = false,
  className,
  children,
  focusManagement = false,
}: MobileContainerProps) {
  return (
    <div
      className={cn(
        containerVariants[variant],
        safeArea && "pb-safe-area-inset-bottom",
        focusManagement && mobileA11y.focusVisible,
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Mobile-optimized grid component
 */
interface MobileGridProps {
  /**
   * Number of columns on different screen sizes
   */
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };

  /**
   * Gap between grid items
   */
  gap?: "sm" | "md" | "lg";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children content
   */
  children: React.ReactNode;
}

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function MobileGrid({
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  className,
  children,
}: MobileGridProps) {
  const gridClasses = [
    "grid",
    `grid-cols-${cols.mobile}`,
    cols.tablet && `md:grid-cols-${cols.tablet}`,
    cols.desktop && `lg:grid-cols-${cols.desktop}`,
    gapClasses[gap],
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cn(gridClasses, className)}>{children}</div>;
}

/**
 * Mobile-optimized stack component
 */
interface MobileStackProps {
  /**
   * Direction on different screen sizes
   */
  direction?: {
    mobile?: "vertical" | "horizontal";
    tablet?: "vertical" | "horizontal";
    desktop?: "vertical" | "horizontal";
  };

  /**
   * Spacing between items
   */
  spacing?: "sm" | "md" | "lg";

  /**
   * Alignment
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children content
   */
  children: React.ReactNode;
}

const spacingClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function MobileStack({
  direction = { mobile: "vertical", tablet: "horizontal" },
  spacing = "md",
  align = "start",
  className,
  children,
}: MobileStackProps) {
  const stackClasses = [
    "flex",
    direction.mobile === "vertical" ? "flex-col" : "flex-row",
    direction.tablet &&
      (direction.tablet === "vertical" ? "md:flex-col" : "md:flex-row"),
    direction.desktop &&
      (direction.desktop === "vertical" ? "lg:flex-col" : "lg:flex-row"),
    spacingClasses[spacing],
    alignClasses[align],
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cn(stackClasses, className)}>{children}</div>;
}

/**
 * Touch-friendly button wrapper
 */
interface TouchButtonProps {
  /**
   * Whether this is an icon-only button
   */
  iconOnly?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Button props
   */
  children: React.ReactNode;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
}

export function TouchButton({
  iconOnly = false,
  className,
  children,
  onClick,
  disabled,
  "aria-label": ariaLabel,
}: TouchButtonProps) {
  return (
    <button
      className={cn(
        iconOnly ? touchFriendly.iconButton : touchFriendly.button,
        "transition-colors",
        disabled && "opacity-50 cursor-not-allowed",
        mobileA11y.focusVisible,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

/**
 * Mobile-optimized form field
 */
interface MobileFieldProps {
  /**
   * Field label
   */
  label: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Help text
   */
  help?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Form field content
   */
  children: React.ReactNode;
}

export function MobileField({
  label,
  required,
  error,
  help,
  className,
  children,
}: MobileFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-sand-900">
        {label}
        {required && <span className="text-terracotta-600 ml-1">*</span>}
      </label>
      {children}
      {help && !error && <p className="text-sm text-sand-600">{help}</p>}
      {error && (
        <p className="text-sm text-terracotta-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
