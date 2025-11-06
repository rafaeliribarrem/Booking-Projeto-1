# Implementation Plan

- [x] 1. Set up design token system

  - Create `lib/design/tokens/` directory structure
  - Define color tokens with earthy palette (terracotta, sage, sand, clay, cream)
  - Define typography tokens (font families, sizes, weights)
  - Define spacing, shadow, and border radius tokens
  - Export all tokens from index file
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Configure Tailwind CSS with design tokens

  - Update `tailwind.config.ts` to import and extend with design tokens
  - Configure custom colors, typography, spacing, shadows, and border radius
  - Add custom font families (Inter for sans, Playfair Display for display)
  - Update `app/globals.css` with CSS custom properties for design tokens
  - Remove any existing gradient utilities or configurations
  - _Requirements: 1.1, 1.2, 1.4, 2.5_

- [x] 3. Update base UI components with new design system

  - [x] 3.1 Update Button component with earthy color variants

    - Implement primary (terracotta), secondary (sage), outline, and ghost variants
    - Add small, medium, and large size variants
    - Ensure 44px minimum height for medium size (touch-friendly)
    - Update hover, active, disabled, and loading states
    - _Requirements: 1.1, 1.3, 5.2, 10.1, 10.2, 10.5_

  - [x] 3.2 Update Card component with new styling

    - Apply cream background and subtle shadows
    - Implement default, elevated, and outlined variants
    - Add base border radius (8px)
    - Update hover states with shadow transitions
    - _Requirements: 1.1, 2.3, 2.4, 10.1, 10.2_

  - [x] 3.3 Update Input and Form components

    - Set 44px height for touch-friendly inputs
    - Apply sand border colors with terracotta focus state
    - Update label styling with proper typography
    - Implement error states with terracotta colors
    - Style helper text with appropriate colors and sizes
    - _Requirements: 1.1, 1.3, 5.2, 10.1, 10.5_

  - [x] 3.4 Update Badge, Avatar, and other small components
    - Apply earthy color variants
    - Ensure consistent border radius
    - Update typography to match design system
    - _Requirements: 1.1, 2.1, 10.1_

- [x] 4. Create responsive navigation component

  - [x] 4.1 Implement desktop navigation layout

    - Create horizontal navigation bar with logo, links, and user menu
    - Set height to 72px with cream background
    - Add active link indicator with terracotta underline
    - Implement hover states for navigation links
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 4.2 Implement mobile navigation with hamburger menu

    - Add hamburger menu button (visible below 76
    - Create slide-in drawer navigation from right
    - Implement full-height overlay with vertical link stack
    - Add close button and smooth transitions
    - Ensure touch-friendly tap targets (44px minimum)
    - _Requirements: 5.3, 5.2, 6.1, 6.2, 6.3_

  - [x] 4.3 Update MainNav component with responsive behavior
    - Integrate desktop and mobile navigation variants
    - Add conditional rendering based on authentication state
    - Implement admin navigation items for admin users
    - Test navigation at all breakpoints (sm, md, lg, xl)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 5.1_

- [x] 5. Enhance footer component with design system

  - Expand footer layout with studio information, hours, and contact details
  - Add social media icons with earthy colors and hover states
  - Create newsletter signup form with styled inputs and validation
  - Implement multi-column layout (stacked on mobile, 3-4 columns on desktop)
  - Add secondary navigation links organized by category
  - _Requirements: 6.5, 5.1, 10.1_

- [x] 6. Redesign homepage with earthy aesthetic

  - [x] 6.1 Create hero section component

    - Implement full viewport height hero with background image
    - Add semi-transparent sand overlay for text readability
    - Style headline with display font (Playfair Display, 5xl size)
    - Add primary CTA button ("Browse Classes") and secondary ghost button
    - Optimize hero image with Next.js Image component (priority loading)
    - Ensure responsive typography and layout
    - _Requirements: 3.1, 3.4, 4.1, 5.1, 5.4_

  - [x] 6.2 Create features section component

    - Implement three-column grid (responsive to single column on mobile)
    - Create feature cards with icons, headings, and descriptions
    - Style with earthy colors and appropriate spacing
    - Add organic line icons in terracotta color
    - _Requirements: 5.1, 10.1_

  - [x] 6.3 Create class types preview section

    - Implement horizontal scroll on mobile, grid on desktop
    - Create class type cards with images, titles, and descriptions
    - Add "View Schedule" links with appropriate styling
    - Integrate class type images with Next.js Image (lazy loading)
    - _Requirements: 3.2, 3.4, 5.1_

  - [x] 6.4 Create instructor spotlight section

    - Display featured instructor with photo and bio
    - Style instructor photo as circular with proper dimensions
    - Add "Meet Our Instructors" CTA button
    - Implement responsive layout
    - _Requirements: 3.3, 3.4, 5.1_

  - [x] 6.5 Create pricing overview section

    - Display three pricing tiers in card layout
    - Style cards with earthy colors and shadows
    - Add "View Full Pricing" CTA
    - Ensure responsive grid layout
    - _Requirements: 5.1, 10.1_

  - [x] 6.6 Integrate all homepage sections
    - Assemble hero, features, class types, instructor, and pricing sections
    - Ensure consistent spacing and alignment
    - Test responsive behavior at all breakpoints
    - Optimize page performance (LCP, CLS)
    - _Requirements: 4.1, 5.1, 5.4_

- [x] 7. Redesign schedule/browse page

  - [x] 7.1 Create filter bar component

    - Implement sticky filter bar with date picker, class type, instructor, and time filters
    - Style dropdowns and inputs with design system
    - Add "Clear filters" button
    - Ensure 44px minimum height for touch targets
    - Make filter bar responsive (collapsible on mobile)
    - _Requirements: 4.3, 5.1, 5.2, 10.1_

  - [x] 7.2 Create session card component

    - Display class type image, name, instructor with avatar, date/time, duration
    - Add capacity indicator with visual progress bar
    - Implement "Book Now" button (primary if available, disabled if full)
    - Add "Join Waitlist" button (secondary if full)
    - Style with earthy colors and appropriate shadows
    - Ensure responsive layout
    - _Requirements: 3.2, 3.3, 4.3, 5.1, 10.1_

  - [x] 7.3 Create session list/grid layout

    - Implement responsive grid (1 column mobile, 2-3 columns desktop)
    - Add empty state with illustration and helpful message
    - Integrate session cards with proper spacing
    - Test with various data scenarios (empty, few items, many items)
    - _Requirements: 4.3, 5.1_

  - [x] 7.4 Integrate schedule page components
    - Assemble filter bar and session list
    - Connect to session data fetching
    - Implement filter logic
    - Test responsive behavior and performance
    - _Requirements: 4.3, 5.1, 5.4_

- [x] 8. Redesign class detail page

  - [x] 8.1 Create class detail hero section

    - Display large class type image with class name overlay
    - Style class name with display font
    - Optimize image with Next.js Image component
    - Ensure responsive image sizing
    - _Requirements: 3.2, 3.4, 5.1, 5.4_

  - [x] 8.2 Create class details grid layout

    - Implement two-column layout (desktop) and single column (mobile)
    - Style left column with class description, expectations, difficulty, duration
    - Create instructor card for right column with photo, name, bio, credentials
    - Add session details (date, time, location) and capacity indicator
    - Display pricing information with clear typography
    - _Requirements: 4.4, 5.1, 10.1_

  - [x] 8.3 Create sticky booking CTA

    - Implement "Book This Class" button that sticks on mobile scroll
    - Style with primary button variant
    - Ensure proper z-index and positioning
    - Add smooth scroll behavior
    - _Requirements: 4.4, 5.2_

  - [x] 8.4 Create similar classes section

    - Implement horizontal scroll of related session cards
    - Reuse session card component from schedule page
    - Add appropriate spacing and styling
    - Ensure smooth scrolling on mobile
    - _Requirements: 5.1, 10.1_

  - [x] 8.5 Integrate class detail page components
    - Assemble hero, details grid, sticky CTA, and similar classes
    - Connect to session data fetching
    - Test responsive behavior at all breakpoints
    - Optimize performance
    - _Requirements: 4.4, 5.1, 5.4_

- [x] 9. Redesign booking flow

  - [x] 9.1 Create authentication modal

    - Implement modal with sign-in and sign-up tabs
    - Style forms with design system inputs and buttons
    - Add seamless return to booking after authentication
    - Ensure modal is accessible (keyboard navigation, focus trap)
    - _Requirements: 4.5, 7.1, 10.5_

  - [x] 9.2 Create pass selection step

    - Display available pass options in card layout
    - Highlight recommended option with visual indicator
    - Show pricing and benefits for each pass
    - Add "Continue with [Pass Type]" button
    - Style with earthy colors and appropriate spacing
    - _Requirements: 7.1, 7.4, 10.1_

  - [x] 9.3 Create booking confirmation step

    - Display summary card with class details, date, time, instructor
    - Show pass being used or price
    - Add terms and conditions checkbox
    - Implement "Confirm Booking" button
    - Style with clear visual hierarchy
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

  - [x] 9.4 Create payment step (Stripe integration)

    - Implement Stripe payment form with design system styling
    - Add secure badge and trust indicators
    - Create order summary sidebar
    - Ensure responsive layout
    - Style error messages appropriately
    - _Requirements: 7.1, 7.2, 7.4, 5.1_

  - [x] 9.5 Create booking confirmation page

    - Display success message with checkmark icon
    - Show booking details in styled card
    - Add "Add to Calendar" button
    - Implement "View My Bookings" primary CTA
    - Add "Browse More Classes" secondary CTA
    - _Requirements: 4.5, 7.3, 10.1_

  - [x] 9.6 Implement progress indicator for booking flow

    - Create step indicator component showing current and remaining steps
    - Style with earthy colors
    - Update indicator as user progresses
    - Ensure responsive display
    - _Requirements: 7.1, 5.1_

  - [x] 9.7 Integrate booking flow components into pages
    - Update app/booking/start/page.tsx to use PassSelection component
    - Create app/booking/confirm/page.tsx using BookingConfirmation component
    - Update booking pages to use BookingProgress component
    - Create app/booking/success/page.tsx using BookingSuccess component
    - Connect all booking steps with proper navigation and state management
    - Add validation and error handling throughout flow
    - Test complete flow from start to finish
    - Ensure back navigation works correctly
    - _Requirements: 4.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Redesign user dashboard

  - [x] 10.1 Create dashboard header

    - Display welcome message with user name
    - Show quick stats (upcoming classes, remaining credits)
    - Style with earthy colors and appropriate typography
    - Ensure responsive layout
    - _Requirements: 8.1, 5.1_

  - [x] 10.2 Create dashboard tabs component

    - Implement tabs for Upcoming Bookings, Past Bookings, My Passes, Account Settings
    - Style active tab with terracotta indicator
    - Ensure keyboard navigation support
    - Make tabs responsive (scrollable on mobile if needed)
    - _Requirements: 8.1, 10.5_

  - [x] 10.3 Create booking card component for dashboard

    - Display class, date, time, instructor information
    - Add cancel button with appropriate styling
    - Implement visual distinction between upcoming, past, and cancelled bookings
    - Style with earthy colors and shadows
    - _Requirements: 8.2, 8.5, 10.1_

  - [x] 10.4 Create passes display component

    - Show active passes with progress indicators
    - Display pass type, remaining credits, expiration date
    - Create collapsed section for expired passes
    - Add "Purchase Pass" CTA button
    - Style with appropriate colors and spacing
    - _Requirements: 8.3, 10.1_

  - [x] 10.5 Create account settings form

    - Implement form for updating name, email, password
    - Style inputs with design system
    - Add validation and error messages
    - Implement save button with loading state
    - _Requirements: 8.4, 10.1, 10.5_

  - [x] 10.6 Create empty states for dashboard

    - Design empty state for no bookings
    - Design empty state for no passes
    - Add helpful messages and CTAs
    - Style with illustrations or icons
    - _Requirements: 8.1, 10.1_

  - [x] 10.7 Integrate user dashboard components into account page
    - Update app/account/page.tsx to use DashboardHeader component
    - Integrate DashboardTabs component for navigation
    - Use BookingCard component to display bookings list
    - Integrate PassesDisplay component for pass management
    - Integrate AccountSettingsForm component for profile updates
    - Add empty states for no bookings and no passes
    - Connect all components to user data fetching
    - Implement tab switching logic
    - Test responsive behavior at all breakpoints
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 5.1_

- [x] 10.8 Verify dashboard implementation quality

  - Review all dashboard components for design system compliance
  - Ensure proper error handling and loading states
  - Test data fetching and real-time updates
  - Verify responsive behavior matches design specifications
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 5.1_

- [x] 11. Redesign admin dashboard

  - [x] 11.1 Create admin metrics overview

    - Display key metrics in card layout (today's bookings, revenue, capacity)
    - Style cards with earthy colors and appropriate shadows
    - Add icons for visual interest
    - Ensure responsive grid layout
    - _Requirements: 9.2, 10.1, 5.1_

  - [x] 11.2 Create admin quick actions section

    - Add "Create Session", "Manage Instructors", "View Reports" buttons
    - Style with primary and secondary button variants
    - Implement responsive layout
    - _Requirements: 9.3, 10.1_

  - [x] 11.3 Create session management calendar view

    - Implement calendar component with earthy styling
    - Display sessions on calendar with color coding
    - Add click handlers for session details
    - Ensure responsive calendar (different views for mobile/desktop)
    - _Requirements: 9.3, 5.1, 10.1_

  - [x] 11.4 Create session detail modal for admin

    - Display session details with edit form
    - Show booking list with user information
    - Add cancel session option with confirmation
    - Style with design system components
    - Ensure modal is accessible
    - _Requirements: 9.4, 10.1, 10.5_

  - [x] 11.5 Update admin table components

    - Style tables with earthy colors and appropriate spacing
    - Ensure responsive table behavior (horizontal scroll or card view on mobile)
    - Add hover states for rows
    - Style action buttons consistently
    - _Requirements: 9.4, 5.1, 10.1_

  - [x] 11.6 Integrate admin dashboard components
    - Assemble metrics, quick actions, and session management
    - Connect to admin data fetching
    - Test all admin functionality with new design
    - Ensure responsive behavior
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 5.1_

- [x] 12. Implement image integration system

  - [x] 12.1 Set up image directory structure

    - Create `public/images/` directory with subdirectories (hero, classes, instructors, backgrounds)
    - Add placeholder images for development
    - Document image requirements (dimensions, formats)
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 12.2 Create image utility functions

    - Implement function to generate Unsplash URLs with yoga keywords
    - Create fallback image generator for missing images
    - Add image optimization helpers
    - _Requirements: 3.4, 3.5_

  - [x] 12.3 Implement hero image component

    - Create reusable hero image component with overlay
    - Use Next.js Image with priority loading
    - Add responsive image sizes
    - Implement semi-transparent overlay for text readability
    - _Requirements: 3.1, 3.4, 5.1_

  - [x] 12.4 Implement class type image integration

    - Add images to class type data model
    - Update class type cards to display images
    - Implement lazy loading for class images
    - Add fallback images for missing class types
    - _Requirements: 3.2, 3.4, 3.5_

  - [x] 12.5 Implement instructor photo integration

    - Add photo URLs to instructor data model
    - Create circular avatar component for instructor photos
    - Implement fallback avatar with initials and sage background
    - Optimize instructor images with Next.js Image
    - _Requirements: 3.3, 3.4, 3.5_

  - [x] 12.6 Add background textures
    - Create subtle texture overlays (linen, paper)
    - Apply textures to large surface areas with low opacity
    - Ensure textures don't impact performance
    - Test texture visibility on different screens
    - _Requirements: 3.1, 5.1_

- [x] 13. Implement responsive design refinements

  - [x] 13.1 Audit and fix mobile layouts

    - Test all pages on mobile devices (375px, 390px widths)
    - Fix any layout issues or overflow problems
    - Ensure proper spacing and padding on mobile
    - Verify touch target sizes (44px minimum)
    - _Requirements: 5.1, 5.2, 5.5_

  - [x] 13.2 Audit and fix tablet layouts

    - Test all pages on tablet devices (768px width)
    - Optimize two-column layouts for tablet
    - Ensure navigation works properly on tablet
    - Test forms and inputs on tablet
    - _Requirements: 5.1, 5.5_

  - [x] 13.3 Audit and fix desktop layouts

    - Test all pages on desktop (1280px, 1920px widths)
    - Ensure proper use of available space
    - Verify hover states work correctly
    - Test multi-column layouts
    - _Requirements: 5.1, 5.5_

  - [x] 13.4 Implement responsive typography

    - Ensure text scales appropriately at all breakpoints
    - Verify line heights and spacing
    - Test readability on all screen sizes
    - Adjust font sizes if needed
    - _Requirements: 5.4, 5.1_

  - [x] 13.5 Optimize responsive images
    - Verify Next.js Image sizes prop is set correctly
    - Test image loading on different screen sizes
    - Ensure images don't cause layout shift
    - Optimize image formats (WebP, AVIF)
    - _Requirements: 3.4, 5.1_

- [x] 14. Implement accessibility improvements

  - [x] 14.1 Audit color contrast ratios

    - Test all text/background combinations with contrast checker
    - Ensure WCAG 2.1 Level AA compliance (4.5:1 for normal text, 3:1 for large text)
    - Fix any failing combinations
    - Document color pairings that meet requirements
    - _Requirements: 1.3, 10.5_

  - [x] 14.2 Implement keyboard navigation

    - Test all interactive elements with keyboard only
    - Ensure proper focus indicators (visible outline)
    - Verify tab order is logical
    - Add skip links for main content
    - _Requirements: 10.5_

  - [x] 14.3 Add ARIA labels and semantic HTML

    - Audit all components for proper semantic HTML
    - Add ARIA labels where needed (buttons, links, forms)
    - Ensure form inputs have associated labels
    - Add ARIA live regions for dynamic content
    - _Requirements: 10.5_

  - [x] 14.4 Test with screen readers
    - Test key user flows with VoiceOver (macOS) or NVDA (Windows)
    - Ensure all content is announced correctly
    - Fix any issues with screen reader navigation
    - Add visually hidden text where needed for context
    - _Requirements: 10.5_

- [x] 15. Create component documentation

  - [x] 15.1 Set up Storybook in the project

    - Install Storybook dependencies
    - Configure Storybook for Next.js and Tailwind CSS
    - Set up design token integration in Storybook
    - _Requirements: 10.3_

  - [x] 15.2 Create stories for UI components

    - Write stories for Button component with all variants and sizes
    - Write stories for Card component with all variants
    - Write stories for Input, Form, Badge, Avatar components
    - Document component props and usage examples
    - _Requirements: 10.3_

  - [x] 15.3 Create stories for feature components

    - Write stories for navigation components (MainNav, Footer)
    - Write stories for homepage components (HeroSection, FeaturesSection, etc.)
    - Write stories for schedule components (SessionCard, FilterBar)
    - Write stories for booking components (BookingProgress, PassSelection)
    - Write stories for dashboard components (DashboardHeader, BookingCard)
    - _Requirements: 10.3_

  - [x] 15.4 Document design system
    - Create design token documentation page in Storybook
    - Document color palette with visual swatches
    - Document typography scale and usage
    - Document spacing, shadows, and border radius tokens
    - Add usage guidelines for each design token category
    - _Requirements: 10.3_

- [x] 16. Performance optimization

  - [x] 16.1 Run Lighthouse audits

    - Audit homepage performance
    - Audit schedule page performance
    - Audit class detail page performance
    - Audit booking flow pages performance
    - Document baseline metrics and identify issues
    - _Requirements: 3.4, 5.1_

  - [x] 16.2 Optimize images

    - Audit all images for proper sizing and format
    - Convert images to WebP/AVIF where supported
    - Implement responsive image sizes for all Next.js Image components
    - Add proper priority and loading attributes
    - Compress images without quality loss
    - _Requirements: 3.4, 5.1_

  - [x] 16.3 Optimize code and assets

    - Implement code splitting for large components
    - Optimize font loading with preload and font-display
    - Review and minimize CSS bundle size
    - Lazy load below-the-fold components
    - _Requirements: 3.4, 5.1_

  - [x] 16.4 Optimize Core Web Vitals
    - Improve Largest Contentful Paint (LCP) to < 2.5s
    - Improve First Input Delay (FID) to < 100ms
    - Improve Cumulative Layout Shift (CLS) to < 0.1
    - Test on real devices and network conditions
    - _Requirements: 3.4, 5.1_

- [x] 17. Visual regression testing

  - [x] 17.1 Set up visual regression testing tool

    - Choose and install Chromatic or Percy
    - Configure integration with Storybook
    - Set up CI/CD integration for automated testing
    - _Requirements: 10.1, 10.2_

  - [x] 17.2 Capture baseline screenshots

    - Capture all component stories in Storybook
    - Capture all major pages (homepage, schedule, class detail, dashboard)
    - Test all responsive breakpoints (mobile, tablet, desktop)
    - Test all component variants and interactive states
    - _Requirements: 10.1, 10.2_

  - [x] 17.3 Establish testing workflow
    - Document visual regression testing process
    - Set up approval workflow for visual changes
    - Configure automated testing on pull requests
    - _Requirements: 10.1, 10.2_

- [x] 18. Cross-browser testing

  - [x] 18.1 Test on desktop browsers

    - Test all pages on Chrome (latest)
    - Test all pages on Firefox (latest)
    - Test all pages on Safari (latest)
    - Test all pages on Edge (latest)
    - Document and fix any browser-specific issues
    - _Requirements: 5.1_

  - [x] 18.2 Test on mobile browsers

    - Test on iOS Safari (iPhone)
    - Test on Chrome mobile (Android)
    - Test on Samsung Internet browser
    - Verify touch interactions work correctly
    - Fix any mobile-specific issues
    - _Requirements: 5.1_

  - [x] 18.3 Verify feature compatibility
    - Test authentication flow across browsers
    - Test booking flow across browsers
    - Test payment integration across browsers
    - Verify all interactive features work consistently
    - _Requirements: 5.1_

- [x] 19. Final integration and polish

  - [x] 19.0 Fix Next.js image configuration issues

    - Configure Next.js image domains and patterns for external images (Unsplash)
    - Fix hero image component to properly handle external image URLs
    - Test image loading across all components
    - _Requirements: 3.4, 5.1_

  - [x] 19.1 Design consistency review

    - Review all pages for consistent use of design tokens
    - Verify color palette is applied consistently
    - Check typography consistency across all pages
    - Ensure spacing and layout consistency
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 19.2 Visual polish

    - Fix any remaining visual issues or inconsistencies
    - Ensure all transitions and animations are smooth
    - Verify hover states work correctly on all interactive elements
    - Check focus states for accessibility
    - _Requirements: 5.1, 10.1, 10.5_

  - [x] 19.3 Navigation and links audit

    - Verify all navigation links work correctly
    - Test breadcrumbs and back navigation
    - Ensure proper active states on navigation items
    - Test deep linking and URL structure
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 19.4 End-to-end user flow testing

    - Test complete booking flow from homepage to confirmation
    - Test user registration and authentication flow
    - Test dashboard and account management flow
    - Test admin dashboard workflows
    - _Requirements: 4.1, 4.5, 7.1, 8.1, 9.1_

  - [x] 19.5 Stakeholder review and approval
    - Prepare demo of all major features
    - Present design system documentation
    - Gather feedback and make final adjustments
    - Get formal approval to launch
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 10.1_
