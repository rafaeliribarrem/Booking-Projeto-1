"use client";

import { useRef } from "react";
import { SessionCard } from "@/components/schedule/SessionCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimilarClassesSectionProps {
  sessions: Array<{
    id: string;
    classType: {
      name: string;
      image?: string;
    };
    instructor: {
      name: string;
      avatar?: string;
    };
    startsAt: Date;
    duration: number;
    capacity: number;
    bookedCount: number;
  }>;
}

export function SimilarClassesSection({
  sessions,
}: SimilarClassesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (sessions.length === 0) return null;

  return (
    <section className="py-12 bg-sand-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-sand-900">
            Similar Classes
          </h2>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex-none w-[85%] md:w-[400px] snap-start"
            >
              <SessionCard session={session} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
