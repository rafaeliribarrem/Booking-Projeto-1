/**
 * Design tokens for the Yoga Booking System
 * Earthy, natural aesthetic with terracotta, sage, sand, clay, and cream colors
 */

export { colors, semanticColors } from "./colors";
export { typography } from "./typography";
export { spacing } from "./spacing";
export { shadows } from "./shadows";
export { borderRadius } from "./borders";

// Import for convenience object
import { colors, semanticColors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { shadows } from "./shadows";
import { borderRadius } from "./borders";

// Re-export all tokens as a single object for convenience
export const tokens = {
  colors,
  semanticColors,
  typography,
  spacing,
  shadows,
  borderRadius,
};
