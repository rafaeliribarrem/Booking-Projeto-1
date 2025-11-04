"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Star } from "lucide-react";

interface InstructorCardProps {
  instructor: {
    id: string;
    name: string;
    bio: string | null;
    imageUrl: string | null;
  };
  specialty?: string;
  experience?: string;
  index?: number;
}

export function InstructorCard({ instructor, specialty, experience, index = 0 }: InstructorCardProps) {
  const initials = instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card className="group overflow-hidden border border-primary/20 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
        <div className="relative h-48 overflow-hidden bg-linear-to-br from-secondary/40 via-card to-accent/20">
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-secondary/60 via-card to-accent/30"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar className="h-32 w-32 border-4 border-secondary/50 shadow-2xl">
                <AvatarImage src={instructor.imageUrl || undefined} alt={instructor.name} />
                <AvatarFallback className="bg-linear-to-br from-primary via-primary/80 to-accent text-3xl font-bold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>

          <motion.div
            className="absolute top-4 right-4"
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-6 w-6 text-accent drop-shadow-lg" />
          </motion.div>
        </div>

        <CardHeader className="text-center pb-3">
          <CardTitle className="bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-2xl font-bold text-transparent">
            {instructor.name}
          </CardTitle>
          {specialty && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="mt-2 gap-1 border border-transparent bg-secondary/40 text-secondary-foreground">
                <Star className="h-3 w-3 text-primary" />
                {specialty}
              </Badge>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          {instructor.bio && (
            <CardDescription className="text-sm line-clamp-3 text-center">
              {instructor.bio}
            </CardDescription>
          )}

          {experience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-xs text-foreground/80"
            >
              <Heart className="h-4 w-4 text-accent" />
              <span>{experience}</span>
            </motion.div>
          )}

          <motion.div
            className="border-t border-border/70 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  <Star className="h-4 w-4 text-primary" fill="currentColor" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
