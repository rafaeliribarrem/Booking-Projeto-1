/**
 * Desktop-specific layout utilities (1280px+)
 * Optimized for large screens and mouse interaction
 */

/**
 * Desktop layout patterns that utilize large screen space effectively
 */
export const desktopLayouts = {
  /**
   * Four-column grid for large screens
   */
  fourColumn:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8",

  /**
   * Five-column grid for extra large screens
   */
  fiveColumn:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8",

  /**
   * Three-column layout with proper spacing
   */
  threeColumn: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8",

  /**
   * Sidebar layout optimized for desktop
   */
  sidebar: "grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8",

  /**
   * Dashboard layout with multiple columns
   */
  dashboard:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",

  /**
   * Content with wide sidebar
   */
  contentSidebar: "grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8",

  /**
   * Full-width layout with max constraints
   */
  fullWidth: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12",

  /**
   * Narrow content layout for readability
   */
  narrowContent: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
} as const;

/**
 * Desktop-specific spacing that scales with screen size
 */
export const desktopSpacing = {
  /**
   * Container padding for large screens
   */
  container: "px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16",

  /**
   * Section padding that utilizes desktop space
   */
  section: "py-16 lg:py-20 xl:py-24 2xl:py-32",

  /**
   * Card padding for desktop
   */
  card: "p-6 lg:p-8 xl:p-10",

  /**
   * Gap spacing for desktop grids
   */
  gap: "gap-6 lg:gap-8 xl:gap-10 2xl:gap-12",

  /**
   * Margin spacing for desktop
   */
  margin: "mb-8 lg:mb-12 xl:mb-16 2xl:mb-20",

  /**
   * Header spacing for desktop
   */
  header: "mb-12 lg:mb-16 xl:mb-20",
} as const;

/**
 * Desktop typography that takes advantage of larger screens
 */
export const desktopTypography = {
  /**
   * Hero text for large screens
   */
  hero: "text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl",

  /**
   * Display heading for desktop
   */
  display: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",

  /**
   * Large heading for desktop
   */
  heading: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",

  /**
   * Medium heading for desktop
   */
  subheading: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",

  /**
   * Body text optimized for desktop reading
   */
  body: "text-base lg:text-lg xl:text-xl",

  /**
   * Large body text for desktop
   */
  bodyLarge: "text-lg lg:text-xl xl:text-2xl",

  /**
   * Caption text that remains readable
   */
  caption: "text-sm lg:text-base xl:text-lg",
} as const;

/**
 * Desktop hover and interaction states
 */
export const desktopInteractions = {
  /**
   * Card hover effects for desktop
   */
  cardHover:
    "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",

  /**
   * Button hover effects
   */
  buttonHover:
    "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",

  /**
   * Link hover effects
   */
  linkHover: "transition-colors duration-200 hover:text-terracotta-600",

  /**
   * Image hover effects
   */
  imageHover: "transition-transform duration-300 hover:scale-105",

  /**
   * Icon hover effects
   */
  iconHover:
    "transition-all duration-200 hover:text-terracotta-600 hover:scale-110",

  /**
   * Focus states for desktop
   */
  focus:
    "focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2",
} as const;

/**
 * Desktop navigation patterns
 */
export const desktopNavigation = {
  /**
   * Horizontal navigation with proper spacing
   */
  horizontal: "flex items-center gap-8 xl:gap-12",

  /**
   * Mega menu layout
   */
  megaMenu: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8",

  /**
   * Sidebar navigation
   */
  sidebar: "space-y-2 lg:space-y-4 w-64 xl:w-72",

  /**
   * Breadcrumb navigation
   */
  breadcrumb: "flex items-center gap-4 text-base lg:text-lg",

  /**
   * Tab navigation for desktop
   */
  tabs: "flex items-center gap-8 xl:gap-12 border-b",
} as const;

/**
 * Desktop form layouts
 */
export const desktopForms = {
  /**
   * Two-column form layout
   */
  twoColumn: "grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12",

  /**
   * Three-column form layout
   */
  threeColumn: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8",

  /**
   * Form with sidebar
   */
  withSidebar: "grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12",

  /**
   * Inline form elements
   */
  inline: "flex flex-col lg:flex-row items-start lg:items-end gap-4 xl:gap-6",

  /**
   * Form section spacing
   */
  sectionSpacing: "space-y-12 lg:space-y-16 xl:space-y-20",
} as const;

/**
 * Desktop content layouts
 */
export const desktopContent = {
  /**
   * Article layout with optimal reading width
   */
  article: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",

  /**
   * Wide content layout
   */
  wide: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12",

  /**
   * Full-width content with constraints
   */
  fullWidth: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16",

  /**
   * Two-column content layout
   */
  twoColumn: "grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20",

  /**
   * Three-column content layout
   */
  threeColumn: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12",
} as const;

/**
 * Desktop table layouts
 */
export const desktopTables = {
  /**
   * Responsive table container
   */
  container: "overflow-x-auto lg:overflow-x-visible",

  /**
   * Table with proper spacing
   */
  table: "w-full min-w-full lg:min-w-0",

  /**
   * Table cell padding
   */
  cellPadding: "px-4 py-3 lg:px-6 lg:py-4 xl:px-8 xl:py-5",

  /**
   * Table header styling
   */
  header:
    "bg-sand-50 border-b border-sand-200 text-left font-medium text-sand-900",
} as const;

/**
 * Desktop modal and overlay patterns
 */
export const desktopModals = {
  /**
   * Modal sizing for desktop
   */
  modal: "w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto",

  /**
   * Drawer sizing for desktop
   */
  drawer: "w-96 lg:w-[28rem] xl:w-[32rem]",

  /**
   * Popover positioning
   */
  popover: "w-80 lg:w-96 xl:w-[28rem]",

  /**
   * Tooltip styling
   */
  tooltip: "max-w-xs lg:max-w-sm xl:max-w-md",
} as const;

/**
 * Desktop performance optimizations
 */
export const desktopPerformance = {
  /**
   * Lazy loading for desktop
   */
  lazyLoad: "loading-lazy",

  /**
   * Preload critical resources
   */
  preload: "loading-eager",

  /**
   * Optimize for desktop interactions
   */
  optimize: "will-change-transform",

  /**
   * Reduce motion for accessibility
   */
  reduceMotion: "motion-reduce:transition-none motion-reduce:transform-none",
} as const;
