import { cn } from "@/lib/utils";
import { getBackgroundTextureUrl } from "@/lib/utils/images";

interface BackgroundTextureProps {
  /**
   * Texture name or pattern
   */
  texture?: "linen" | "paper" | "organic" | "subtle-dots" | "none";

  /**
   * Custom texture URL
   */
  customTexture?: string;

  /**
   * Texture opacity (0-100)
   */
  opacity?: number;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children to render over the texture
   */
  children?: React.ReactNode;

  /**
   * Whether to use fixed positioning (for full-page backgrounds)
   */
  fixed?: boolean;
}

// CSS-based texture patterns (no external images needed)
const cssTextures = {
  linen: {
    backgroundImage: `
      radial-gradient(circle at 20% 50%, rgba(245, 244, 241, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(245, 244, 241, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(245, 244, 241, 0.2) 0%, transparent 50%)
    `,
    backgroundSize: "100px 100px, 80px 80px, 120px 120px",
  },
  paper: {
    backgroundImage: `
      linear-gradient(90deg, rgba(245, 244, 241, 0.1) 50%, transparent 50%),
      linear-gradient(rgba(245, 244, 241, 0.1) 50%, transparent 50%)
    `,
    backgroundSize: "2px 2px",
  },
  organic: {
    backgroundImage: `
      radial-gradient(ellipse at top left, rgba(212, 112, 77, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at top right, rgba(125, 135, 104, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at bottom left, rgba(169, 125, 95, 0.05) 0%, transparent 50%)
    `,
    backgroundSize: "400px 400px, 300px 300px, 350px 350px",
  },
  "subtle-dots": {
    backgroundImage: `
      radial-gradient(circle, rgba(245, 244, 241, 0.4) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
  },
};

export function BackgroundTexture({
  texture = "none",
  customTexture,
  opacity = 30,
  backgroundColor = "transparent",
  className,
  children,
  fixed = false,
}: BackgroundTextureProps) {
  const getTextureStyle = () => {
    if (customTexture) {
      return {
        backgroundImage: `url(${getBackgroundTextureUrl(customTexture)})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      };
    }

    if (texture !== "none" && cssTextures[texture]) {
      return cssTextures[texture];
    }

    return {};
  };

  const textureStyle = getTextureStyle();

  return (
    <div
      className={cn(
        "relative",
        fixed && "fixed inset-0 pointer-events-none",
        className
      )}
      style={{
        backgroundColor,
      }}
    >
      {/* Texture Layer */}
      {texture !== "none" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...textureStyle,
            opacity: opacity / 100,
          }}
        />
      )}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * Preset background texture variants
 */
export const BackgroundTextureVariants = {
  /**
   * Subtle linen texture for sections
   */
  Section: (props: Omit<BackgroundTextureProps, "texture" | "opacity">) => (
    <BackgroundTexture {...props} texture="linen" opacity={20} />
  ),

  /**
   * Paper texture for cards
   */
  Card: (props: Omit<BackgroundTextureProps, "texture" | "opacity">) => (
    <BackgroundTexture {...props} texture="paper" opacity={15} />
  ),

  /**
   * Organic texture for hero sections
   */
  Hero: (props: Omit<BackgroundTextureProps, "texture" | "opacity">) => (
    <BackgroundTexture {...props} texture="organic" opacity={25} />
  ),

  /**
   * Subtle dots for backgrounds
   */
  Dots: (props: Omit<BackgroundTextureProps, "texture" | "opacity">) => (
    <BackgroundTexture {...props} texture="subtle-dots" opacity={10} />
  ),

  /**
   * Full page background texture
   */
  Page: (props: Omit<BackgroundTextureProps, "fixed" | "texture">) => (
    <BackgroundTexture {...props} texture="linen" fixed opacity={8} />
  ),
} as const;

/**
 * Hook for applying texture classes directly to elements
 */
export const textureClasses = {
  linen: "bg-gradient-to-br from-sand-50/30 via-transparent to-sand-50/20",
  paper: "bg-gradient-to-r from-sand-50/10 via-transparent to-sand-50/10",
  organic: "bg-gradient-radial from-terracotta-50/5 via-sage-50/5 to-clay-50/5",
  dots: "bg-dotted-sand-100/20",
} as const;
