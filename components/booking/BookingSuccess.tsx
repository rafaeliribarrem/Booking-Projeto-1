import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, Download } from "lucide-react";

interface BookingSuccessProps {
  booking: {
    id: string;
    className: string;
    instructor: string;
    date: string;
    time: string;
    location?: string;
  };
}

export function BookingSuccess({ booking }: BookingSuccessProps) {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage-100 mb-6">
            <CheckCircle className="w-12 h-12 text-sage-600" />
          </div>
          <h1 className="font-display text-4xl font-bold text-sand-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-sand-700">
            You're all set for your yoga class
          </p>
        </div>

        {/* Booking Details */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-sand-900 mb-6">
            Class Details
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-sand-700 mb-1">Class</p>
              <p className="font-semibold text-sand-900 text-lg">
                {booking.className}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-sand-700 mb-1">Instructor</p>
                <p className="font-medium text-sand-900">
                  {booking.instructor}
                </p>
              </div>

              <div>
                <p className="text-sm text-sand-700 mb-1">Date & Time</p>
                <p className="font-medium text-sand-900">
                  {booking.date} at {booking.time}
                </p>
              </div>

              {booking.location && (
                <div>
                  <p className="text-sm text-sand-700 mb-1">Location</p>
                  <p className="font-medium text-sand-900">
                    {booking.location}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-sand-700 mb-1">Booking ID</p>
                <p className="font-medium text-sand-900 font-mono text-sm">
                  {booking.id}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-sand-200">
            <p className="text-sm text-sand-700 mb-4">
              A confirmation email has been sent to your inbox with all the
              details.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/account">View My Bookings</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/schedule">Browse More Classes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
