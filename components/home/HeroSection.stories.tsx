import type { Meta, StoryObj } from "@storybook/nextjs";
import { HeroSection } from "./HeroSection";

const meta = {
  title: "Features/Home/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main hero section for the homepage featuring a full-screen background image, compelling headline, and call-to-action buttons. Includes a scroll indicator animation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default hero section
export const Default: Story = {};

// Hero section with different viewport sizes
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Hero section optimized for mobile devices with responsive typography and layout.",
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story:
          "Hero section on tablet devices showing the responsive design adaptation.",
      },
    },
  },
};

// Hero section variations (would require props to be added to component)
export const AlternativeContent: Story = {
  render: () => (
    <section className="relative h-[90vh] min-h-[600px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000)",
        }}
      >
        <div className="absolute inset-0 bg-sand-900/40" />
      </div>

      <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-50 leading-tight">
            Transform Your Practice
          </h1>
          <p className="text-xl md:text-2xl text-cream-100 leading-relaxed">
            Join our community of mindful practitioners and discover the power
            of yoga to heal, strengthen, and inspire your daily life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-8 py-4 rounded-base text-lg font-medium transition-colors">
              Start Your Journey
            </button>
            <button className="bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 backdrop-blur-sm px-8 py-4 rounded-base text-lg font-medium transition-colors border border-cream-50/30">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream-50/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream-50/50 rounded-full" />
        </div>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Alternative hero section with different content and background image.",
      },
    },
  },
};

// Hero section with different background
export const MorningPractice: Story = {
  render: () => (
    <section className="relative h-[90vh] min-h-[600px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=2000)",
        }}
      >
        <div className="absolute inset-0 bg-terracotta-900/30" />
      </div>

      <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-50 leading-tight">
            Rise with the Sun
          </h1>
          <p className="text-xl md:text-2xl text-cream-100 leading-relaxed">
            Start your day with intention through our morning yoga classes.
            Energize your body and calm your mind before the world awakens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-8 py-4 rounded-base text-lg font-medium transition-colors">
              Morning Classes
            </button>
            <button className="bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 backdrop-blur-sm px-8 py-4 rounded-base text-lg font-medium transition-colors border border-cream-50/30">
              Class Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream-50/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream-50/50 rounded-full" />
        </div>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hero section themed for morning yoga classes with warm sunrise imagery.",
      },
    },
  },
};

// Hero section components breakdown
export const ComponentBreakdown: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-sand-50">
      <div>
        <h2 className="text-2xl font-bold text-sand-900 mb-4">
          Hero Section Components
        </h2>
        <p className="text-sand-700 mb-6">
          The hero section is composed of several key elements working together
          to create an impactful first impression.
        </p>
      </div>

      {/* Background Image */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">
          Background Image
        </h3>
        <div
          className="h-32 bg-cover bg-center rounded-base border-2 border-sand-200"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000)",
          }}
        >
          <div className="h-full bg-sand-900/40 rounded-base flex items-center justify-center">
            <span className="text-cream-50 font-medium">
              Hero Background Image
            </span>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sand-900">
          Typography Hierarchy
        </h3>
        <div className="bg-terracotta-900 p-6 rounded-base">
          <h1 className="font-display text-4xl font-bold text-cream-50 mb-4">
            Find Your Inner Peace
          </h1>
          <p className="text-lg text-cream-100">
            Experience transformative yoga classes in a welcoming, mindful
            environment.
          </p>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">
          Call-to-Action Buttons
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 px-6 py-3 rounded-base font-medium transition-colors">
            Primary CTA: Browse Classes
          </button>
          <button className="bg-cream-50/10 hover:bg-cream-50/20 text-sand-900 backdrop-blur-sm px-6 py-3 rounded-base font-medium transition-colors border border-sand-300">
            Secondary CTA: View Pricing
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-sand-900">
          Scroll Indicator
        </h3>
        <div className="flex justify-center">
          <div className="w-6 h-10 border-2 border-sand-400 rounded-full flex items-start justify-center p-2 animate-bounce">
            <div className="w-1.5 h-3 bg-sand-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Breakdown of the individual components that make up the hero section.",
      },
    },
  },
};
