/**
 * Tablet-specific layout utilities (768px - 1024px)
 * Optimized for touch interaction and medium screen sizes
 */

/**
 * Common tablet layout patterns
 */
export const tabletLayouts = {
  /**
   * Two-column layout that works well on tablets
   */
  twoColumn: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8",

  /**
   * Three-column layout that becomes two on tablet
   */
  threeColumnResponsive: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",

  /**
   * Four-column layout that becomes two on tablet
   */
  fourColumnResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",

  /**
   * Card grid optimized for tablets
   */
  cardGrid:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",

  /**
   * Form layout that uses tablet space efficiently
   */
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",

  /**
   * Navigation that transitions well from mobile to desktop
   */
  navigation: "flex flex-col md:flex-row md:items-center gap-4 md:gap-6",

  /**
   * Sidebar layout for tablets
   */
  sidebar: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8",

  /**
   * Content with sidebar that stacks on tablet
   */
  contentSidebar: "grid grid-cols-1 lg:grid-cols-3 gap-8",
} as const;

/**
 * Tablet-optimized spacing
 */
export const tabletSpacing = {
  /**
   * Container padding that scales with screen size
   */
  container: "px-4 md:px-6 lg:px-8",

  /**
   * Section padding optimized for tablets
   */
  section: "py-12 md:py-16 lg:py-20",

  /**
   * Card padding that works well on tablets
   */
  card: "p-4 md:p-6 lg:p-8",

  /**
   * Gap spacing that scales appropriately
   */
  gap: "gap-4 md:gap-6 lg:gap-8",

  /**
   * Margin spacing for tablets
   */
  margin: "mb-6 md:mb-8 lg:mb-12",
} as const;

/**
 * Tablet-optimized typography
 */
export const tabletTypography = {
  /**
   * Hero text that scales well on tablets
   */
  hero: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",

  /**
   * Heading text optimized for tablets
   */
  heading: "text-2xl md:text-3xl lg:text-4xl",

  /**
   * Subheading text for tablets
   */
  subheading: "text-lg md:text-xl lg:text-2xl",

  /**
   * Body text that's readable on tablets
   */
  body: "text-base md:text-lg",

  /**
   * Small text that remains legible
   */
  small: "text-sm md:text-base",
} as const;

/**
 * Tablet touch interaction optimizations
 */
export const tabletTouch = {
  /**
   * Button sizing optimized for tablet touch
   */
  button: "h-12 px-6 py-3 min-h-[48px] text-base",

  /**
   * Input sizing for tablet forms
   */
  input: "h-12 min-h-[48px] text-base px-4",

  /**
   * Icon button for tablet touch
   */
  iconButton: "h-12 w-12 min-h-[48px] min-w-[48px]",

  /**
   * Link with adequate touch area
   */
  link: "min-h-[48px] flex items-center px-2 py-2",

  /**
   * Card that's easy to tap on tablets
   */
  card: "p-6 min-h-[120px] cursor-pointer transition-all hover:shadow-lg",
} as const;

/**
 * Tablet-specific breakpoint utilities
 */
export const tabletBreakpoints = {
  /**
   * Show only on tablets (768px - 1024px)
   */
  tabletOnly: "hidden md:block lg:hidden",

  /**
   * Hide on tablets
   */
  hideOnTablet: "block md:hidden lg:block",

  /**
   * Tablet and up
   */
  tabletUp: "hidden md:block",

  /**
   * Mobile and tablet only
   */
  mobileTablet: "block lg:hidden",
} as const;

/**
 * Common tablet layout components
 */
export const tabletComponents = {
  /**
   * Two-column form layout
   */
  formTwoColumn: {
    container: "grid grid-cols-1 md:grid-cols-2 gap-6",
    fullWidth: "md:col-span-2",
    leftColumn: "md:col-span-1",
    rightColumn: "md:col-span-1",
  },

  /**
   * Three-column content layout
   */
  threeColumn: {
    container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    main: "md:col-span-2 lg:col-span-2",
    sidebar: "md:col-span-2 lg:col-span-1",
  },

  /**
   * Dashboard layout
   */
  dashboard: {
    container: "grid grid-cols-1 lg:grid-cols-4 gap-6",
    main: "lg:col-span-3",
    sidebar: "lg:col-span-1",
  },

  /**
   * Card grid layouts
   */
  cards: {
    twoColumn: "grid grid-cols-1 md:grid-cols-2 gap-6",
    threeColumn: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    fourColumn: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  },
} as const;

/**
 * Tablet navigation patterns
 */
export const tabletNavigation = {
  /**
   * Horizontal navigation that works on tablets
   */
  horizontal: "flex flex-wrap items-center gap-4 md:gap-6",

  /**
   * Tab navigation optimized for tablets
   */
  tabs: "flex overflow-x-auto gap-6 md:gap-8 pb-4 border-b",

  /**
   * Breadcrumb navigation for tablets
   */
  breadcrumb: "flex flex-wrap items-center gap-2 text-sm md:text-base",

  /**
   * Pagination that works well on tablets
   */
  pagination: "flex flex-wrap items-center justify-center gap-2 md:gap-4",
} as const;

/**
 * Tablet form optimizations
 */
export const tabletForms = {
  /**
   * Form field spacing for tablets
   */
  fieldSpacing: "space-y-4 md:space-y-6",

  /**
   * Form button group for tablets
   */
  buttonGroup: "flex flex-col sm:flex-row gap-4 md:gap-6",

  /**
   * Form section spacing
   */
  sectionSpacing: "space-y-8 md:space-y-12",

  /**
   * Input group for tablets
   */
  inputGroup: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
} as const;
