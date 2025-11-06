"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { BookingProgress } from "@/components/booking/BookingProgress";

const BOOKING_STEPS = [
  { id: 1, name: "Select Pass" },
  { id: 2, name: "Confirm" },
  { id: 3, name: "Payment" },
  { id: 4, name: "Complete" },
];

const PASS_INFO: Record<
  string,
  { name: string; price: number; credits?: number }
> = {
  "drop-in": { name: "Drop-In", price: 20, credits: 1 },
  "pack-5": { name: "5-Class Pack", price: 85, credits: 5 },
  unlimited: { name: "Unlimited Monthly", price: 150 },
};

function ConfirmBookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const passId = searchParams.get("passId");
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!sessionId || !passId) {
      router.push("/schedule");
      return;
    }

    if (status === "unauthenticated") {
      router.push(
        `/auth/signin?callbackUrl=/booking/confirm?sessionId=${sessionId}&passId=${passId}`
      );
      return;
    }

    if (status === "authenticated") {
      fetchSessionData();
    }
  }, [sessionId, passId, status, router]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch session");
      const data = await response.json();
      setSessionData(data);
    } catch (error) {
      console.error("Error fetching session:", error);
      router.push("/schedule");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!sessionId || !passId) return;

    setIsConfirming(true);
    try {
      // Create booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          passType: passId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const booking = await response.json();

      // Navigate to success page
      router.push(`/booking/success?bookingId=${booking.id}`);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking. Please try again.");
      setIsConfirming(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-sand-700">Loading...</div>
      </div>
    );
  }

  if (!sessionData || !passId || !PASS_INFO[passId]) {
    return null;
  }

  const pass = PASS_INFO[passId];
  const sessionInfo = {
    className: sessionData.classType?.name || "Yoga Class",
    instructor: sessionData.instructor?.name || "Instructor",
    date: new Date(sessionData.startsAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(sessionData.startsAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    duration: sessionData.classType?.durationMinutes || 60,
    location: sessionData.location,
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <BookingProgress currentStep={2} steps={BOOKING_STEPS} />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <BookingConfirmation
          session={sessionInfo}
          pass={pass}
          onConfirm={handleConfirm}
          isLoading={isConfirming}
        />
      </div>
    </div>
  );
}

export default function ConfirmBookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmBookingPageContent />
    </Suspense>
  );
}
