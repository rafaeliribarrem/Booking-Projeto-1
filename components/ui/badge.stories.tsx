import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile badge component for displaying status, categories, or labels. Features earthy color variants and support for icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "accent",
        "outline",
        "success",
        "warning",
        "error",
      ],
      description: "The visual style variant of the badge",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component",
    },
    children: {
      control: { type: "text" },
      description: "Badge content",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default badge
export const Default: Story = {
  args: {
    children: "New",
  },
};

// Secondary badge
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Available",
  },
};

// Accent badge
export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Featured",
  },
};

// Outline badge
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Draft",
  },
};

// Success badge
export const Success: Story = {
  args: {
    variant: "success",
    children: "Confirmed",
  },
};

// Warning badge
export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Pending",
  },
};

// Error badge
export const Error: Story = {
  args: {
    variant: "error",
    children: "Cancelled",
  },
};

// Badge with icon
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Verified
      </Badge>

      <Badge variant="warning">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Alert
      </Badge>

      <Badge variant="secondary">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        Scheduled
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with icons to provide additional visual context.",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All badge variants displayed together for comparison.",
      },
    },
  },
};

// Class status badges
export const ClassStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Class Status:</span>
        <Badge variant="success">Available</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Class Status:</span>
        <Badge variant="warning">Almost Full</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Class Status:</span>
        <Badge variant="error">Full</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Class Status:</span>
        <Badge variant="outline">Cancelled</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges used to indicate class booking status in the yoga booking system.",
      },
    },
  },
};

// Difficulty level badges
export const DifficultyLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Difficulty:</span>
        <Badge variant="secondary">Beginner</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Difficulty:</span>
        <Badge variant="accent">Intermediate</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Difficulty:</span>
        <Badge variant="default">Advanced</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Difficulty:</span>
        <Badge variant="outline">All Levels</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges used to indicate yoga class difficulty levels.",
      },
    },
  },
};

// Interactive badges (as links)
export const InteractiveBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-sand-700 mb-2">Clickable category badges:</p>
        <div className="flex flex-wrap gap-2">
          <Badge asChild>
            <a href="#" className="cursor-pointer">
              Vinyasa
            </a>
          </Badge>
          <Badge variant="secondary" asChild>
            <a href="#" className="cursor-pointer">
              Yin Yoga
            </a>
          </Badge>
          <Badge variant="accent" asChild>
            <a href="#" className="cursor-pointer">
              Power Yoga
            </a>
          </Badge>
          <Badge variant="outline" asChild>
            <a href="#" className="cursor-pointer">
              Restorative
            </a>
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive badges that can be used as links or buttons. Hover to see the interaction states.",
      },
    },
  },
};

// Number badges
export const NumberBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Notifications</span>
        <Badge variant="error">3</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Available Spots</span>
        <Badge variant="success">12</Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-sand-700">Credits Remaining</span>
        <Badge variant="accent">5</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges displaying numerical values for counts, notifications, or quantities.",
      },
    },
  },
};
