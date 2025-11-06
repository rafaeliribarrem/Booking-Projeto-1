import type { Meta, StoryObj } from "@storybook/nextjs";
import { BookingProgress } from "./BookingProgress";

// Mock steps data
const defaultSteps = [
  { id: 1, name: "Select Pass" },
  { id: 2, name: "Confirm Details" },
  { id: 3, name: "Payment" },
  { id: 4, name: "Complete" },
];

const extendedSteps = [
  { id: 1, name: "Authentication" },
  { id: 2, name: "Select Pass" },
  { id: 3, name: "Confirm Details" },
  { id: 4, name: "Payment" },
  { id: 5, name: "Complete" },
];

const meta = {
  title: "Features/Booking/BookingProgress",
  component: BookingProgress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A progress indicator component for multi-step booking flows. Shows completed steps with checkmarks, current step highlighted, and remaining steps in neutral state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentStep: {
      control: { type: "number", min: 1, max: 5 },
      description: "The current active step in the process",
    },
    steps: {
      description: "Array of step objects with id and name",
    },
  },
} satisfies Meta<typeof BookingProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Step 1 - First step
export const Step1: Story = {
  args: {
    currentStep: 1,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      description: {
        story: "First step of the booking process - Select Pass.",
      },
    },
  },
};

// Step 2 - Second step
export const Step2: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      description: {
        story: "Second step with first step completed (showing checkmark).",
      },
    },
  },
};

// Step 3 - Third step
export const Step3: Story = {
  args: {
    currentStep: 3,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      description: {
        story: "Third step with previous steps completed.",
      },
    },
  },
};

// Step 4 - Final step
export const Step4: Story = {
  args: {
    currentStep: 4,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      description: {
        story: "Final step of the booking process.",
      },
    },
  },
};

// Extended flow with 5 steps
export const ExtendedFlow: Story = {
  args: {
    currentStep: 3,
    steps: extendedSteps,
  },
  parameters: {
    docs: {
      description: {
        story: "Extended booking flow with authentication step included.",
      },
    },
  },
};

// Mobile view
export const MobileView: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Progress indicator optimized for mobile devices with responsive text sizing.",
      },
    },
  },
};

// All steps showcase
export const AllSteps: Story = {
  args: {
    currentStep: 1,
    steps: defaultSteps,
  },
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-sand-900 mb-2">
          Booking Progress States
        </h2>
        <p className="text-sand-600 mb-6">
          Different states of the booking progress indicator throughout the
          flow.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-sand-900 mb-3">
            Step 1: Select Pass
          </h3>
          <BookingProgress currentStep={1} steps={defaultSteps} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-sand-900 mb-3">
            Step 2: Confirm Details
          </h3>
          <BookingProgress currentStep={2} steps={defaultSteps} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-sand-900 mb-3">
            Step 3: Payment
          </h3>
          <BookingProgress currentStep={3} steps={defaultSteps} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-sand-900 mb-3">
            Step 4: Complete
          </h3>
          <BookingProgress currentStep={4} steps={defaultSteps} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "All possible states of the booking progress indicator.",
      },
    },
  },
};

// Different step configurations
export const ThreeSteps: Story = {
  args: {
    currentStep: 2,
    steps: [
      { id: 1, name: "Select Class" },
      { id: 2, name: "Payment" },
      { id: 3, name: "Confirmation" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Simplified 3-step booking process.",
      },
    },
  },
};

export const SixSteps: Story = {
  args: {
    currentStep: 4,
    steps: [
      { id: 1, name: "Login" },
      { id: 2, name: "Select Class" },
      { id: 3, name: "Choose Pass" },
      { id: 4, name: "Review" },
      { id: 5, name: "Payment" },
      { id: 6, name: "Complete" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Extended 6-step booking process with more granular steps.",
      },
    },
  },
};

// Component breakdown
export const ComponentBreakdown: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
  },
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-sand-900 mb-2">
          Progress Indicator Components
        </h2>
        <p className="text-sand-600 mb-6">
          Breakdown of the visual elements that make up the progress indicator.
        </p>
      </div>

      {/* Step States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sand-900">Step States</h3>

        <div className="flex items-center gap-8">
          {/* Completed Step */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sage-600 text-cream-50 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm font-medium text-sand-700">Completed</p>
          </div>

          {/* Current Step */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-terracotta-500 text-cream-50 flex items-center justify-center">
              <span className="font-semibold">2</span>
            </div>
            <p className="mt-2 text-sm font-medium text-sand-900">Current</p>
          </div>

          {/* Upcoming Step */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sand-200 text-sand-600 flex items-center justify-center">
              <span className="font-semibold">3</span>
            </div>
            <p className="mt-2 text-sm font-medium text-sand-700">Upcoming</p>
          </div>
        </div>
      </div>

      {/* Connector Lines */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sand-900">Connector Lines</h3>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-sage-600 text-cream-50 flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1 h-0.5 bg-sage-600" />
          <div className="w-10 h-10 rounded-full bg-terracotta-500 text-cream-50 flex items-center justify-center">
            <span className="font-semibold">2</span>
          </div>
          <div className="flex-1 h-0.5 bg-sand-200" />
          <div className="w-10 h-10 rounded-full bg-sand-200 text-sand-600 flex items-center justify-center">
            <span className="font-semibold">3</span>
          </div>
        </div>

        <div className="text-sm text-sand-600">
          <p>
            <strong>Green line:</strong> Connects completed steps
          </p>
          <p>
            <strong>Gray line:</strong> Connects upcoming steps
          </p>
        </div>
      </div>

      {/* Responsive Behavior */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-sand-900">Responsive Text</h3>
        <div className="bg-sand-50 p-4 rounded-base">
          <p className="text-sm text-sand-700 mb-2">
            Step labels adapt to screen size:
          </p>
          <ul className="text-sm text-sand-600 space-y-1">
            <li>
              • <strong>Mobile:</strong> Smaller text (text-xs) with max width
              constraints
            </li>
            <li>
              • <strong>Desktop:</strong> Standard text (text-sm) with full
              labels
            </li>
            <li>
              • <strong>All sizes:</strong> Center-aligned text under each step
              circle
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Detailed breakdown of the progress indicator components and their responsive behavior.",
      },
    },
  },
};
