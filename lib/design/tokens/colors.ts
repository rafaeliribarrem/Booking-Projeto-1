/**
 * Color tokens for the earthy design system
 * Inspired by natural materials: terracotta, sage, sand, clay, and cream
 */

export const colors = {
  // Terracotta - Primary brand color
  terracotta: {
    50: "#fdf6f3",
    100: "#fae8e0",
    200: "#f5d0c1",
    300: "#ebb197",
    400: "#e08b6d",
    500: "#d4704d", // Primary
    600: "#c25a3d",
    700: "#a14734",
    800: "#853d30",
    900: "#6f362b",
  },

  // Sage - Secondary color for accents
  sage: {
    50: "#f6f7f4",
    100: "#e9ebe3",
    200: "#d4d8c9",
    300: "#b6bda6",
    400: "#98a184",
    500: "#7d8768", // Secondary
    600: "#636b52",
    700: "#4f5543",
    800: "#424639",
    900: "#383c31",
  },

  // Sand - Neutral backgrounds
  sand: {
    50: "#fafaf9",
    100: "#f5f4f1",
    200: "#e9e7e0",
    300: "#d8d4c8",
    400: "#c4bfaf",
    500: "#afa896", // Neutral
    600: "#8f8a7a",
    700: "#767263",
    800: "#625f54",
    900: "#524f47",
  },

  // Clay - Warm accents
  clay: {
    50: "#faf7f5",
    100: "#f2ebe5",
    200: "#e5d6ca",
    300: "#d3b9a5",
    400: "#bf9a7e",
    500: "#a97d5f", // Accent
    600: "#8f6750",
    700: "#765444",
    800: "#62463b",
    900: "#523c33",
  },

  // Cream - Light backgrounds
  cream: {
    50: "#fdfcfb",
    100: "#faf8f5",
    200: "#f5f1ea",
    300: "#ede7dc",
    400: "#e3d9c9",
    500: "#d6c8b3", // Light
    600: "#b8a68f",
    700: "#9a8874",
    800: "#7f7161",
    900: "#695e51",
  },
} as const;

/**
 * Semantic color mapping for consistent usage across the application
 */
export const semanticColors = {
  primary: colors.terracotta[500],
  primaryHover: colors.terracotta[600],
  primaryActive: colors.terracotta[700],

  secondary: colors.sage[500],
  secondaryHover: colors.sage[600],
  secondaryActive: colors.sage[700],

  accent: colors.clay[500],
  accentHover: colors.clay[600],

  background: colors.cream[50],
  surface: colors.cream[100],
  surfaceElevated: colors.sand[50],

  text: {
    primary: colors.sand[900],
    secondary: colors.sand[700],
    tertiary: colors.sand[600],
    inverse: colors.cream[50],
  },

  border: {
    light: colors.sand[200],
    default: colors.sand[300],
    strong: colors.sand[400],
  },

  status: {
    success: colors.sage[600],
    warning: colors.clay[500],
    error: colors.terracotta[600],
    info: colors.sage[400],
  },
} as const;
