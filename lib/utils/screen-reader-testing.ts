/**
 * Screen reader testing utilities and guidelines
 * Provides tools and instructions for testing with assistive technologies
 */

/**
 * Screen reader testing checklist for key user flows
 */
export const screenReaderTestingChecklist = {
  /**
   * Homepage navigation test
   */
  homepage: [
    "Navigate to homepage using screen reader",
    "Verify page title is announced correctly",
    "Test skip links functionality (Tab to reveal, Enter to use)",
    "Navigate through main navigation using Tab key",
    "Verify navigation links are announced with proper context",
    "Test hero section content is readable and logical",
    "Navigate through features section using arrow keys",
    "Verify all images have appropriate alt text",
    "Test call-to-action buttons are clearly announced",
    "Navigate to footer and verify all links are accessible",
  ],

  /**
   * Schedule page test
   */
  schedule: [
    "Navigate to schedule page",
    "Verify page title and heading structure",
    "Test filter bar accessibility",
    "Navigate through filter controls using Tab key",
    "Verify form labels are properly associated",
    "Test session cards navigation",
    "Verify session information is announced clearly",
    "Test booking buttons are accessible",
    "Verify capacity information is announced",
    "Test empty state messaging",
  ],

  /**
   * Booking flow test
   */
  booking: [
    "Start booking flow from schedule",
    "Verify progress indicator is announced",
    "Test pass selection using keyboard only",
    "Verify pass information is clearly announced",
    "Navigate to confirmation step",
    "Test form validation messages",
    "Verify booking summary is readable",
    "Test terms and conditions checkbox",
    "Complete booking and verify success message",
    "Test confirmation page content",
  ],

  /**
   * Dashboard test
   */
  dashboard: [
    "Navigate to user dashboard",
    "Verify dashboard header information",
    "Test tab navigation using arrow keys",
    "Navigate through booking cards",
    "Verify booking information is complete",
    "Test pass information display",
    "Navigate to account settings",
    "Test form accessibility",
    "Verify error messages are announced",
    "Test save functionality feedback",
  ],

  /**
   * Admin dashboard test
   */
  admin: [
    "Navigate to admin dashboard",
    "Verify metrics are announced clearly",
    "Test quick actions navigation",
    "Navigate to session management",
    "Test calendar view accessibility",
    "Verify session information in calendar",
    "Test session detail modal",
    "Navigate through booking list",
    "Test table sorting functionality",
    "Verify all admin actions are accessible",
  ],
} as const;

/**
 * Screen reader announcement utilities
 */
export const screenReaderAnnouncements = {
  /**
   * Create live region for dynamic announcements
   */
  createLiveRegion: (urgency: "polite" | "assertive" = "polite") => {
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", urgency);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    document.body.appendChild(liveRegion);
    return liveRegion;
  },

  /**
   * Announce message to screen readers
   */
  announce: (message: string, urgency: "polite" | "assertive" = "polite") => {
    const liveRegion = screenReaderAnnouncements.createLiveRegion(urgency);
    liveRegion.textContent = message;

    // Clean up after announcement
    setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion);
      }
    }, 1000);
  },

  /**
   * Common announcement messages
   */
  messages: {
    loading: "Loading content, please wait",
    loaded: "Content loaded successfully",
    error: "An error occurred, please try again",
    success: "Action completed successfully",
    saved: "Changes saved successfully",
    deleted: "Item deleted successfully",
    bookingConfirmed: "Booking confirmed successfully",
    bookingCancelled: "Booking cancelled successfully",
    filterApplied: "Filters applied, results updated",
    formSubmitted: "Form submitted successfully",
    navigationChanged: "Navigation changed",
  },
} as const;

/**
 * Screen reader testing instructions
 */
export const testingInstructions = {
  /**
   * macOS VoiceOver testing steps
   */
  voiceOver: {
    setup: [
      "Enable VoiceOver: System Preferences > Accessibility > VoiceOver > Enable VoiceOver",
      "Or use keyboard shortcut: Cmd + F5",
      "Open VoiceOver Utility for advanced settings",
      "Set speech rate to comfortable level",
      "Enable VoiceOver cursor tracking",
    ],

    basicNavigation: [
      "Control + Option + Right Arrow: Move to next item",
      "Control + Option + Left Arrow: Move to previous item",
      "Control + Option + Space: Activate item (click/select)",
      "Control + Option + Shift + Down Arrow: Enter group",
      "Control + Option + Shift + Up Arrow: Exit group",
      "Control + Option + U: Open rotor (headings, links, forms)",
    ],

    webNavigation: [
      "Control + Option + Command + H: Next heading",
      "Control + Option + Command + L: Next link",
      "Control + Option + Command + J: Next form control",
      "Control + Option + Command + T: Next table",
      "Control + Option + Command + X: Next list",
    ],
  },

  /**
   * NVDA testing steps (Windows)
   */
  nvda: {
    setup: [
      "Download and install NVDA from nvaccess.org",
      "Launch NVDA",
      "Configure speech settings in NVDA menu",
      "Set speech rate to comfortable level",
      "Enable focus highlighting",
    ],

    basicNavigation: [
      "Tab: Move to next focusable element",
      "Shift + Tab: Move to previous focusable element",
      "Enter or Space: Activate element",
      "Arrow keys: Navigate within elements",
      "NVDA + Space: Toggle focus/browse mode",
    ],

    webNavigation: [
      "H: Next heading",
      "Shift + H: Previous heading",
      "K: Next link",
      "Shift + K: Previous link",
      "F: Next form field",
      "Shift + F: Previous form field",
      "T: Next table",
      "B: Next button",
    ],
  },

  /**
   * Testing scenarios for each page type
   */
  scenarios: {
    homepage: [
      "Navigate from top to bottom using only keyboard",
      "Test all interactive elements (buttons, links)",
      "Verify hero content is announced clearly",
      "Test feature section navigation",
      "Verify all images have meaningful alt text",
      "Test call-to-action button clarity",
    ],

    forms: [
      "Navigate through form using Tab key only",
      "Verify all form fields have proper labels",
      "Test required field announcements",
      "Trigger validation errors and verify announcements",
      "Test form submission feedback",
      "Verify success/error messages are announced",
    ],

    navigation: [
      "Test main navigation using keyboard only",
      "Verify current page is announced",
      "Test mobile menu accessibility",
      "Verify dropdown menus work with keyboard",
      "Test breadcrumb navigation",
      "Verify skip links work correctly",
    ],

    dataVisualization: [
      "Test table navigation using arrow keys",
      "Verify table headers are announced",
      "Test sorting functionality",
      "Verify data relationships are clear",
      "Test pagination controls",
      "Verify empty states are announced",
    ],
  },
} as const;

/**
 * Automated accessibility testing utilities
 */
export const automatedTesting = {
  /**
   * Check for common accessibility issues
   */
  runBasicChecks: () => {
    const issues: string[] = [];

    // Check for images without alt text
    const imagesWithoutAlt = document.querySelectorAll("img:not([alt])");
    if (imagesWithoutAlt.length > 0) {
      issues.push(`${imagesWithoutAlt.length} images missing alt text`);
    }

    // Check for form inputs without labels
    const inputsWithoutLabels = document.querySelectorAll(
      "input:not([aria-label]):not([aria-labelledby])"
    );
    const unlabeledInputs = Array.from(inputsWithoutLabels).filter((input) => {
      const id = input.getAttribute("id");
      return !id || !document.querySelector(`label[for="${id}"]`);
    });
    if (unlabeledInputs.length > 0) {
      issues.push(`${unlabeledInputs.length} form inputs missing labels`);
    }

    // Check for buttons without accessible names
    const buttonsWithoutNames = document.querySelectorAll(
      "button:not([aria-label]):not([aria-labelledby])"
    );
    const unnamedButtons = Array.from(buttonsWithoutNames).filter((button) => {
      return !button.textContent?.trim();
    });
    if (unnamedButtons.length > 0) {
      issues.push(`${unnamedButtons.length} buttons missing accessible names`);
    }

    // Check for missing heading structure
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (headings.length === 0) {
      issues.push("No heading structure found");
    }

    // Check for missing main landmark
    const mainLandmark = document.querySelector('main, [role="main"]');
    if (!mainLandmark) {
      issues.push("Missing main landmark");
    }

    return issues;
  },

  /**
   * Generate accessibility report
   */
  generateReport: () => {
    const basicIssues = automatedTesting.runBasicChecks();

    return {
      timestamp: new Date().toISOString(),
      issues: basicIssues,
      passed: basicIssues.length === 0,
      recommendations:
        basicIssues.length > 0
          ? [
              "Fix identified issues",
              "Test with screen reader",
              "Verify keyboard navigation",
            ]
          : [
              "Conduct manual screen reader testing",
              "Test keyboard navigation flows",
              "Verify with real users",
            ],
    };
  },
} as const;

/**
 * Screen reader testing utilities for React components
 */
export const componentTesting = {
  /**
   * Test component accessibility
   */
  testComponent: (componentName: string, element: HTMLElement) => {
    const issues: string[] = [];

    // Component-specific checks
    switch (componentName.toLowerCase()) {
      case "button":
        if (
          !element.textContent?.trim() &&
          !element.getAttribute("aria-label")
        ) {
          issues.push("Button missing accessible name");
        }
        break;

      case "link":
        if (
          !element.textContent?.trim() &&
          !element.getAttribute("aria-label")
        ) {
          issues.push("Link missing accessible name");
        }
        if (
          element.getAttribute("target") === "_blank" &&
          !element.textContent?.includes("opens in new")
        ) {
          issues.push('External link missing "opens in new tab" indication');
        }
        break;

      case "form":
        const inputs = element.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
          const hasLabel =
            input.getAttribute("aria-label") ||
            input.getAttribute("aria-labelledby") ||
            document.querySelector(`label[for="${input.id}"]`);
          if (!hasLabel) {
            issues.push(`Form input missing label: ${input.tagName}`);
          }
        });
        break;
    }

    return issues;
  },
} as const;
