"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, DollarSign } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Beautiful Studio Space",
    description:
      "Natural light, premium props, and a warm atmosphere designed to help you disconnect and focus on your practice.",
    iconClass: "text-primary",
    bgClass: "bg-secondary/40",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from compassionate, certified teachers who bring years of experience and genuine care to every class.",
    iconClass: "text-accent",
    bgClass: "bg-accent/20",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description:
      "Choose from drop-in classes, multi-class packs, or unlimited monthly memberships. No commitment required.",
    iconClass: "text-primary",
    bgClass: "bg-secondary/40",
  },
];

export function FeatureCards() {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="mb-4 text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent md:text-4xl">
          Why Choose Serenity?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We're more than just a studio—we're a community dedicated to your wellness journey.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Card className="h-full border border-primary/20 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
              <CardHeader>
                <motion.div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${feature.bgClass}`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className={`h-7 w-7 ${feature.iconClass}`} />
                </motion.div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
