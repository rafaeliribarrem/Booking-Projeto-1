"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { PassSelection } from "@/components/booking/PassSelection";
import { BookingProgress } from "@/components/booking/BookingProgress";
import { AuthModal } from "@/components/booking/AuthModal";

const BOOKING_STEPS = [
  { id: 1, name: "Select Pass" },
  { id: 2, name: "Confirm" },
  { id: 3, name: "Payment" },
  { id: 4, name: "Complete" },
];

const AVAILABLE_PASSES = [
  {
    id: "drop-in",
    name: "Drop-In",
    price: 20,
    credits: 1,
    description: "Perfect for trying out a class",
    features: [
      "Single class access",
      "No commitment",
      "Valid for 30 days",
      "All class types included",
    ],
  },
  {
    id: "pack-5",
    name: "5-Class Pack",
    price: 85,
    credits: 5,
    description: "Best value for regular practice",
    features: [
      "5 class credits",
      "Save $15 vs drop-in",
      "Valid for 90 days",
      "All class types included",
      "Share with friends",
    ],
    recommended: true,
  },
  {
    id: "unlimited",
    name: "Unlimited Monthly",
    price: 150,
    description: "Unlimited access for dedicated yogis",
    features: [
      "Unlimited classes",
      "Best value for 8+ classes/month",
      "Auto-renews monthly",
      "All class types included",
      "Priority booking",
    ],
  },
];

function StartBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { data: session, status } = useSession();
  const [selectedPassId, setSelectedPassId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      router.push("/schedule");
    }
  }, [sessionId, router]);

  useEffect(() => {
    // Show auth modal if user is not authenticated
    if (status === "unauthenticated") {
      setShowAuthModal(true);
    }
  }, [status]);

  const handleContinue = async () => {
    if (!selectedPassId || !sessionId) return;

    // Check if user is authenticated
    if (!session) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      // Navigate to confirmation page with selected pass and session
      router.push(
        `/booking/confirm?sessionId=${sessionId}&passId=${selectedPassId}`
      );
    } catch (error) {
      console.error("Error proceeding to confirmation:", error);
      setIsLoading(false);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    // If user closes modal without authenticating, redirect to schedule
    if (!session) {
      router.push("/schedule");
    }
  };

  if (!sessionId) {
    return null;
  }

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-sand-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-cream-50">
        <BookingProgress currentStep={1} steps={BOOKING_STEPS} />

        <div className="container mx-auto max-w-6xl px-4 py-8">
          <PassSelection
            passes={AVAILABLE_PASSES}
            selectedPassId={selectedPassId}
            onSelectPass={setSelectedPassId}
          />

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!selectedPassId || isLoading}
              className="px-8 py-3 bg-terracotta-500 text-cream-50 rounded-lg font-medium hover:bg-terracotta-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Loading..." : "Continue to Confirmation"}
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        returnUrl={`/booking/start?sessionId=${sessionId}`}
      />
    </>
  );
}

export default function StartBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="text-sand-700">Loading...</div>
        </div>
      }
    >
      <StartBookingContent />
    </Suspense>
  );
}
