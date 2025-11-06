"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface BookingConfirmationProps {
  session: {
    className: string;
    instructor: string;
    date: string;
    time: string;
    duration: number;
    location?: string;
  };
  pass: {
    name: string;
    price: number;
  };
  onConfirm: () => void;
  isLoading?: boolean;
}

export function BookingConfirmation({
  session,
  pass,
  onConfirm,
  isLoading,
}: BookingConfirmationProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-sand-900 mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-sand-700">
          Review your class details before confirming
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Class Details */}
        <div className="md:col-span-1 lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-sand-900 mb-6">
              Class Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-sand-700 mb-1">Class</p>
                <p className="font-semibold text-sand-900 text-lg">
                  {session.className}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-sand-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-sand-700">Instructor</p>
                    <p className="font-medium text-sand-900">
                      {session.instructor}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-sand-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-sand-700">Date</p>
                    <p className="font-medium text-sand-900">{session.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sand-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-sand-700">Time</p>
                    <p className="font-medium text-sand-900">
                      {session.time} • {session.duration} min
                    </p>
                  </div>
                </div>

                {session.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sand-700 mt-0.5" />
                    <div>
                      <p className="text-sm text-sand-700">Location</p>
                      <p className="font-medium text-sand-900">
                        {session.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="md:col-span-1 lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-sand-900 mb-6">
              Payment Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sand-900">{pass.name}</p>
                  <p className="text-sm text-sand-700">1 class</p>
                </div>
                <p className="font-semibold text-sand-900">${pass.price}</p>
              </div>

              <div className="border-t border-sand-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sand-900">Total</p>
                  <p className="text-2xl font-bold text-terracotta-600">
                    ${pass.price}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Terms and Conditions */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
          />
          <div className="flex-1">
            <Label
              htmlFor="terms"
              className="text-sm text-sand-700 cursor-pointer"
            >
              I agree to the{" "}
              <a href="/terms" className="text-terracotta-600 hover:underline">
                terms and conditions
              </a>{" "}
              and{" "}
              <a
                href="/cancellation"
                className="text-terracotta-600 hover:underline"
              >
                cancellation policy
              </a>
            </Label>
          </div>
        </div>
      </Card>

      {/* Confirm Button */}
      <div className="flex justify-end gap-4">
        <Button
          size="lg"
          onClick={onConfirm}
          disabled={!agreedToTerms || isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}
