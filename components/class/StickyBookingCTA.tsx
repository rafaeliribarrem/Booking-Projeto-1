"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StickyBookingCTAProps {
  sessionId: string;
  isFull: boolean;
  price: number;
}

export function StickyBookingCTA({
  sessionId,
  isFull,
  price,
}: StickyBookingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when user scrolls past the hero section
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-cream-100 border-t border-sand-200 shadow-lg animate-in slide-in-from-bottom">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-sand-700">Starting at</p>
            <p className="text-xl font-bold text-terracotta-600">${price}</p>
          </div>
          {isFull ? (
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 max-w-xs"
              asChild
            >
              <Link
                href={`/booking/start?sessionId=${sessionId}&waitlist=true`}
              >
                Join Waitlist
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="flex-1 max-w-xs" asChild>
              <Link href={`/booking/start?sessionId=${sessionId}`}>
                Book This Class
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
