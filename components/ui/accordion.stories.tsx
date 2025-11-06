import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A collapsible content component built on Radix UI. Perfect for FAQs, class descriptions, and organizing information in a compact space.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single accordion
export const Single: Story = {
  render: () => (
    <div className="w-96">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What should I bring to my first class?
          </AccordionTrigger>
          <AccordionContent>
            Just bring yourself and a water bottle! We provide yoga mats,
            blocks, straps, and all other props you might need. Wear comfortable
            clothing that allows you to move freely.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Multiple accordion items
export const Multiple: Story = {
  render: () => (
    <div className="w-96">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What should I bring to my first class?
          </AccordionTrigger>
          <AccordionContent>
            Just bring yourself and a water bottle! We provide yoga mats,
            blocks, straps, and all other props you might need. Wear comfortable
            clothing that allows you to move freely.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How early should I arrive?</AccordionTrigger>
          <AccordionContent>
            We recommend arriving 10-15 minutes before class starts. This gives
            you time to check in, set up your mat, and settle in before we
            begin. The studio doors open 15 minutes before each class.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I cancel or reschedule my booking?
          </AccordionTrigger>
          <AccordionContent>
            Yes! You can cancel or reschedule your booking up to 2 hours before
            class starts through your account dashboard or by calling the
            studio. Late cancellations may result in a credit deduction.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Multiple items can be open
export const MultipleOpen: Story = {
  render: () => (
    <div className="w-96">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Beginner Classes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>
                <strong>Gentle Yoga:</strong> Perfect for complete beginners
              </p>
              <p>
                <strong>Hatha Yoga:</strong> Slow-paced with basic postures
              </p>
              <p>
                <strong>Yin Yoga:</strong> Passive poses held for longer periods
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Intermediate Classes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>
                <strong>Vinyasa Flow:</strong> Dynamic sequences linking breath
                and movement
              </p>
              <p>
                <strong>Ashtanga:</strong> Traditional series of poses in set
                sequence
              </p>
              <p>
                <strong>Hot Yoga:</strong> Heated room for deeper stretches
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Advanced Classes</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>
                <strong>Power Yoga:</strong> Strength-building athletic practice
              </p>
              <p>
                <strong>Arm Balances:</strong> Focus on challenging poses
              </p>
              <p>
                <strong>Inversions Workshop:</strong> Headstands and handstands
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple accordion items can be open simultaneously when type="multiple".',
      },
    },
  },
};

// FAQ section
export const FAQ: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-sand-900 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-sand-600">
          Everything you need to know about our yoga studio
        </p>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="pricing">
          <AccordionTrigger>What are your pricing options?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Drop-in Rate: $25</p>
                <p className="text-sm text-sand-600">
                  Perfect for trying out classes
                </p>
              </div>
              <div>
                <p className="font-medium">5-Class Pack: $100</p>
                <p className="text-sm text-sand-600">
                  Valid for 2 months, great for regular practice
                </p>
              </div>
              <div>
                <p className="font-medium">Unlimited Monthly: $89</p>
                <p className="text-sm text-sand-600">
                  Best value for dedicated practitioners
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>
            Do I need yoga experience to join?
          </AccordionTrigger>
          <AccordionContent>
            Not at all! We welcome students of all levels. Our beginner-friendly
            classes like Gentle Yoga and Hatha are perfect for those new to
            yoga. Our experienced instructors provide modifications and
            adjustments to help you practice safely and comfortably.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="equipment">
          <AccordionTrigger>Do you provide yoga equipment?</AccordionTrigger>
          <AccordionContent>
            Yes! We provide high-quality yoga mats, blocks, straps, bolsters,
            and blankets for all students. You're welcome to bring your own mat
            if you prefer, but it's not required. We also have props
            specifically designed for different types of classes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="booking">
          <AccordionTrigger>How do I book a class?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>You can book classes in several ways:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Online through our website (available 24/7)</li>
                <li>Using our mobile app</li>
                <li>Calling the studio during business hours</li>
                <li>In person at the front desk</li>
              </ul>
              <p className="text-sm text-sand-600 mt-2">
                We recommend booking in advance as popular classes fill up
                quickly!
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="policies">
          <AccordionTrigger>
            What are your cancellation policies?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>
                <strong>Standard Cancellation:</strong> Cancel up to 2 hours
                before class for a full credit back to your account.
              </p>
              <p>
                <strong>Late Cancellation:</strong> Cancellations within 2 hours
                of class start will result in a loss of credit.
              </p>
              <p>
                <strong>No-Show:</strong> Not attending a booked class without
                canceling will result in a loss of credit.
              </p>
              <p className="text-sm text-sand-600 mt-2">
                We understand that emergencies happen. Please contact us if you
                have special circumstances.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "A comprehensive FAQ section using accordion for a yoga studio website.",
      },
    },
  },
};

// Class descriptions
export const ClassDescriptions: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-sand-900 mb-2">
          Our Class Types
        </h2>
        <p className="text-sand-600">
          Explore our diverse range of yoga offerings
        </p>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="vinyasa">
          <AccordionTrigger>Vinyasa Flow</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>
                A dynamic practice that links breath with movement in flowing
                sequences. Each class features creative sequences that build
                heat and strength while improving flexibility.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-sand-800">Duration:</p>
                  <p>75 minutes</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Level:</p>
                  <p>Beginner to Intermediate</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Temperature:</p>
                  <p>Room temperature</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Focus:</p>
                  <p>Strength & Flexibility</p>
                </div>
              </div>

              <p className="text-sm text-sand-600">
                Perfect for those who enjoy variety and want to build both
                strength and flexibility in a mindful way.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="yin">
          <AccordionTrigger>Yin Yoga</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>
                A quiet, meditative practice where poses are held for 3-5
                minutes. Uses props to support the body while targeting deep
                connective tissues and joints.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-sand-800">Duration:</p>
                  <p>75 minutes</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Level:</p>
                  <p>All levels</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Temperature:</p>
                  <p>Room temperature</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Focus:</p>
                  <p>Deep stretching & Meditation</p>
                </div>
              </div>

              <p className="text-sm text-sand-600">
                Ideal for balancing more active practices, reducing stress, and
                improving flexibility.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="power">
          <AccordionTrigger>Power Yoga</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>
                An athletic, fitness-based approach to yoga that builds
                strength, flexibility, and stamina. Expect challenging poses,
                arm balances, and core work.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-sand-800">Duration:</p>
                  <p>60 minutes</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Level:</p>
                  <p>Intermediate to Advanced</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Temperature:</p>
                  <p>Heated (85°F)</p>
                </div>
                <div>
                  <p className="font-medium text-sand-800">Focus:</p>
                  <p>Strength & Endurance</p>
                </div>
              </div>

              <p className="text-sm text-sand-600">
                Great for athletes and those looking for a challenging,
                sweat-inducing workout.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Detailed class descriptions with structured information in accordion format.",
      },
    },
  },
};
