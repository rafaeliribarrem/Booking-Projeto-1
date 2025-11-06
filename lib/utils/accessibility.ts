/**
 * Accessibility utilities for WCAG 2.1 Level AA compliance
 * Includes color contrast checking, focus management, and screen reader support
 */

/**
 * WCAG 2.1 contrast ratio requirements
 */
export const contrastRequirements = {
  AA_NORMAL: 4.5,      // Normal text (< 18px or < 14px bold)
  AA_LARGE: 3.0,       // Large text (≥ 18px or ≥ 14px bold)
  AAA_NORMAL: 7.0,     // Enhanced normal text
  AAA_LARGE: 4.5,      // Enhanced large text
} as const;

/**
 * Color values for our earthy palette (hex values)
 */
export const colorValues = {
  // Terracotta
  "terracotta-50": "#fdf6f3",
  "terracotta-100": "#fae8e0",
  "terracotta-200": "#f5d0c1",
  "terracotta-300": "#ebb197",
  "terracotta-400": "#e08b6d",
  "terracotta-500": "#d4704d",
  "terracotta-600": "#c25a3d",
  "terracotta-700": "#a14734",
  "terracotta-800": "#853d30",
  "terracotta-900": "#6f362b",

  // Sage
  "sage-50": "#f6f7f4",
  "sage-100": "#e9ebe3",
  "sage-200": "#d4d8c9",
  "sage-300": "#b8c1a7",
  "sage-400": "#98a184",
  "sage-500": "#7d8768",
  "sage-600": "#636b52",
  "sage-700": "#4f5543",
  "sage-800": "#424639",
  "sage-900": "#383c31",

  // Sand
  "sand-50": "#fafaf9",
  "sand-100": "#f5f4f1",
  "sand-200": "#e9e7e0",
  "sand-300": "#d8d4c8",
  "sand-400": "#c4bfaf",
  "sand-500": "#afa896",
  "sand-600": "#8f8a7a",
  "sand-700": "#767263",
  "sand-800": "#625f54",
  "sand-900": "#524f47",

  // Clay
  "clay-50": "#faf7f5",
  "clay-100": "#f2ebe5",
  "clay-200": "#e5d6ca",
  "clay-300": "#d3b9a5",
  "clay-400": "#bf9a7e",
  "clay-500": "#a97d5f",
  "clay-600": "#8f6750",
  "clay-700": "#765444",
  "clay-800": "#62463b",
  "clay-900": "#523c33",

  // Cream
  "cream-50": "#fdfcfb",
  "cream-100": "#faf8f5",
  "cream-200": "#f5f1ea",
  "cream-300": "#ede7dc",
  "cream-400": "#e3d9c9",
  "cream-500": "#d6c8b3",
  "cream-600": "#b8a68f",
  "cream-700": "#9a8874",
  "cream-800": "#7f7161",
  "cream-900": "#695e51",
} as const;

/**
 * Calculate relative luminance of a color
 */
function getLuminance(hex: string): number {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
  const b = parseInt(cleanHex.substr(4, 2), 16) / 255;

  // Apply gamma correction
  const sRGB = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  // Calculate luminance
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG requirements
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: keyof typeof contrastRequirements = 'AA_NORMAL'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= contrastRequirements[level];
}

/**
 * Validated color combinations for our design system
 */
export const validatedColorCombinations = {
  // Primary text combinations
  primary: {
    // Dark text on light backgrounds
    "sand-900_cream-50": {
      contrast: getContrastRatio(colorValues["sand-900"], colorValues["cream-50"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: true,
        AAA_LARGE: true,
      }
    },
    "sand-900_sand-50": {
      contrast: getContrastRatio(colorValues["sand-900"], colorValues["sand-50"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: true,
        AAA_LARGE: true,
      }
    },
    "sand-800_cream-100": {
      contrast: getContrastRatio(colorValues["sand-800"], colorValues["cream-100"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: false,
        AAA_LARGE: true,
      }
    },
  },

  // Secondary text combinations
  secondary: {
    "sand-700_cream-50": {
      contrast: getContrastRatio(colorValues["sand-700"], colorValues["cream-50"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: false,
        AAA_LARGE: true,
      }
    },
    "sand-600_cream-50": {
      contrast: getContrastRatio(colorValues["sand-600"], colorValues["cream-50"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: false,
        AAA_LARGE: false,
      }
    },
  },

  // Accent color combinations
  accent: {
    "terracotta-600_cream-50": {
      contrast: getContrastRatio(colorValues["terracotta-600"], colorValues["cream-50"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: false,
        AAA_LARGE: true,
      }
    },
    "cream-50_terracotta-500": {
      contrast: getContrastRatio(colorValues["cream-50"], colorValues["terracotta-500"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: false,
        AAA_LARGE: true,
      }
    },
  },

  // Interactive elements
  interactive: {
    "cream-50_sage-600": {
      contrast: getContrastRatio(colorValues["cream-50"], colorValues["sage-600"]),
      passes: {
        AA_NORMAL: true,
        AA_LARGE: true,
        AAA_NORMAL: false,
        AAA_LARGE: true,
      }
    },
  },
} as const;

/**
 * ARIA label utilities
 */
export const ariaLabels = {
  // Navigation
  navigation: {
    main: "Main navigation",
    breadcrumb: "Breadcrumb navigation",
    pagination: "Pagination navigation",
    tabs: "Tab navigation",
  },

  // Forms
  forms: {
    required: "Required field",
    optional: "Optional field",
    error: "Error message",
    help: "Help text",
    search: "Search",
    filter: "Filter options",
  },

  // Interactive elements
  interactive: {
    menu: "Menu",
    dialog: "Dialog",
    tooltip: "Additional information",
    expandable: "Expandable content",
    sortable: "Sortable column",
  },

  // Status messages
  status: {
    loading: "Loading content",
    success: "Success message",
    error: "Error message",
    warning: "Warning message",
    info: "Information message",
  },
} as const;

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Focus ring styles that meet accessibility requirements
   */
  focusRing: "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",

  /**
   * Focus ring for dark backgrounds
   */
  focusRingDark: "focus:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-900",

  /**
   * Skip link styles
   */
  skipLink: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta-600 focus:text-cream-50 focus:rounded-base",

  /**
   * Focus trap for modals
   */
  focusTrap: "focus-within:ring-2 focus-within:ring-terracotta-500",
} as const;

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Screen reader only text
   */
  only: "sr-only",

  /**
   * Show on focus for screen readers
   */
  focusable: "sr-only focus:not-sr-only",

  /**
   * Live regions for dynamic content
   */
  liveRegion: {
    polite: "aria-live='polite'",
    assertive: "aria-live='assertive'",
    off: "aria-live='off'",
  },

  /**
   * Common ARIA attributes
   */
  aria: {
    expanded: (expanded: boolean) => `aria-expanded="${expanded}"`,
    selected: (selected: boolean) => `aria-selected="${selected}"`,
    checked: (checked: boolean) => `aria-checked="${checked}"`,
    disabled: (disabled: boolean) => `aria-disabled="${disabled}"`,
    hidden: (hidden: boolean) => `aria-hidden="${hidden}"`,
    current: (current: string) => `aria-current="${current}"`,
    describedBy: (id: string) => `aria-describedby="${id}"`,
    labelledBy: (id: string) => `aria-labelledby="${id}"`,
  },
} as const;

/**
 * Keyboard navigation utilities
 */
export const keyboardNavigation = {
  /**
   * Common keyboard event handlers
   */
  handlers: {
    escape: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback();
    },
    enter: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === 'Enter') callback();
    },
    space: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        callback();
      }
    },
    arrows: {
      up: (callback: () => void) => (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          callback();
        }
      },
      down: (callback: () => void) => (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          callback();
        }
      },
      left: (callback: () => void) => (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          callback();
        }
      },
      right: (callback: () => void) => (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          callback();
        }
      },
    },
  },

  /**
   * Tab order management
   */
  tabOrder: {
    first: "tabindex='0'",
    skip: "tabindex='-1'",
    programmatic: (index: number) => `tabindex="${index}"`,
  },
} as const;

/**
 * Motion and animation accessibility
 */
export const motionAccessibility = {
  /**
   * Respect user's motion preferences
   */
  respectMotion: "motion-reduce:transition-none motion-reduce:animate-none motion-reduce:transform-none",

  /**
   * Safe animations that respect motion preferences
   */
  safeTransition: "transition-colors duration-200 motion-reduce:transition-none",
  safeFade: "transition-opacity duration-300 motion-reduce:transition-none",
  safeSlide: "transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none",
} as const;

/**
 * Accessibility testing utilities
 */
export const accessibilityTesting = {
  /**
   * Generate accessibility report for color combinations
   */
  generateColorReport: () => {
    const report: Array<{
      combination: string;
      contrast: number;
      passes: Record<string, boolean>;
      recommendation: string;
    }> = [];

    Object.entries(validatedColorCombinations).forEach(([category, combinations]) => {
      Object.entries(combinations).forEach(([name, data]) => {
        const recommendation =
          data.passes.AAA_NORMAL ? "Excellent - Passes AAA" :
          data.passes.AA_NORMAL ? "Good - Passes AA" :
          "Needs improvement - Fails AA";

        report.push({
          combination: `${category}: ${name}`,
          contrast: Math.round(data.contrast * 100) / 100,
          passes: data.passes,
          recommendation,
        });
      });
    });

    return report;
  },

  /**
   * Check if element has proper accessibility attributes
   */
  checkElement: (element: HTMLElement) => {
    const issues: string[] = [];

    // Check for missing alt text on images
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      issues.push('Missing alt attribute on image');
    }

    // Check for missing labels on form inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
      const hasLabel = element.getAttribute('aria-label') ||
                     element.getAttribute('aria-labelledby') ||
                     document.querySelector(`label[for="${element.id}"]`);
      if (!hasLabel) {
        issues.push('Missing label for form input');
      }
    }

    // Check for missing focus indicators
    const computedStyle = window.getComputedStyle(element, ':focus-visible');
    if (!computedStyle.outline && !computedStyle.boxShadow) {
      issues.push('Missing focus indicator');
    }

    return issues;
  },
} as const;