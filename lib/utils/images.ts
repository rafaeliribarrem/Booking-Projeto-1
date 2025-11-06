/**
 * Image utility functions for the Yoga Booking System
 * Handles image URLs, fallbacks, and optimization
 */

// Unsplash collections for yoga-related images
const UNSPLASH_COLLECTIONS = {
  yoga: "1154337", // Yoga poses and practice
  meditation: "1154338", // Meditation and mindfulness
  nature: "1114848", // Natural landscapes
  wellness: "1154339", // Health and wellness
};

// Unsplash keywords for different image types
const YOGA_KEYWORDS = [
  "yoga",
  "meditation",
  "mindfulness",
  "zen",
  "peaceful",
  "serene",
  "nature",
  "wellness",
  "balance",
  "harmony",
];

/**
 * Generate Unsplash URL with yoga-related keywords
 */
export function generateUnsplashUrl(
  width: number,
  height: number,
  keywords?: string[]
): string {
  const baseUrl = "https://images.unsplash.com";
  const defaultKeywords = keywords || YOGA_KEYWORDS;
  const query = defaultKeywords.join(",");

  return `${baseUrl}/${width}x${height}/?${new URLSearchParams({
    q: query,
    fit: "crop",
    crop: "center",
  }).toString()}`;
}

/**
 * Generate Unsplash URL from a specific collection
 */
export function generateUnsplashCollectionUrl(
  width: number,
  height: number,
  collection: keyof typeof UNSPLASH_COLLECTIONS = "yoga"
): string {
  const baseUrl = "https://images.unsplash.com";
  const collectionId = UNSPLASH_COLLECTIONS[collection];

  return `${baseUrl}/collection/${collectionId}/${width}x${height}`;
}

/**
 * Get hero image URL with fallback
 */
export function getHeroImageUrl(imageName?: string): string {
  if (imageName && imageName !== "default") {
    // Check if it's already an external URL
    if (isExternalImage(imageName)) {
      return imageName;
    }
    // Otherwise treat as local image
    const customUrl = `/images/hero/${imageName}`;
    return customUrl;
  }

  // Fallback to Unsplash
  return generateUnsplashUrl(1920, 1080, [
    "yoga",
    "meditation",
    "peaceful",
    "nature",
    "serene",
  ]);
}

/**
 * Get class type image URL with fallback
 */
export function getClassTypeImageUrl(
  classTypeName: string,
  customImage?: string
): string {
  if (customImage) {
    // Check if it's already an external URL
    if (isExternalImage(customImage)) {
      return customImage;
    }
    // Otherwise treat as local image
    return `/images/classes/${customImage}`;
  }

  // Map class types to specific yoga images
  const classTypeImages: Record<string, string> = {
    hatha:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    vinyasa:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    ashtanga:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800",
    yin: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
    hot: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800",
    prenatal:
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800",
    meditation:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    restorative:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
    power:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800",
    flow: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
  };

  // Try to match class type name to an image
  const normalizedName = classTypeName.toLowerCase();
  for (const [key, imageUrl] of Object.entries(classTypeImages)) {
    if (normalizedName.includes(key)) {
      return imageUrl;
    }
  }

  // Default fallback image
  return "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800";
}

/**
 * Get instructor photo URL with fallback
 */
export function getInstructorImageUrl(
  instructorName: string,
  customImage?: string
): string {
  if (customImage) {
    // Check if it's already an external URL
    if (isExternalImage(customImage)) {
      return customImage;
    }
    // Otherwise treat as local image
    return `/images/instructors/${customImage}`;
  }

  // Generate slug from instructor name
  const slug = instructorName.toLowerCase().replace(/\s+/g, "-");
  const customUrl = `/images/instructors/instructor-${slug}.webp`;

  // For now, return null to use Avatar fallback with initials
  // In production, you'd check if the file exists first
  return "";
}

/**
 * Get background texture URL
 */
export function getBackgroundTextureUrl(textureName: string): string {
  return `/images/backgrounds/${textureName}`;
}

/**
 * Generate placeholder image URL with specific colors
 */
export function generatePlaceholderUrl(
  width: number,
  height: number,
  backgroundColor = "f5f4f1", // sand-100
  textColor = "524f47" // sand-900
): string {
  return `https://via.placeholder.com/${width}x${height}/${backgroundColor}/${textColor}?text=Yoga`;
}

/**
 * Get keywords for specific class types
 */
function getClassTypeKeywords(classTypeName: string): string[] {
  const name = classTypeName.toLowerCase();

  const keywordMap: Record<string, string[]> = {
    hatha: ["hatha yoga", "gentle yoga", "slow yoga", "beginner yoga"],
    vinyasa: ["vinyasa yoga", "flow yoga", "dynamic yoga", "movement"],
    ashtanga: ["ashtanga yoga", "power yoga", "strong yoga", "athletic"],
    yin: ["yin yoga", "restorative yoga", "relaxing yoga", "meditation"],
    hot: ["hot yoga", "bikram yoga", "heated yoga", "intense"],
    prenatal: ["prenatal yoga", "pregnancy yoga", "gentle", "motherhood"],
    meditation: ["meditation", "mindfulness", "zen", "peaceful"],
    restorative: ["restorative yoga", "relaxation", "peaceful", "calm"],
  };

  // Find matching keywords
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (name.includes(key)) {
      return [...keywords, "yoga", "wellness"];
    }
  }

  // Default keywords
  return ["yoga", "wellness", "mindfulness", "peaceful"];
}

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  /**
   * Get responsive image sizes for Next.js Image component
   */
  getResponsiveSizes: (breakpoints: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  }) => {
    const { mobile = 100, tablet = 50, desktop = 33, large = 25 } = breakpoints;
    return `(max-width: 640px) ${mobile}vw, (max-width: 768px) ${tablet}vw, (max-width: 1024px) ${desktop}vw, ${large}vw`;
  },

  /**
   * Get advanced responsive sizes for complex layouts
   */
  getAdvancedSizes: (config: {
    mobile: { cols: number; gap: number };
    tablet: { cols: number; gap: number };
    desktop: { cols: number; gap: number };
    large?: { cols: number; gap: number };
  }) => {
    const { mobile, tablet, desktop, large } = config;

    const calcSize = (cols: number, gap: number) =>
      Math.round((100 - gap * (cols - 1)) / cols);

    const sizes = [
      `(max-width: 640px) ${calcSize(mobile.cols, mobile.gap)}vw`,
      `(max-width: 768px) ${calcSize(tablet.cols, tablet.gap)}vw`,
      `(max-width: 1024px) ${calcSize(desktop.cols, desktop.gap)}vw`,
    ];

    if (large) {
      sizes.push(`${calcSize(large.cols, large.gap)}vw`);
    } else {
      sizes.push(`${calcSize(desktop.cols, desktop.gap)}vw`);
    }

    return sizes.join(", ");
  },

  /**
   * Get image dimensions for different use cases
   */
  dimensions: {
    hero: { width: 1920, height: 1080 },
    heroMobile: { width: 768, height: 432 },
    heroTablet: { width: 1024, height: 576 },
    classCard: { width: 800, height: 600 },
    classCardMobile: { width: 400, height: 300 },
    classCardTablet: { width: 600, height: 450 },
    instructorProfile: { width: 400, height: 400 },
    instructorAvatar: { width: 80, height: 80 },
    instructorAvatarLarge: { width: 120, height: 120 },
    thumbnail: { width: 200, height: 150 },
    thumbnailLarge: { width: 300, height: 225 },
  },

  /**
   * Get blur data URL for loading placeholder
   */
  getBlurDataUrl: (color = "f5f4f1") => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#${color}"/></svg>`
    ).toString("base64")}`;
  },

  /**
   * Get optimized image quality based on use case
   */
  getQuality: (
    useCase: "hero" | "card" | "avatar" | "thumbnail" | "background"
  ) => {
    const qualityMap = {
      hero: 90, // High quality for hero images
      card: 85, // Good quality for cards
      avatar: 80, // Medium quality for avatars
      thumbnail: 75, // Lower quality for thumbnails
      background: 70, // Lower quality for backgrounds
    };
    return qualityMap[useCase];
  },

  /**
   * Get responsive image props for Next.js Image
   */
  getResponsiveProps: (
    useCase: "hero" | "card" | "avatar" | "thumbnail",
    customSizes?: string
  ) => {
    const configs = {
      hero: {
        sizes: customSizes || "100vw",
        quality: 90,
        priority: true,
      },
      card: {
        sizes:
          customSizes ||
          "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
        quality: 85,
        priority: false,
      },
      avatar: {
        sizes: customSizes || "80px",
        quality: 80,
        priority: false,
      },
      thumbnail: {
        sizes: customSizes || "200px",
        quality: 75,
        priority: false,
      },
    };

    return {
      ...configs[useCase],
      placeholder: "blur" as const,
      blurDataURL: imageOptimization.getBlurDataUrl(),
    };
  },
};

/**
 * Check if image URL is external (Unsplash, etc.)
 */
export function isExternalImage(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Get image alt text based on context
 */
export function getImageAltText(
  type: "hero" | "class" | "instructor" | "background",
  name?: string
): string {
  switch (type) {
    case "hero":
      return "Peaceful yoga practice in a serene natural setting";
    case "class":
      return name ? `${name} yoga class` : "Yoga class";
    case "instructor":
      return name ? `${name}, yoga instructor` : "Yoga instructor";
    case "background":
      return "Subtle background texture";
    default:
      return "Yoga-related image";
  }
}

/**
 * Image loading priorities for Next.js Image component
 */
export const imagePriorities = {
  hero: true, // Above the fold
  classCards: false, // Below the fold
  instructorPhotos: false, // Below the fold
  backgrounds: false, // Decorative
} as const;
