import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingProgress } from "@/components/booking/BookingProgress";

const BOOKING_STEPS = [
  { id: 1, name: "Select Pass" },
  { id: 2, name: "Confirm" },
  { id: 3, name: "Payment" },
  { id: 4, name: "Complete" },
];

interface Props {
  searchParams?: { bookingId?: string };
}

export default async function MockCheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const bookingId = params?.bookingId;

  if (!bookingId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-destructive">Missing booking ID.</p>
      </div>
    );
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      classSession: { include: { classType: true, instructor: true } },
      user: true,
    },
  });

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-destructive">Booking not found.</p>
      </div>
    );
  }

  async function processPayment(formData: FormData) {
    "use server";
    const action = formData.get("action");

    // Re-fetch booking to ensure it exists
    const currentBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!currentBooking) {
      throw new Error("Booking not found");
    }

    if (action === "success") {
      // Mark booking as confirmed and create mock payment record
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      });

      await prisma.payment.create({
        data: {
          userId: currentBooking.userId,
          provider: "MOCK",
          amountCents: 2000, // $20.00 mock price
          currency: "usd",
          status: "SUCCEEDED",
          stripeCheckoutId: `mock_checkout_${Date.now()}`,
          stripePaymentIntentId: `mock_pi_${Date.now()}`,
        },
      });

      redirect(`/booking/success?bookingId=${bookingId}`);
    } else {
      // Cancel booking
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
      });
      redirect(`/schedule?canceled=1`);
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <BookingProgress currentStep={3} steps={BOOKING_STEPS} />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Mock Payment - Study Mode</CardTitle>
            <CardDescription>
              This is a simulated checkout. No real payment will be processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Booking Details</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">Class:</span>{" "}
                  {booking.classSession.classType.name}
                </p>
                <p>
                  <span className="font-medium">Instructor:</span>{" "}
                  {booking.classSession.instructor.name}
                </p>
                <p>
                  <span className="font-medium">Date & Time:</span>{" "}
                  {new Date(booking.classSession.startsAt).toLocaleString([], {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {booking.classSession.classType.durationMinutes} minutes
                </p>
                {booking.classSession.location && (
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {booking.classSession.location}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold">$20.00</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                This is a mock price for development purposes.
              </p>
            </div>

            <form action={processPayment} className="space-y-3">
              <Button
                type="submit"
                name="action"
                value="success"
                className="w-full"
                size="lg"
              >
                Complete Payment (Mock)
              </Button>
              <Button
                type="submit"
                name="action"
                value="cancel"
                variant="outline"
                className="w-full"
              >
                Cancel Booking
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Development Mode: Click "Complete Payment" to simulate a
              successful payment and confirm your booking.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
