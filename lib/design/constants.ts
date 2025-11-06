/**
 * Design System Constants
 * Use ONLY these values throughout the application for consistency
 */

// COLORS - Use only these exact values
export const COLORS = {
  // Primary action color
  primary: "terracotta-500",
  primaryHover: "terracotta-600",
  primaryActive: "terracotta-700",

  // Secondary action color
  secondary: "sage-500",
  secondaryHover: "sage-600",

  // Backgrounds
  bgMain: "cream-50",
  bgSection: "sand-50",
  bgCard: "cream-100",
  bgElevated: "sand-50",

  // Text
  textPrimary: "sand-900",
  textSecondary: "sand-700",
  textTertiary: "sand-600",
  textInverse: "cream-50",

  // Borders
  border: "sand-200",
  borderStrong: "sand-300",

  // Icons (always use text color or sand-700)
  icon: "sand-700",

  // Status
  success: "sage-600",
  warning: "clay-500",
  error: "terracotta-600",
} as const;

// TYPOGRAPHY - Use only these rules
export const TYPOGRAPHY = {
  // Font families
  body: "Inter", // Default for all text
  display: "Playfair Display", // ONLY for h1 and hero titles

  // When to use font-display class:
  // - Page hero titles (h1)
  // - Large section headings (h2 on landing pages)
  // - Logo
  // DO NOT use for: cards, small headings, body text, buttons
} as const;

// SPACING - Use consistent spacing
export const SPACING = {
  section: "py-20", // Between major sections
  card: "p-6", // Inside cards
  cardLarge: "p-8", // Inside large cards
} as const;

// RULES
export const DESIGN_RULES = {
  // NO gradients anywhere
  noGradients: true,

  // Button colors
  buttonPrimary: `bg-${COLORS.primary} hover:bg-${COLORS.primaryHover} text-${COLORS.textInverse}`,
  buttonSecondary: `bg-${COLORS.secondary} hover:bg-${COLORS.secondaryHover} text-${COLORS.textInverse}`,
  buttonOutline: `border-2 border-${COLORS.borderStrong} text-${COLORS.textPrimary} hover:bg-${COLORS.bgSection}`,
  buttonGhost: `text-${COLORS.textPrimary} hover:bg-sand-100`,

  // Icon colors - always inherit text color or use sand-700
  iconColor: COLORS.icon,

  // Card backgrounds - always cream-100 or sand-50
  cardBg: COLORS.bgCard,
} as const;
