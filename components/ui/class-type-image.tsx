import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getClassTypeImageUrl,
  getImageAltText,
  imageOptimization,
  isExternalImage,
} from "@/lib/utils/images";

interface ClassTypeImageProps {
  /**
   * Class type name for generating fallback images
   */
  classTypeName: string;

  /**
   * Custom image URL or filename
   */
  image?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Image dimensions
   */
  width?: number;
  height?: number;

  /**
   * Whether to fill the container
   */
  fill?: boolean;

  /**
   * Image priority for loading
   */
  priority?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Image quality (1-100)
   */
  quality?: number;

  /**
   * Custom sizes for responsive images
   */
  sizes?: string;

  /**
   * Whether to show hover effects
   */
  hover?: boolean;
}

export function ClassTypeImage({
  classTypeName,
  image,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  quality = 85,
  sizes,
  hover = false,
}: ClassTypeImageProps) {
  const imageUrl = getClassTypeImageUrl(classTypeName, image);
  const imageAlt = alt || getImageAltText("class", classTypeName);
  const isExternal = isExternalImage(imageUrl);

  // Default responsive sizes for class type images
  const responsiveSizes =
    sizes ||
    imageOptimization.getResponsiveSizes({
      mobile: 100,
      tablet: 50,
      desktop: 33,
    });

  const imageProps = {
    src: imageUrl,
    alt: imageAlt,
    priority,
    quality,
    className: cn(
      "object-cover object-center",
      hover && "transition-transform group-hover:scale-105",
      className
    ),
    placeholder: "blur" as const,
    blurDataURL: imageOptimization.getBlurDataUrl(),
    unoptimized: isExternal,
  };

  if (fill) {
    return <Image {...imageProps} fill sizes={responsiveSizes} />;
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
        sizes={responsiveSizes}
      />
    );
  }

  // Default dimensions for class type images
  const defaultDimensions = imageOptimization.dimensions.classCard;

  return (
    <Image
      {...imageProps}
      width={defaultDimensions.width}
      height={defaultDimensions.height}
      sizes={responsiveSizes}
    />
  );
}

/**
 * Preset class type image variants
 */
export const ClassTypeImageVariants = {
  /**
   * Card image for session cards
   */
  Card: (props: Omit<ClassTypeImageProps, "fill" | "hover">) => (
    <ClassTypeImage
      {...props}
      fill
      hover
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  ),

  /**
   * Thumbnail image for lists
   */
  Thumbnail: (props: Omit<ClassTypeImageProps, "width" | "height">) => (
    <ClassTypeImage
      {...props}
      width={imageOptimization.dimensions.thumbnail.width}
      height={imageOptimization.dimensions.thumbnail.height}
      sizes="200px"
    />
  ),

  /**
   * Hero image for class detail pages
   */
  Hero: (props: Omit<ClassTypeImageProps, "fill" | "priority">) => (
    <ClassTypeImage {...props} fill priority sizes="100vw" />
  ),

  /**
   * Mobile optimized card image
   */
  MobileCard: (props: Omit<ClassTypeImageProps, "fill" | "hover">) => (
    <ClassTypeImage {...props} fill hover sizes="100vw" />
  ),
} as const;
