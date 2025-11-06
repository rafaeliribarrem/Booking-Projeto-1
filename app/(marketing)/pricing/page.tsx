import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { FAQ } from "@/components/pricing/FAQ";

const pricingTiers = [
  {
    name: "Drop-In",
    price: "$25",
    period: "per class",
    description: "Perfect for trying out our classes",
    features: [
      "Single class access",
      "All class types available",
      "No commitment required",
      "Book anytime",
    ],
    href: "/schedule",
    popular: false,
  },
  {
    name: "5-Class Pack",
    price: "$100",
    period: "5 classes",
    description: "Best value for regular practice",
    features: [
      "5 class credits",
      "Valid for 3 months",
      "All class types included",
      "Save $25 vs drop-in",
      "Flexible scheduling",
    ],
    href: "/schedule",
    popular: true,
  },
  {
    name: "Unlimited Monthly",
    price: "$150",
    period: "per month",
    description: "Unlimited access for dedicated yogis",
    features: [
      "Unlimited classes",
      "Priority booking",
      "All class types included",
      "Guest pass included",
      "Cancel anytime",
    ],
    href: "/schedule",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="bg-sand-50 border-b border-sand-200">
        <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-sand-700 max-w-2xl mx-auto">
            Choose the plan that fits your practice. All plans include access to
            our full range of yoga classes and experienced instructors.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto auto-rows-fr">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              variant={tier.popular ? "elevated" : "default"}
              className={`relative p-8 h-full flex flex-col ${
                tier.popular ? "ring-2 ring-terracotta-500" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-terracotta-500 text-cream-50 text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-sand-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sand-700 text-sm">{tier.description}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-terracotta-600">
                      {tier.price}
                    </span>
                    <span className="text-sand-700">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                      <span className="text-sand-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Button
                  variant={tier.popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href={tier.href}>Get Started</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
}
