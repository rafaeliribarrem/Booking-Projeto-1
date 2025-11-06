import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants and sizes, designed with the earthy color palette.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button (default variant)
export const Primary: Story = {
  args: {
    children: "Book Now",
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Learn More",
  },
};

// Outline button
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "View Details",
  },
};

// Ghost button
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancel",
  },
};

// Destructive button
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

// Link button
export const Link: Story = {
  args: {
    variant: "link",
    children: "Read more",
  },
};

// Small size
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

// Large size
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button variants displayed together for comparison.",
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button sizes displayed together for comparison.",
      },
    },
  },
};

// Loading state example
export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </Button>
      <Button variant="outline" disabled>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons in loading state with spinner icons.",
      },
    },
  },
};
