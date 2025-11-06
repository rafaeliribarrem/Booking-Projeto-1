import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of layered sections of content that are displayed one at a time. Built on Radix UI with earthy styling.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs
export const Basic: Story = {
  render: () => (
    <div className="w-96">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Password</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-sand-700">
                Update your profile information, email address, and notification
                preferences here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tab2">
          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>
                Keep your account secure with a strong password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-sand-700">
                Change your password and manage two-factor authentication
                settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tab3">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-sand-700">
                Set your preferred class types, notification settings, and
                booking preferences.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

// User dashboard tabs
export const UserDashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="history">Class History</TabsTrigger>
          <TabsTrigger value="passes">My Passes</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Vinyasa Flow</p>
                      <p className="text-sm text-sand-600">
                        with Sarah Johnson
                      </p>
                      <p className="text-sm text-sand-600">
                        Today, 6:00 PM - 7:15 PM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">Confirmed</Badge>
                    <p className="text-xs text-sand-600 mt-1">Studio A</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Yin Yoga</p>
                      <p className="text-sm text-sand-600">with Maya Kumar</p>
                      <p className="text-sm text-sand-600">
                        Tomorrow, 7:30 PM - 8:45 PM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">Confirmed</Badge>
                    <p className="text-xs text-sand-600 mt-1">Studio B</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Power Yoga</p>
                      <p className="text-sm text-sand-600">with Michael Chen</p>
                      <p className="text-sm text-sand-600">
                        Yesterday, 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">Completed</Badge>
                    <p className="text-xs text-sand-600 mt-1">Studio A</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Vinyasa Flow</p>
                      <p className="text-sm text-sand-600">
                        with Sarah Johnson
                      </p>
                      <p className="text-sm text-sand-600">Dec 1, 6:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">Completed</Badge>
                    <p className="text-xs text-sand-600 mt-1">Studio A</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="passes">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Monthly Unlimited
                  <Badge variant="success">Active</Badge>
                </CardTitle>
                <CardDescription>
                  Unlimited classes for December 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sand-600">Purchased:</span>
                    <span>Dec 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand-600">Expires:</span>
                    <span>Dec 31, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand-600">Classes this month:</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  5-Class Pack
                  <Badge variant="outline">Expired</Badge>
                </CardTitle>
                <CardDescription>Previous class package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sand-600">Purchased:</span>
                    <span>Oct 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand-600">Expired:</span>
                    <span>Nov 30, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand-600">Classes used:</span>
                    <span className="font-medium">5/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-sand-900">
                    First Name
                  </label>
                  <p className="text-sand-700">Sarah</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-sand-900">
                    Last Name
                  </label>
                  <p className="text-sand-700">Wilson</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-sand-900">
                  Email
                </label>
                <p className="text-sand-700">sarah.wilson@example.com</p>
              </div>

              <div>
                <label className="text-sm font-medium text-sand-900">
                  Yoga Experience
                </label>
                <p className="text-sand-700">Intermediate (2+ years)</p>
              </div>

              <div>
                <label className="text-sm font-medium text-sand-900">
                  Preferred Class Types
                </label>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">Vinyasa</Badge>
                  <Badge variant="secondary">Yin</Badge>
                  <Badge variant="secondary">Restorative</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "A comprehensive user dashboard with multiple tabs showing different aspects of the user account.",
      },
    },
  },
};

// Class schedule tabs
export const ClassSchedule: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="all">All Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Morning Flow</h3>
                    <p className="text-sm text-sand-600">
                      7:00 AM - 8:00 AM • Studio A
                    </p>
                    <p className="text-sm text-sand-600">with Sarah Johnson</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">Available</Badge>
                    <p className="text-xs text-sand-600 mt-1">8/12 spots</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Power Yoga</h3>
                    <p className="text-sm text-sand-600">
                      6:00 PM - 7:00 PM • Studio A
                    </p>
                    <p className="text-sm text-sand-600">with Michael Chen</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="warning">Almost Full</Badge>
                    <p className="text-xs text-sand-600 mt-1">14/15 spots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tomorrow" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Yin Yoga</h3>
                    <p className="text-sm text-sand-600">
                      7:30 PM - 8:45 PM • Studio B
                    </p>
                    <p className="text-sm text-sand-600">with Maya Kumar</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">Available</Badge>
                    <p className="text-xs text-sand-600 mt-1">5/10 spots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-sand-600">
                Weekly schedule view would show a calendar grid with all classes
                for the week.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-sand-600">
                Complete class listing with filters for type, instructor, and
                time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Class schedule organized by time periods using tabs for easy navigation.",
      },
    },
  },
};

// Vertical tabs
export const VerticalTabs: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs
        defaultValue="beginner"
        orientation="vertical"
        className="flex gap-6"
      >
        <TabsList className="flex-col h-fit w-48">
          <TabsTrigger value="beginner" className="w-full justify-start">
            Beginner Classes
          </TabsTrigger>
          <TabsTrigger value="intermediate" className="w-full justify-start">
            Intermediate Classes
          </TabsTrigger>
          <TabsTrigger value="advanced" className="w-full justify-start">
            Advanced Classes
          </TabsTrigger>
          <TabsTrigger value="specialty" className="w-full justify-start">
            Specialty Classes
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="beginner">
            <Card>
              <CardHeader>
                <CardTitle>Beginner-Friendly Classes</CardTitle>
                <CardDescription>
                  Perfect for those new to yoga or looking for a gentler
                  practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Gentle Yoga</p>
                      <p className="text-sm text-sand-600">
                        Slow-paced, accessible poses
                      </p>
                    </div>
                    <Badge variant="secondary">60 min</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Hatha Yoga</p>
                      <p className="text-sm text-sand-600">
                        Basic postures held for several breaths
                      </p>
                    </div>
                    <Badge variant="secondary">75 min</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Restorative Yoga</p>
                      <p className="text-sm text-sand-600">
                        Deeply relaxing with props support
                      </p>
                    </div>
                    <Badge variant="secondary">90 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intermediate">
            <Card>
              <CardHeader>
                <CardTitle>Intermediate Classes</CardTitle>
                <CardDescription>
                  For practitioners with some yoga experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Vinyasa Flow</p>
                      <p className="text-sm text-sand-600">
                        Dynamic sequences linking breath and movement
                      </p>
                    </div>
                    <Badge variant="accent">75 min</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Ashtanga</p>
                      <p className="text-sm text-sand-600">
                        Traditional series in set sequence
                      </p>
                    </div>
                    <Badge variant="accent">90 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Classes</CardTitle>
                <CardDescription>
                  Challenging practices for experienced yogis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Power Yoga</p>
                      <p className="text-sm text-sand-600">
                        Athletic, strength-building practice
                      </p>
                    </div>
                    <Badge variant="default">60 min</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Arm Balances</p>
                      <p className="text-sm text-sand-600">
                        Focus on challenging poses and transitions
                      </p>
                    </div>
                    <Badge variant="default">75 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialty">
            <Card>
              <CardHeader>
                <CardTitle>Specialty Classes</CardTitle>
                <CardDescription>
                  Unique offerings and workshops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Prenatal Yoga</p>
                      <p className="text-sm text-sand-600">
                        Safe practice for expecting mothers
                      </p>
                    </div>
                    <Badge variant="outline">60 min</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-sand-200 rounded-base">
                    <div>
                      <p className="font-medium">Meditation & Breathwork</p>
                      <p className="text-sm text-sand-600">
                        Mindfulness and breathing techniques
                      </p>
                    </div>
                    <Badge variant="outline">45 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Vertical tab layout for organizing class types by difficulty level.",
      },
    },
  },
};
