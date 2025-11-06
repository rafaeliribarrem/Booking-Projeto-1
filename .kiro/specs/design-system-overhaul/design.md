# Design Document

## Overview

This design document outlines the comprehensive redesign of the Yoga Booking System with an earthy, natural aesthetic. The design system will replace the current visual identity with a cohesive, calming palette inspired by natural materials, integrate appropriate imagery, refine all user flows for optimal experience, and ensure full responsiveness across all devices.

The design approach prioritizes simplicity, clarity, and a connection to nature—reflecting the essence of yoga practice. By eliminating gradients and focusing on solid earthy tones, we create a grounded, authentic visual language that resonates with the target audience.

## Architecture

### Design System Structure

The design system will be organized into the following layers:

1. **Design Tokens Layer**: Core visual primitives (colors, typography, spacing, shadows, borders)
2. **Component Layer**: Reusable UI components built with design tokens
3. **Pattern Layer**: Common UI patterns and layouts composed of components
4. **Page Layer**: Complete page implementations using patterns and components

### Technology Integration

- **Tailwind CSS Configuration**: Extend the default Tailwind config with custom design tokens
- **CSS Variables**: Define design tokens as CSS custom properties for runtime flexibility
- **TypeScript Types**: Create type definitions for design token values
- **Component Variants**: Use class-variance-authority (CVA) for component variant management

### File Organization

```
lib/design/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   └── index.ts
├── components/
│   └── [existing shadcn/ui components with updated styling]
└── utils/
    └── cn.ts (existing)

tailwind.config.ts (updated with design tokens)
app/globals.css (updated with CSS variables)
```

## Components and Interfaces

### Design Tokens

#### Color Palette

**Primary Earthy Colors:**

```typescript
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
};
```

**Semantic Color Mapping:**

```typescript
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
};
```

#### Typography

```typescript
export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    display: ["Playfair Display", "Georgia", "serif"], // For headings
  },

  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
    "5xl": ["3rem", { lineHeight: "1" }], // 48px
    "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
  },

  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};
```

#### Spacing

```typescript
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
};
```

#### Shadows and Borders

```typescript
export const shadows = {
  sm: "0 1px 2px 0 rgba(82, 79, 71, 0.05)",
  base: "0 1px 3px 0 rgba(82, 79, 71, 0.1), 0 1px 2px -1px rgba(82, 79, 71, 0.1)",
  md: "0 4px 6px -1px rgba(82, 79, 71, 0.1), 0 2px 4px -2px rgba(82, 79, 71, 0.1)",
  lg: "0 10px 15px -3px rgba(82, 79, 71, 0.1), 0 4px 6px -4px rgba(82, 79, 71, 0.1)",
  xl: "0 20px 25px -5px rgba(82, 79, 71, 0.1), 0 8px 10px -6px rgba(82, 79, 71, 0.1)",
};

export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  base: "0.5rem", // 8px
  md: "0.75rem", // 12px
  lg: "1rem", // 16px
  xl: "1.5rem", // 24px
  full: "9999px",
};
```

### Component Specifications

#### Button Component

**Variants:**

- Primary: Terracotta background, cream text
- Secondary: Sage background, cream text
- Outline: Transparent background, terracotta border and text
- Ghost: Transparent background, text only

**Sizes:**

- Small: 36px height, padding 12px 16px
- Medium: 44px height, padding 16px 24px (default)
- Large: 52px height, padding 20px 32px

**States:**

- Default
- Hover: Darker shade
- Active: Even darker shade
- Disabled: 50% opacity, no pointer events
- Loading: Spinner icon, disabled state

#### Card Component

**Variants:**

- Default: Cream background, subtle shadow
- Elevated: White background, stronger shadow
- Outlined: Border instead of shadow

**Features:**

- Rounded corners (base radius)
- Padding: 24px
- Optional header, body, footer sections
- Hover state: Slight shadow increase

#### Input Component

**Features:**

- Height: 44px (touch-friendly)
- Border: Sand-300 default, terracotta on focus
- Background: Cream-50
- Padding: 12px 16px
- Border radius: base (8px)
- Label: Sand-900, medium weight
- Error state: Terracotta border, error message below
- Helper text: Sand-600, small size

#### Navigation Component

**Desktop:**

- Horizontal layout
- Logo on left
- Navigation links centered
- User menu on right
- Height: 72px
- Background: Cream-50 with subtle shadow
- Active link: Terracotta underline

**Mobile:**

- Hamburger menu icon
- Slide-in drawer from right
- Full-height overlay
- Vertical link stack
- Close button at top

### Image Integration

#### Image Sources and Implementation

**Hero Images:**

- Source: Unsplash API with yoga-related keywords
- Dimensions: 1920x1080 (16:9 aspect ratio)
- Optimization: Next.js Image with priority loading
- Overlay: Semi-transparent sand gradient for text readability

**Class Type Images:**

- Vinyasa: Dynamic flow poses
- Yin: Restorative, calm poses
- Power: Strong, energetic poses
- Restorative: Relaxation with props
- Dimensions: 800x600 (4:3 aspect ratio)
- Optimization: Lazy loading, responsive sizes

**Instructor Photos:**

- Dimensions: 400x400 (1:1 aspect ratio)
- Style: Natural backgrounds, soft lighting
- Fallback: Initials avatar with sage background
- Border radius: full (circular)

**Background Textures:**

- Subtle linen or paper texture
- Opacity: 3-5%
- Applied to large surface areas
- Format: SVG or optimized PNG

#### Image Component Pattern

```typescript
<Image
  src={imageUrl}
  alt={descriptiveAlt}
  width={width}
  height={height}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold}
/>
```

## Data Models

### Design Token Configuration

The design tokens will be stored in TypeScript files and imported into the Tailwind configuration:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";
import {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
} from "./lib/design/tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      spacing,
      boxShadow: shadows,
      borderRadius,
    },
  },
  plugins: [],
};

export default config;
```

### CSS Variables

Global CSS variables for runtime theming:

```css
/* app/globals.css */
:root {
  --color-primary: 212 112 77;
  --color-secondary: 125 135 104;
  --color-background: 253 252 251;
  --color-surface: 250 248 245;
  --color-text-primary: 82 79 71;

  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Playfair Display", Georgia, serif;

  --radius-base: 0.5rem;
  --shadow-base: 0 1px 3px 0 rgba(82, 79, 71, 0.1);
}
```

## User Flow Refinements

### Homepage Flow

**Layout:**

1. **Hero Section** (full viewport height)

   - Large hero image with yoga pose
   - Overlay with semi-transparent sand tint
   - Headline: "Find Your Balance" (display font, 5xl)
   - Subheadline: Brief value proposition
   - Primary CTA: "Browse Classes" (large button)
   - Secondary CTA: "Learn More" (ghost button)

2. **Features Section**

   - Three-column grid (responsive to single column on mobile)
   - Icon + heading + description for each feature
   - Icons: Custom organic line icons in terracotta

3. **Class Types Preview**

   - Horizontal scroll on mobile, grid on desktop
   - Card for each class type with image, title, brief description
   - "View Schedule" link on each card

4. **Instructor Spotlight**

   - Featured instructor with photo and bio
   - "Meet Our Instructors" CTA

5. **Pricing Overview**

   - Three pricing tiers in cards
   - "View Full Pricing" CTA

6. **Footer**
   - Studio information, links, social media
   - Newsletter signup form

### Schedule/Browse Flow

**Layout:**

1. **Filter Bar** (sticky on scroll)

   - Date picker (calendar icon)
   - Class type dropdown
   - Instructor dropdown
   - Time of day filter (morning, afternoon, evening)
   - Clear filters button

2. **Session Grid/List**

   - Card layout for each session
   - Session card includes:
     - Class type image (small)
     - Class name and type
     - Instructor name with small avatar
     - Date and time
     - Duration
     - Capacity indicator (visual progress bar)
     - "Book Now" button (primary if available, disabled if full)
     - "Join Waitlist" button (secondary if full)

3. **Empty State**
   - Illustration or image
   - "No classes found" message
   - Suggestions to adjust filters

### Class Detail Flow

**Layout:**

1. **Hero Section**

   - Large class type image
   - Class name overlay (display font)

2. **Details Grid** (two columns on desktop, single on mobile)

   - Left column:
     - Class description
     - What to expect
     - Difficulty level
     - Duration
   - Right column:
     - Instructor card (photo, name, bio, credentials)
     - Session details (date, time, location)
     - Capacity indicator
     - Pricing information
     - "Book This Class" CTA (sticky on mobile)

3. **Similar Classes**
   - Horizontal scroll of related sessions

### Booking Flow

**Steps:**

1. **Authentication Check**

   - If not logged in: Modal with sign-in/sign-up tabs
   - Seamless return to booking after auth

2. **Pass Selection** (if user has no valid pass)

   - Display available pass options
   - Highlight recommended option
   - Show pricing and benefits
   - "Continue with [Pass Type]" button

3. **Booking Confirmation**

   - Summary card:
     - Class details
     - Date and time
     - Instructor
     - Pass being used or price
   - Terms and conditions checkbox
   - "Confirm Booking" button

4. **Payment** (if purchasing new pass)

   - Stripe payment form
   - Secure badge
   - Order summary sidebar

5. **Confirmation**
   - Success message with checkmark icon
   - Booking details
   - Add to calendar button
   - "View My Bookings" CTA
   - "Browse More Classes" secondary CTA

### User Dashboard Flow

**Layout:**

1. **Header**

   - Welcome message with user name
   - Quick stats (upcoming classes, remaining credits)

2. **Tabs**

   - Upcoming Bookings
   - Past Bookings
   - My Passes
   - Account Settings

3. **Upcoming Bookings Tab**

   - List of booking cards
   - Each card shows: class, date, time, instructor, cancel button
   - Empty state if no bookings

4. **My Passes Tab**
   - Active passes with progress indicators
   - Expired passes (collapsed section)
   - "Purchase Pass" CTA

### Admin Dashboard Flow

**Layout:**

1. **Metrics Overview**

   - Cards with key metrics
   - Today's bookings, revenue, capacity

2. **Quick Actions**

   - Create Session button
   - Manage Instructors button
   - View Reports button

3. **Session Management**

   - Calendar view (default)
   - List view toggle
   - Filter by instructor, class type
   - Click session to edit or view bookings

4. **Session Detail Modal**
   - Edit session details form
   - Booking list with user info
   - Cancel session option

## Responsive Design Strategy

### Breakpoints

```typescript
export const breakpoints = {
  sm: "640px", // Mobile landscape
  md: "768px", // Tablet
  lg: "1024px", // Desktop
  xl: "1280px", // Large desktop
  "2xl": "1536px", // Extra large desktop
};
```

### Mobile-First Approach

**Base styles (mobile):**

- Single column layouts
- Full-width components
- Larger touch targets (44px minimum)
- Simplified navigation (hamburger menu)
- Stacked forms
- Vertical spacing emphasis

**Tablet (md: 768px+):**

- Two-column layouts where appropriate
- Expanded navigation (visible links)
- Side-by-side form fields
- Grid layouts for cards (2 columns)

**Desktop (lg: 1024px+):**

- Multi-column layouts (up to 3-4 columns)
- Full navigation with dropdowns
- Sidebar layouts
- Hover states more prominent
- Grid layouts for cards (3-4 columns)

### Component Responsiveness

**Navigation:**

```tsx
<nav className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
  <Logo />

  {/* Mobile menu button */}
  <button className="md:hidden">
    <MenuIcon />
  </button>

  {/* Desktop navigation */}
  <div className="hidden md:flex items-center gap-6">
    <NavLinks />
  </div>
</nav>
```

**Grid Layouts:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

**Typography:**

```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display">
  Headline
</h1>
<p className="text-base md:text-lg">
  Body text
</p>
```

## Error Handling

### Design System Errors

**Missing Design Tokens:**

- Fallback to default Tailwind values
- Console warning in development
- Type errors prevent compilation

**Invalid Color Values:**

- Validation in token definition files
- TypeScript types enforce valid formats

**Component Prop Errors:**

- TypeScript interfaces for all component props
- Runtime validation for critical props
- Graceful degradation for optional props

### Image Loading Errors

**Failed Image Load:**

- Display fallback image or placeholder
- Log error for monitoring
- Maintain layout (no content shift)

**Slow Image Load:**

- Show skeleton loader
- Progressive image loading
- Blur placeholder from base64

## Testing Strategy

### Visual Regression Testing

**Tools:**

- Chromatic or Percy for visual diffs
- Storybook for component isolation

**Coverage:**

- All component variants
- All responsive breakpoints
- Light/dark mode (if implemented)
- Interactive states (hover, focus, active)

### Accessibility Testing

**Tools:**

- axe DevTools
- Lighthouse accessibility audit
- Manual keyboard navigation testing
- Screen reader testing (NVDA, VoiceOver)

**Criteria:**

- WCAG 2.1 Level AA compliance
- Color contrast ratios
- Keyboard navigation
- Focus indicators
- ARIA labels
- Semantic HTML

### Responsive Testing

**Devices:**

- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPad (768px)
- Desktop (1280px, 1920px)

**Testing:**

- Layout integrity at all breakpoints
- Touch target sizes on mobile
- Text readability
- Image optimization
- Navigation usability

### Component Testing

**Unit Tests:**

- Component rendering
- Prop variations
- Event handlers
- Conditional rendering

**Integration Tests:**

- User flows (booking, authentication)
- Form submissions
- Navigation
- API interactions

### Performance Testing

**Metrics:**

- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s

**Optimization:**

- Image optimization (WebP, AVIF)
- Code splitting
- Lazy loading
- Font optimization
- CSS purging

## Implementation Phases

### Phase 1: Design Token Setup

- Create token files
- Update Tailwind configuration
- Update global CSS
- Create type definitions

### Phase 2: Component Library Update

- Update existing shadcn/ui components
- Create new custom components
- Implement variants
- Add Storybook stories

### Phase 3: Page Redesign

- Homepage
- Schedule/Browse
- Class Detail
- Authentication pages

### Phase 4: User Flows

- Booking flow
- User dashboard
- Admin dashboard

### Phase 5: Image Integration

- Set up image sources
- Implement Next.js Image
- Add fallbacks
- Optimize loading

### Phase 6: Responsive Refinement

- Test all breakpoints
- Fix layout issues
- Optimize mobile experience
- Touch target adjustments

### Phase 7: Testing & Polish

- Visual regression tests
- Accessibility audit
- Performance optimization
- Bug fixes

## Design Rationale

### Why Earthy Colors?

Yoga is fundamentally about connection—to oneself, to others, and to nature. Earthy colors evoke natural materials and environments, creating a sense of grounding and authenticity. The warm terracotta and clay tones provide energy and warmth, while sage and sand tones offer calm and balance. This palette creates an inviting, trustworthy atmosphere that aligns with yoga philosophy.

### Why No Gradients?

Gradients can feel trendy and ephemeral. By using solid colors, we create a timeless, classic aesthetic that won't feel dated. Solid colors also provide better accessibility (easier to meet contrast requirements) and better performance (simpler rendering).

### Why Display Font for Headings?

The serif display font (Playfair Display) adds elegance and sophistication, elevating the brand beyond a purely utilitarian booking system. It creates visual hierarchy and draws attention to key messages. The contrast with the clean sans-serif body text (Inter) ensures readability while maintaining visual interest.

### Why Mobile-First?

Most users will book classes on their phones, often on the go. By designing for mobile first, we ensure the core experience is optimized for the most common use case. Progressive enhancement for larger screens adds convenience without compromising the mobile experience.

### Why Minimal Shadows?

Heavy shadows can feel heavy and cluttered. Subtle shadows provide just enough depth to establish hierarchy and separate surfaces without overwhelming the natural, organic aesthetic. This aligns with the principle of simplicity in yoga practice.

## Conclusion

This design system creates a cohesive, calming, and professional visual identity for the Yoga Booking System. By grounding the design in natural, earthy tones and focusing on clarity and simplicity, we create an experience that reflects the values of yoga practice while providing an efficient, user-friendly booking platform.

The modular approach to design tokens and components ensures consistency, maintainability, and scalability as the application grows. The refined user flows remove friction and guide users smoothly through their journey, from discovery to booking to practice.
