import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  getInstructorImageUrl,
  getImageAltText,
  isExternalImage,
} from "@/lib/utils/images";

interface InstructorAvatarProps {
  /**
   * Instructor name for generating fallback and alt text
   */
  instructorName: string;

  /**
   * Custom image URL or filename
   */
  image?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Avatar size variant
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether to show a border
   */
  bordered?: boolean;

  /**
   * Custom fallback background color
   */
  fallbackColor?: "sage" | "terracotta" | "clay" | "sand";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const fallbackColorClasses = {
  sage: "bg-sage-100 text-sage-700",
  terracotta: "bg-terracotta-100 text-terracotta-700",
  clay: "bg-clay-100 text-clay-700",
  sand: "bg-sand-100 text-sand-700",
};

export function InstructorAvatar({
  instructorName,
  image,
  alt,
  size = "md",
  className,
  bordered = false,
  fallbackColor = "sage",
}: InstructorAvatarProps) {
  const imageUrl = getInstructorImageUrl(instructorName, image);
  const imageAlt = alt || getImageAltText("instructor", instructorName);

  // Generate initials from instructor name
  const initials = instructorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Limit to 2 characters

  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        bordered && "ring-2 ring-sand-200",
        className
      )}
    >
      {imageUrl && (
        <AvatarImage
          src={imageUrl}
          alt={imageAlt}
          // Only use unoptimized for external images if needed
          {...(isExternalImage(imageUrl) && { unoptimized: true })}
        />
      )}
      <AvatarFallback className={fallbackColorClasses[fallbackColor]}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

/**
 * Preset instructor avatar variants
 */
export const InstructorAvatarVariants = {
  /**
   * Small avatar for lists and cards
   */
  Small: (props: Omit<InstructorAvatarProps, "size">) => (
    <InstructorAvatar {...props} size="sm" />
  ),

  /**
   * Medium avatar for general use
   */
  Medium: (props: Omit<InstructorAvatarProps, "size">) => (
    <InstructorAvatar {...props} size="md" />
  ),

  /**
   * Large avatar for profiles
   */
  Large: (props: Omit<InstructorAvatarProps, "size" | "bordered">) => (
    <InstructorAvatar {...props} size="lg" bordered />
  ),

  /**
   * Extra large avatar for detailed profiles
   */
  Profile: (props: Omit<InstructorAvatarProps, "size" | "bordered">) => (
    <InstructorAvatar {...props} size="xl" bordered />
  ),

  /**
   * Sage colored fallback
   */
  Sage: (props: Omit<InstructorAvatarProps, "fallbackColor">) => (
    <InstructorAvatar {...props} fallbackColor="sage" />
  ),

  /**
   * Terracotta colored fallback
   */
  Terracotta: (props: Omit<InstructorAvatarProps, "fallbackColor">) => (
    <InstructorAvatar {...props} fallbackColor="terracotta" />
  ),

  /**
   * Clay colored fallback
   */
  Clay: (props: Omit<InstructorAvatarProps, "fallbackColor">) => (
    <InstructorAvatar {...props} fallbackColor="clay" />
  ),
} as const;
