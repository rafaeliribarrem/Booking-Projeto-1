import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getHeroImageUrl,
  getImageAltText,
  imageOptimization,
  isExternalImage,
} from "@/lib/utils/images";

interface HeroImageProps {
  /**
   * Custom image name or URL
   */
  image?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Overlay opacity (0-100)
   */
  overlayOpacity?: number;

  /**
   * Overlay color (CSS color value)
   */
  overlayColor?: string;

  /**
   * Image priority for loading
   */
  priority?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children to render over the image
   */
  children?: React.ReactNode;

  /**
   * Image quality (1-100)
   */
  quality?: number;

  /**
   * Custom sizes for responsive images
   */
  sizes?: string;
}

export function HeroImage({
  image,
  alt,
  overlayOpacity = 40,
  overlayColor = "rgb(82, 79, 71)", // sand-900
  priority = true,
  className,
  children,
  quality = 85,
  sizes,
}: HeroImageProps) {
  const imageUrl = getHeroImageUrl(image);
  const imageAlt = alt || getImageAltText("hero");
  const isExternal = isExternalImage(imageUrl);

  // Default responsive sizes for hero images
  const responsiveSizes =
    sizes ||
    imageOptimization.getResponsiveSizes({
      mobile: 100,
      tablet: 100,
      desktop: 100,
    });

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority={priority}
          quality={quality}
          sizes={responsiveSizes}
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL={imageOptimization.getBlurDataUrl()}
          // Only use unoptimized for external images if needed
          unoptimized={isExternal}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-current"
        style={{
          color: overlayColor,
          opacity: overlayOpacity / 100,
        }}
      />

      {/* Content */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}

/**
 * Preset hero image variants
 */
export const HeroImageVariants = {
  /**
   * Homepage hero with standard overlay
   */
  Homepage: (
    props: Omit<HeroImageProps, "overlayOpacity" | "overlayColor">
  ) => (
    <HeroImage
      {...props}
      overlayOpacity={40}
      overlayColor="rgb(82, 79, 71)" // sand-900
    />
  ),

  /**
   * Page hero with lighter overlay
   */
  Page: (props: Omit<HeroImageProps, "overlayOpacity" | "overlayColor">) => (
    <HeroImage
      {...props}
      overlayOpacity={30}
      overlayColor="rgb(82, 79, 71)" // sand-900
    />
  ),

  /**
   * Dark hero with stronger overlay
   */
  Dark: (props: Omit<HeroImageProps, "overlayOpacity" | "overlayColor">) => (
    <HeroImage
      {...props}
      overlayOpacity={60}
      overlayColor="rgb(42, 31, 25)" // darker shade
    />
  ),

  /**
   * Light hero with minimal overlay
   */
  Light: (props: Omit<HeroImageProps, "overlayOpacity" | "overlayColor">) => (
    <HeroImage
      {...props}
      overlayOpacity={20}
      overlayColor="rgb(250, 248, 245)" // cream-100
    />
  ),
} as const;
