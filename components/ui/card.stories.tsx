import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible card component with header, content, and footer sections. Uses the earthy design system colors and subtle shadows.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Vinyasa Flow</CardTitle>
        <CardDescription>
          A dynamic practice linking breath with movement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Join us for an energizing vinyasa flow class that will challenge your
          strength and flexibility while promoting mindfulness and inner peace.
        </p>
      </CardContent>
    </Card>
  ),
};

// Card with footer
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Yin Yoga</CardTitle>
        <CardDescription>
          Deep, meditative poses held for longer periods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Experience deep relaxation and increased flexibility through passive
          poses held for 3-5 minutes each.
        </p>
        <div className="mt-4 text-sm text-sand-600">
          <p>
            <strong>Duration:</strong> 75 minutes
          </p>
          <p>
            <strong>Level:</strong> All levels welcome
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Learn More</Button>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  ),
};

// Class session card
export const ClassSession: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Power Yoga
          <span className="text-sm font-normal text-sage-600">Available</span>
        </CardTitle>
        <CardDescription>
          High-intensity yoga for strength and endurance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-sand-600">Instructor:</span>
            <span className="font-medium">Sarah Johnson</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sand-600">Time:</span>
            <span className="font-medium">6:00 PM - 7:15 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sand-600">Capacity:</span>
            <span className="font-medium">12/15 spots</span>
          </div>
          <div className="w-full bg-sand-200 rounded-full h-2 mt-3">
            <div
              className="bg-terracotta-500 h-2 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book This Class</Button>
      </CardFooter>
    </Card>
  ),
};

// Instructor card
export const InstructorCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-sage-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-semibold text-sage-700">MK</span>
          </div>
          <CardTitle className="mb-2">Maya Kumar</CardTitle>
          <CardDescription className="mb-4">
            500-Hour RYT, Meditation Teacher
          </CardDescription>
          <p className="text-sm text-sand-700 mb-4">
            Maya brings 8 years of teaching experience with a focus on alignment
            and mindful movement. Her classes blend traditional yoga philosophy
            with modern techniques.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button size="sm">Book Class</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Pricing card
export const PricingCard: Story = {
  render: () => (
    <Card className="w-[280px] relative">
      <div className="absolute top-4 right-4">
        <span className="bg-terracotta-100 text-terracotta-700 text-xs font-medium px-2 py-1 rounded-full">
          Most Popular
        </span>
      </div>
      <CardHeader>
        <CardTitle>Monthly Unlimited</CardTitle>
        <CardDescription>Perfect for regular practitioners</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold text-terracotta-600">$89</span>
          <span className="text-sand-600">/month</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <svg
              className="w-4 h-4 text-sage-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Unlimited classes
          </li>
          <li className="flex items-center">
            <svg
              className="w-4 h-4 text-sage-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Priority booking
          </li>
          <li className="flex items-center">
            <svg
              className="w-4 h-4 text-sage-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Guest passes (2/month)
          </li>
          <li className="flex items-center">
            <svg
              className="w-4 h-4 text-sage-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Workshop discounts
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose Plan</Button>
      </CardFooter>
    </Card>
  ),
};

// Multiple cards layout
export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Morning Flow</CardTitle>
          <CardDescription>Start your day with energy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-sand-700">7:00 AM - 8:00 AM</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lunch Break Yoga</CardTitle>
          <CardDescription>Quick midday reset</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-sand-700">12:00 PM - 12:45 PM</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evening Restore</CardTitle>
          <CardDescription>Unwind after work</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-sand-700">7:00 PM - 8:15 PM</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Multiple cards in a responsive grid layout.",
      },
    },
  },
};
