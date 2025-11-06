import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A circular avatar component for displaying user profile pictures with fallback initials. Uses sage green background for fallbacks to match the earthy design system.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Avatar with image
export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        alt="Sarah Johnson"
      />
      <AvatarFallback>SJ</AvatarFallback>
    </Avatar>
  ),
};

// Avatar with fallback (no image)
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  ),
};

// Avatar with broken image (shows fallback)
export const BrokenImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-image-url.jpg" alt="John Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When the image fails to load, the fallback with initials is displayed.",
      },
    },
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar className="size-6">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Small"
          />
          <AvatarFallback className="text-xs">SM</AvatarFallback>
        </Avatar>
        <p className="text-xs text-sand-600 mt-1">Small (24px)</p>
      </div>

      <div className="text-center">
        <Avatar className="size-8">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Default"
          />
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
        <p className="text-xs text-sand-600 mt-1">Default (32px)</p>
      </div>

      <div className="text-center">
        <Avatar className="size-12">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Medium"
          />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <p className="text-xs text-sand-600 mt-1">Medium (48px)</p>
      </div>

      <div className="text-center">
        <Avatar className="size-16">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Large"
          />
          <AvatarFallback className="text-lg">LG</AvatarFallback>
        </Avatar>
        <p className="text-xs text-sand-600 mt-1">Large (64px)</p>
      </div>

      <div className="text-center">
        <Avatar className="size-24">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Extra Large"
          />
          <AvatarFallback className="text-2xl">XL</AvatarFallback>
        </Avatar>
        <p className="text-xs text-sand-600 mt-1">XL (96px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars in different sizes. Adjust the text size of fallbacks for larger avatars.",
      },
    },
  },
};

// Instructor avatars
export const InstructorAvatars: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Sarah Johnson"
          />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sand-900">Sarah Johnson</p>
          <p className="text-sm text-sand-600">Vinyasa Instructor</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Michael Chen"
          />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sand-900">Michael Chen</p>
          <p className="text-sm text-sand-600">Power Yoga Instructor</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sand-900">Maya Kumar</p>
          <p className="text-sm text-sand-600">Yin Yoga Instructor</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars used in instructor profiles with names and specialties.",
      },
    },
  },
};

// Avatar group/stack
export const AvatarGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-sand-700 mb-2">
          Class participants (5 enrolled):
        </p>
        <div className="flex -space-x-2">
          <Avatar className="size-8 border-2 border-cream-50">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Participant 1"
            />
            <AvatarFallback>A1</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 border-2 border-cream-50">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Participant 2"
            />
            <AvatarFallback>A2</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 border-2 border-cream-50">
            <AvatarFallback>A3</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 border-2 border-cream-50">
            <AvatarFallback>A4</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 border-2 border-cream-50 bg-sand-200">
            <AvatarFallback className="text-sand-700 text-xs">
              +1
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Overlapping avatars to show multiple participants or users in a compact space.",
      },
    },
  },
};

// Avatar with status indicator
export const WithStatusIndicator: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="text-center">
        <div className="relative inline-block">
          <Avatar className="size-12">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Online user"
            />
            <AvatarFallback>ON</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 size-3 bg-sage-500 border-2 border-cream-50 rounded-full"></div>
        </div>
        <p className="text-xs text-sand-600 mt-1">Online</p>
      </div>

      <div className="text-center">
        <div className="relative inline-block">
          <Avatar className="size-12">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Away user"
            />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 size-3 bg-clay-500 border-2 border-cream-50 rounded-full"></div>
        </div>
        <p className="text-xs text-sand-600 mt-1">Away</p>
      </div>

      <div className="text-center">
        <div className="relative inline-block">
          <Avatar className="size-12">
            <AvatarFallback>OF</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 size-3 bg-sand-400 border-2 border-cream-50 rounded-full"></div>
        </div>
        <p className="text-xs text-sand-600 mt-1">Offline</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars with status indicators showing online, away, or offline states.",
      },
    },
  },
};

// Custom fallback colors
export const CustomFallbacks: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback className="bg-terracotta-500">TC</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-clay-500">CL</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-sand-500 text-cream-50">
          SD
        </AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback className="bg-sage-500">SG</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatars with custom fallback background colors using the earthy color palette.",
      },
    },
  },
};
