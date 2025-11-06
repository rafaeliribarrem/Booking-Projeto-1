import type { Meta, StoryObj } from "@storybook/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const meta = {
  title: "UI/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive form system built on React Hook Form with Zod validation. Includes form fields, labels, descriptions, and error messages with earthy styling.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form field
export const BasicField: Story = {
  render: () => {
    const form = useForm({
      resolver: zodResolver(
        z.object({
          name: z.string().min(1, "Name is required"),
        })
      ),
      defaultValues: {
        name: "",
      },
    });

    return (
      <Form {...form}>
        <form className="w-80 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will appear on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A basic form field with label, input, description, and error message.",
      },
    },
  },
};

// Form with validation errors
export const WithValidationErrors: Story = {
  render: () => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "invalid-email",
        phone: "123",
        message: "short",
      },
    });

    // Trigger validation to show errors
    React.useEffect(() => {
      form.trigger();
    }, [form]);

    return (
      <Form {...form}>
        <form className="w-80 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form fields showing validation errors with red styling and error messages.",
      },
    },
  },
};

// Complete contact form
export const ContactForm: Story = {
  render: () => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log("Form submitted:", values);
      alert("Form submitted successfully!");
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-sand-900 mb-2">
              Contact Us
            </h2>
            <p className="text-sand-600">Get in touch with our yoga studio</p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormDescription>
                  Your name as you'd like us to address you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll use this to respond to your inquiry.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormDescription>
                  Optional. For urgent inquiries or class confirmations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <textarea
                    className="min-h-[100px] w-full rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 placeholder:text-sand-600 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20 disabled:opacity-50"
                    placeholder="Tell us about your yoga experience, questions, or how we can help..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Share any questions about classes, pricing, or our studio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Form>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "A complete contact form with validation, descriptions, and submit functionality.",
      },
    },
  },
};

// Registration form
export const RegistrationForm: Story = {
  render: () => {
    const registrationSchema = z
      .object({
        firstName: z
          .string()
          .min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
        experience: z.enum(["beginner", "intermediate", "advanced"]),
        newsletter: z.boolean().default(false),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });

    const form = useForm({
      resolver: zodResolver(registrationSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        experience: "beginner" as const,
        newsletter: false,
      },
    });

    const onSubmit = (values: z.infer<typeof registrationSchema>) => {
      console.log("Registration submitted:", values);
      alert("Registration successful!");
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-sand-900 mb-2">
              Join Our Studio
            </h2>
            <p className="text-sand-600">
              Create your account to start booking classes
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a secure password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yoga Experience Level</FormLabel>
                <FormControl>
                  <select
                    className="h-11 w-full rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
                    {...field}
                  >
                    <option value="beginner">Beginner - New to yoga</option>
                    <option value="intermediate">
                      Intermediate - Some experience
                    </option>
                    <option value="advanced">
                      Advanced - Regular practitioner
                    </option>
                  </select>
                </FormControl>
                <FormDescription>
                  This helps us recommend appropriate classes for you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "A comprehensive registration form with multiple field types and complex validation.",
      },
    },
  },
};
