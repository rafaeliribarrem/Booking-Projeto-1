import type { Meta, StoryObj } from "@storybook/nextjs";
import { SessionCard } from "./SessionCard";

// Mock session data
const mockSession = {
  id: "1",
  classType: {
    name: "Vinyasa Flow",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
  },
  instructor: {
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  startsAt: new Date("2024-12-15T18:00:00"),
  duration: 75,
  capacity: 15,
  bookedCount: 8,
};

const meta = {
  title: "Features/Schedule/SessionCard",
  component: SessionCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive session card displaying class information, instructor details, timing, capacity, and booking actions. Features dynamic capacity indicators and responsive design.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    session: {
      description: "Session data object containing all class information",
    },
  },
} satisfies Meta<typeof SessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default session card
export const Default: Story = {
  args: {
    session: mockSession,
  },
};

// Available class (low capacity)
export const Available: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Gentle Yoga",
        image:
          "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800",
      },
      instructor: { name: "Maya Kumar", avatar: undefined },
      bookedCount: 3,
      capacity: 12,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Session card for a class with plenty of available spots (green capacity indicator).",
      },
    },
  },
};

// Almost full class
export const AlmostFull: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Power Yoga",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
      },
      instructor: {
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      bookedCount: 11,
      capacity: 15,
      startsAt: new Date("2024-12-16T07:00:00"),
      duration: 60,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Session card for a class that is almost full (orange capacity indicator).",
      },
    },
  },
};

// Full class (waitlist)
export const FullClass: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Hot Yoga",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
      },
      instructor: {
        name: "Lisa Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      bookedCount: 20,
      capacity: 20,
      startsAt: new Date("2024-12-16T19:30:00"),
      duration: 90,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Session card for a full class showing waitlist option and "Full" badge.',
      },
    },
  },
};

// Different class types
export const YinYoga: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Yin Yoga",
        image:
          "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
      },
      instructor: { name: "Emma Thompson", avatar: undefined },
      bookedCount: 6,
      capacity: 10,
      startsAt: new Date("2024-12-17T20:00:00"),
      duration: 75,
    },
  },
};

export const Ashtanga: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Ashtanga Primary Series",
        image:
          "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=800",
      },
      instructor: {
        name: "David Kumar",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      bookedCount: 14,
      capacity: 16,
      startsAt: new Date("2024-12-18T06:30:00"),
      duration: 90,
    },
  },
};

// Different time formats
export const MorningClass: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Morning Flow",
        image:
          "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800",
      },
      startsAt: new Date("2024-12-16T07:00:00"),
      duration: 60,
      bookedCount: 5,
      capacity: 12,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Session card for an early morning class.",
      },
    },
  },
};

export const EveningClass: Story = {
  args: {
    session: {
      ...mockSession,
      classType: {
        name: "Restorative Yoga",
        image:
          "https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=800",
      },
      startsAt: new Date("2024-12-16T21:00:00"),
      duration: 75,
      bookedCount: 7,
      capacity: 10,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Session card for an evening restorative class.",
      },
    },
  },
};

// Grid layout showcase
export const GridLayout: Story = {
  args: {
    session: mockSession,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <SessionCard
        session={{
          ...mockSession,
          id: "1",
          classType: {
            name: "Vinyasa Flow",
            image:
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
          },
          bookedCount: 8,
        }}
      />
      <SessionCard
        session={{
          ...mockSession,
          id: "2",
          classType: {
            name: "Power Yoga",
            image:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
          },
          instructor: {
            name: "Michael Chen",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
          bookedCount: 13,
          capacity: 15,
          startsAt: new Date("2024-12-16T07:00:00"),
          duration: 60,
        }}
      />
      <SessionCard
        session={{
          ...mockSession,
          id: "3",
          classType: {
            name: "Yin Yoga",
            image:
              "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
          },
          instructor: { name: "Emma Thompson", avatar: undefined },
          bookedCount: 10,
          capacity: 10,
          startsAt: new Date("2024-12-17T20:00:00"),
        }}
      />
      <SessionCard
        session={{
          ...mockSession,
          id: "4",
          classType: {
            name: "Gentle Yoga",
            image:
              "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800",
          },
          instructor: { name: "Maya Kumar", avatar: undefined },
          bookedCount: 3,
          capacity: 12,
          startsAt: new Date("2024-12-18T10:00:00"),
        }}
      />
      <SessionCard
        session={{
          ...mockSession,
          id: "5",
          classType: {
            name: "Hot Yoga",
            image:
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
          },
          instructor: {
            name: "Lisa Rodriguez",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          },
          bookedCount: 18,
          capacity: 20,
          startsAt: new Date("2024-12-18T19:30:00"),
          duration: 90,
        }}
      />
      <SessionCard
        session={{
          ...mockSession,
          id: "6",
          classType: {
            name: "Meditation",
            image:
              "https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=800",
          },
          instructor: {
            name: "James Wilson",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          },
          bookedCount: 5,
          capacity: 8,
          startsAt: new Date("2024-12-19T18:00:00"),
          duration: 45,
        }}
      />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Multiple session cards in a responsive grid layout showing various class types and booking states.",
      },
    },
  },
};

// Capacity indicator states
export const CapacityStates: Story = {
  args: {
    session: mockSession,
  },
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-sand-900 mb-4">
          Capacity Indicator States
        </h3>
        <p className="text-sand-700 mb-6">
          The capacity indicator changes color based on how full the class is.
        </p>
      </div>

      {/* Low capacity (green) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-sand-700">3 / 15 spots</span>
          <span className="text-sage-600 font-medium">12 left</span>
        </div>
        <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-500 transition-all"
            style={{ width: "20%" }}
          />
        </div>
        <p className="text-xs text-sand-600">
          Low capacity (0-69%): Green indicator
        </p>
      </div>

      {/* Medium capacity (orange) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-sand-700">11 / 15 spots</span>
          <span className="text-sage-600 font-medium">4 left</span>
        </div>
        <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-clay-500 transition-all"
            style={{ width: "73%" }}
          />
        </div>
        <p className="text-xs text-sand-600">
          Medium capacity (70-89%): Orange indicator
        </p>
      </div>

      {/* High capacity (red) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-sand-700">14 / 15 spots</span>
          <span className="text-sage-600 font-medium">1 left</span>
        </div>
        <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta-500 transition-all"
            style={{ width: "93%" }}
          />
        </div>
        <p className="text-xs text-sand-600">
          High capacity (90%+): Red indicator
        </p>
      </div>

      {/* Full capacity */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-sand-700">15 / 15 spots</span>
          <span className="text-terracotta-600 font-medium">Full</span>
        </div>
        <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta-500 transition-all"
            style={{ width: "100%" }}
          />
        </div>
        <p className="text-xs text-sand-600">
          Full capacity: Shows "Join Waitlist" button
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Visual breakdown of the different capacity indicator states and their color coding.",
      },
    },
  },
};
