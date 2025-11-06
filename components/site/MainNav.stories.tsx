import type { Meta, StoryObj } from "@storybook/nextjs";
import { MainNav } from "./MainNav";

const meta = {
  title: "Features/Site/MainNav",
  component: MainNav,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main navigation component featuring responsive design with desktop horizontal nav and mobile hamburger menu. Includes authentication states and admin access.",
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/schedule",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MainNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default navigation (logged out)
export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
};

// Navigation with active schedule page
export const ScheduleActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/schedule",
      },
    },
    docs: {
      description: {
        story:
          "Navigation with the Schedule page active, showing the terracotta underline indicator.",
      },
    },
  },
};

// Navigation with active instructors page
export const InstructorsActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/instructors",
      },
    },
  },
};

// Navigation with active pricing page
export const PricingActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/pricing",
      },
    },
  },
};

// Mobile view
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    nextjs: {
      navigation: {
        pathname: "/schedule",
      },
    },
    docs: {
      description: {
        story:
          "Mobile navigation showing the hamburger menu button. Click to see the slide-in drawer.",
      },
    },
  },
};

// Tablet view
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    nextjs: {
      navigation: {
        pathname: "/instructors",
      },
    },
  },
};

// Logged in user state (mock)
export const LoggedInUser: Story = {
  render: () => (
    <div className="min-h-screen bg-sand-50">
      <header className="sticky top-0 z-50 w-full border-b border-sand-200 bg-cream-100/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <div className="font-display text-2xl font-bold text-terracotta-600">
            Serenity Yoga
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/schedule"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Schedule
            </a>
            <a
              href="/instructors"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Instructors
            </a>
            <a
              href="/pricing"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Pricing
            </a>
            <a
              href="/account"
              className="px-4 py-2 rounded-base text-base font-medium text-terracotta-600 transition-all relative"
            >
              My Account
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-600 rounded-full" />
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="border border-sand-300 bg-transparent text-sand-900 hover:bg-sand-50 px-4 py-2 rounded-base text-sm font-medium transition-colors">
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-base hover:bg-sand-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg
              className="h-6 w-6 text-sand-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="p-8">
        <p className="text-sand-700">
          Logged in user navigation state with "My Account" link and "Sign Out"
          button.
        </p>
      </div>
    </div>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/account",
      },
    },
    docs: {
      description: {
        story:
          'Navigation state for logged-in users showing "My Account" link and "Sign Out" button.',
      },
    },
  },
};

// Admin user state (mock)
export const AdminUser: Story = {
  render: () => (
    <div className="min-h-screen bg-sand-50">
      <header className="sticky top-0 z-50 w-full border-b border-sand-200 bg-cream-100/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <div className="font-display text-2xl font-bold text-terracotta-600">
            Serenity Yoga
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/schedule"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Schedule
            </a>
            <a
              href="/instructors"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Instructors
            </a>
            <a
              href="/pricing"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Pricing
            </a>
            <a
              href="/account"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              My Account
            </a>
            <a
              href="/admin"
              className="px-4 py-2 rounded-base text-base font-medium text-terracotta-600 transition-all relative"
            >
              Admin Dashboard
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-600 rounded-full" />
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="border border-sand-300 bg-transparent text-sand-900 hover:bg-sand-50 px-4 py-2 rounded-base text-sm font-medium transition-colors">
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-base hover:bg-sand-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg
              className="h-6 w-6 text-sand-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="p-8">
        <p className="text-sand-700">
          Admin user navigation state with additional "Admin Dashboard" link.
        </p>
      </div>
    </div>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/admin",
      },
    },
    docs: {
      description: {
        story:
          'Navigation state for admin users showing additional "Admin Dashboard" link.',
      },
    },
  },
};

// Mobile menu open state (mock)
export const MobileMenuOpen: Story = {
  render: () => (
    <div className="min-h-screen bg-sand-50">
      <header className="sticky top-0 z-50 w-full border-b border-sand-200 bg-cream-100/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <div className="font-display text-2xl font-bold text-terracotta-600">
            Serenity Yoga
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-base hover:bg-sand-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <svg
              className="h-6 w-6 text-sand-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div className="fixed inset-0 bg-sand-900/20 backdrop-blur-sm z-40" />

      {/* Mobile Drawer */}
      <div className="fixed top-[72px] right-0 bottom-0 w-full max-w-sm bg-cream-100 shadow-xl z-50">
        <nav className="flex flex-col p-6 gap-2">
          <a
            href="/schedule"
            className="px-4 py-3 rounded-base text-lg font-medium bg-terracotta-500 text-cream-50 min-h-[44px] flex items-center"
          >
            Schedule
          </a>
          <a
            href="/instructors"
            className="px-4 py-3 rounded-base text-lg font-medium text-sand-900 hover:bg-sand-100 min-h-[44px] flex items-center"
          >
            Instructors
          </a>
          <a
            href="/pricing"
            className="px-4 py-3 rounded-base text-lg font-medium text-sand-900 hover:bg-sand-100 min-h-[44px] flex items-center"
          >
            Pricing
          </a>

          <div className="mt-6 pt-6 border-t border-sand-200 flex flex-col gap-3">
            <button className="border border-sand-300 bg-transparent text-sand-900 hover:bg-sand-50 px-4 py-3 rounded-base font-medium w-full">
              Sign In
            </button>
            <button className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-4 py-3 rounded-base font-medium w-full">
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    nextjs: {
      navigation: {
        pathname: "/schedule",
      },
    },
    docs: {
      description: {
        story:
          "Mobile navigation with the drawer menu open, showing the slide-in navigation and overlay.",
      },
    },
  },
};

// Navigation component breakdown
export const ComponentBreakdown: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-sand-50">
      <div>
        <h2 className="text-2xl font-bold text-sand-900 mb-4">
          Navigation Components
        </h2>
        <p className="text-sand-700 mb-6">
          Breakdown of the main navigation components and their responsive
          behavior.
        </p>
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">Logo</h3>
        <div className="bg-cream-100 p-4 rounded-base border border-sand-200">
          <div className="font-display text-2xl font-bold text-terracotta-600">
            Serenity Yoga
          </div>
        </div>
        <p className="text-sm text-sand-600">
          Display font with terracotta color, links to homepage
        </p>
      </div>

      {/* Navigation Links */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">
          Navigation Links
        </h3>
        <div className="bg-cream-100 p-4 rounded-base border border-sand-200">
          <nav className="flex items-center gap-1">
            <a
              href="#"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Schedule
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-base text-base font-medium text-terracotta-600 transition-all relative"
            >
              Instructors
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-600 rounded-full" />
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-base text-base font-medium text-sand-900 hover:text-terracotta-600 hover:bg-sand-50 transition-all"
            >
              Pricing
            </a>
          </nav>
        </div>
        <p className="text-sm text-sand-600">
          Active page shows terracotta color with underline indicator
        </p>
      </div>

      {/* Authentication Buttons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">
          Authentication States
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-sand-800 mb-2">
              Logged Out:
            </p>
            <div className="bg-cream-100 p-4 rounded-base border border-sand-200">
              <div className="flex items-center gap-3">
                <button className="bg-transparent text-sand-900 hover:bg-sand-50 px-4 py-2 rounded-base text-sm font-medium transition-colors">
                  Sign In
                </button>
                <button className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-4 py-2 rounded-base text-sm font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-sand-800 mb-2">Logged In:</p>
            <div className="bg-cream-100 p-4 rounded-base border border-sand-200">
              <button className="border border-sand-300 bg-transparent text-sand-900 hover:bg-sand-50 px-4 py-2 rounded-base text-sm font-medium transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">
          Mobile Menu Button
        </h3>
        <div className="bg-cream-100 p-4 rounded-base border border-sand-200">
          <div className="flex gap-4">
            <button className="p-2 rounded-base hover:bg-sand-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-sand-200">
              <svg
                className="h-6 w-6 text-sand-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button className="p-2 rounded-base hover:bg-sand-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-sand-200">
              <svg
                className="h-6 w-6 text-sand-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-sm text-sand-600">
          44px touch target, hamburger icon transforms to X when menu is open
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Detailed breakdown of navigation components and their different states.",
      },
    },
  },
};
