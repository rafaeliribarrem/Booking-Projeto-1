"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function AnimatedHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-secondary/40 via-background to-accent/20 py-32 dark:from-background dark:via-background dark:to-accent/30">
      <div
        className="absolute inset-0 bg-size-[20px_20px] opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 45%, transparent) 1px, transparent 1px)",
        }}
      />

      <motion.div
        className="absolute top-20 right-20 h-72 w-72 rounded-full blur-3xl"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--primary) 22%, transparent)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 h-96 w-96 rounded-full blur-3xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--accent) 25%, transparent)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-accent" />
            </motion.div>
            <span className="text-sm font-medium uppercase tracking-wide text-primary">
              Welcome to Serenity
            </span>
            <motion.div
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-accent" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
          >
            Transform Your{" "}
            <span className="bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Practice
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground"
          >
            Experience the heat, feel the energy, and discover your strength at
            Serenity Yoga Studio. From flowing Vinyasa to restorative Yin, we
            offer classes for every body and every level.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/schedule">Book Your First Class</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-2 border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/instructors">Meet Our Instructors</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
