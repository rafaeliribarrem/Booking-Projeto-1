import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A touch-friendly input component with earthy styling, proper focus states, and accessibility features. Designed with a 44px minimum height for mobile usability.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "The input type",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default input
export const Default: Story = {
  args: {
    placeholder: "Enter your name",
  },
};

// Email input
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email address",
  },
};

// Password input
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

// Search input
export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search classes...",
  },
};

// Number input
export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter age",
    min: 0,
    max: 120,
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
  },
};

// Input with value
export const WithValue: Story = {
  args: {
    defaultValue: "Sarah Johnson",
    placeholder: "Enter your name",
  },
};

// Error state (using aria-invalid)
export const ErrorState: Story = {
  args: {
    placeholder: "Enter valid email",
    defaultValue: "invalid-email",
    "aria-invalid": true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Input in error state using aria-invalid attribute. Shows red border and focus ring.",
      },
    },
  },
};

// File input
export const FileInput: Story = {
  args: {
    type: "file",
    accept: "image/*",
  },
};

// Form context example
export const InFormContext: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-sand-900 mb-2"
        >
          Full Name
        </label>
        <Input id="name" placeholder="Enter your full name" />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-sand-900 mb-2"
        >
          Email Address
        </label>
        <Input id="email" type="email" placeholder="Enter your email" />
        <p className="text-sm text-sand-600 mt-1">
          We'll never share your email with anyone else.
        </p>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-sand-900 mb-2"
        >
          Phone Number
        </label>
        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-sand-900 mb-2"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter a secure password"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Multiple inputs in a form context with proper labels and helper text.",
      },
    },
  },
};

// Different sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Default Size (44px min-height)
        </label>
        <Input placeholder="Default input size" />
      </div>

      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Custom Smaller (not recommended for touch)
        </label>
        <Input
          placeholder="Smaller input"
          className="h-8 min-h-8 py-1 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Custom Larger
        </label>
        <Input
          placeholder="Larger input"
          className="h-14 min-h-14 py-4 text-lg"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Different input sizes. The default 44px height is recommended for touch accessibility.",
      },
    },
  },
};

// Interactive states showcase
export const InteractiveStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Normal State
        </label>
        <Input placeholder="Hover and focus to see states" />
      </div>

      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Focused State (simulated)
        </label>
        <Input
          placeholder="This shows focus styling"
          className="border-terracotta-500 ring-2 ring-terracotta-500/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Error State
        </label>
        <Input
          placeholder="Invalid input"
          aria-invalid={true}
          defaultValue="invalid@"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sand-900 mb-2">
          Disabled State
        </label>
        <Input
          placeholder="Cannot interact"
          disabled
          defaultValue="Disabled input"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All interactive states of the input component including normal, focused, error, and disabled states.",
      },
    },
  },
};
