"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SessionCardProps {
  session: {
    id: string;
    startsAt: Date;
    endsAt: Date;
    capacity: number;
    location: string | null;
    classType: {
      name: string;
      description: string | null;
      durationMinutes: number;
      difficulty: string | null;
    };
    instructor: {
      name: string;
      imageUrl: string | null;
    };
    bookings: Array<{ id: string }>;
  };
  index?: number;
}

export function SessionCard({ session, index = 0 }: SessionCardProps) {
  const spotsLeft = session.capacity - session.bookings.length;
  const isAlmostFull = spotsLeft <= 3;
  const isFull = spotsLeft === 0;

  const instructorInitials = session.instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const difficultyClasses: Record<string, string> = {
    Beginner: "bg-accent/20 text-accent-foreground",
    Intermediate: "bg-secondary/40 text-secondary-foreground",
    Advanced: "bg-primary/15 text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden border border-primary/20 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background/90 to-accent/20" />

          <CardHeader className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <CardTitle className="text-xl">{session.classType.name}</CardTitle>
                  {session.classType.difficulty && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border border-transparent",
                        difficultyClasses[session.classType.difficulty] ??
                          "bg-secondary/40 text-secondary-foreground"
                      )}
                    >
                      {session.classType.difficulty}
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {session.classType.description || "Join us for an amazing yoga session"}
                </CardDescription>
              </div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="h-14 w-14 border border-secondary/40 shadow-md">
                  <AvatarImage
                    src={session.instructor.imageUrl || undefined}
                    alt={session.instructor.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary via-primary/80 to-accent text-sm font-bold text-primary-foreground">
                    {instructorInitials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="relative space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {new Date(session.startsAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Clock className="h-4 w-4 text-accent" />
                <span>
                  {new Date(session.startsAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                </span>
              </div>

              {session.location && (
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="truncate">{session.location}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-2">
              <div className="text-sm text-foreground/80">
                with <span className="font-medium text-foreground">{session.instructor.name}</span>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="sm"
                  disabled={isFull}
                  variant={isFull ? "outline" : "default"}
                  className={cn(
                    "font-semibold",
                    isFull
                      ? "border-primary text-primary hover:bg-primary/10"
                      : "bg-gradient-to-r from-primary via-primary/80 to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
                  )}
                >
                  <Link href={`/booking/start?sessionId=${session.id}`}>
                    {isFull ? "Full" : isAlmostFull ? "Book Now!" : "Book"}
                  </Link>
                </Button>
              </motion.div>
            </div>

            {isAlmostFull && !isFull && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-0 right-0"
              >
                <Badge variant="destructive" className="text-xs">
                  Almost Full!
                </Badge>
              </motion.div>
            )}
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
