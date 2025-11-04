import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface Props {
  searchParams?: { sessionId?: string };
}

export default async function StartBookingPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params?.sessionId;
  if (!sessionId)
    return (
      <div className="container mx-auto px-4 py-8">Missing sessionId.</div>
    );
  const session = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: { bookings: true, classType: true },
  });
  if (!session)
    return <div className="container mx-auto px-4 py-8">Class not found.</div>;

  const userSession = await auth();
  if (!userSession?.user?.id) {
    redirect(`/auth/signin?callbackUrl=/booking/start?sessionId=${sessionId}`);
  }

  const remaining = session.capacity - session.bookings.length;
  if (remaining <= 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        This class is full. Please choose another.
      </div>
    );
  }

  // Ensure user not already booked
  const existing = await prisma.booking.findFirst({
    where: { userId: userSession.user.id, classSessionId: session.id },
  });
  const booking =
    existing ??
    (await prisma.booking.create({
      data: { userId: userSession.user.id, classSessionId: session.id },
    }));

  async function proceedToCheckout() {
    "use server";
    const res = await fetch(`${process.env.NEXTAUTH_URL}/booking/checkout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ bookingId: booking.id }),
    });
    if (!res.ok) throw new Error("Failed to create checkout session");
    const { url } = await res.json();
    if (url) {
      redirect(url);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Confirm booking</h1>
      <p className="mt-2 text-muted-foreground">
        {session.classType.name} on{" "}
        {new Date(session.startsAt).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      <form action={proceedToCheckout}>
        <Button type="submit" className="mt-6">
          Proceed to payment
        </Button>
      </form>
    </div>
  );
}
