import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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
    include: { bookings: true, classType: true, instructor: true },
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

  const instructorInitials = session.instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
          Confirm Your Booking
        </h1>
        <p className="text-muted-foreground">
          Review the details before proceeding to payment
        </p>
      </div>

      <Card className="border border-primary/20 shadow-xl">
        <CardHeader className="border-b border-primary/20 bg-gradient-to-r from-secondary/40 via-card to-accent/20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-secondary/50 shadow-lg">
                <AvatarImage src={session.instructor.imageUrl || undefined} alt={session.instructor.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary via-primary/80 to-accent text-xl font-bold text-primary-foreground">
                  {instructorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 rounded-full border border-secondary/40 bg-accent p-1.5 text-accent-foreground shadow">
                <Users className="h-3 w-3 text-current" />
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{session.classType.name}</CardTitle>
              <CardDescription className="text-base mt-1">
                with {session.instructor.name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
              <Calendar className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Date</p>
                <p className="text-sm text-foreground/80">
                  {new Date(session.startsAt).toLocaleDateString([], {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-accent/20 p-3">
              <Clock className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-foreground">Time</p>
                <p className="text-sm text-foreground/80">
                  {new Date(session.startsAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(session.endsAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  ({session.classType.durationMinutes} min)
                </p>
              </div>
            </div>

            {session.location && (
              <div className="flex items-start gap-3 rounded-lg bg-secondary/20 p-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-sm text-foreground/80">{session.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 rounded-lg border border-primary/15 bg-card/80 p-3">
              <Users className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Availability</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-foreground/80">
                    {remaining} spot{remaining !== 1 ? "s" : ""} remaining
                  </p>
                  <Badge
                    variant={remaining > 3 ? "secondary" : "destructive"}
                    className={cn(
                      "text-xs",
                      remaining > 3 && "border border-transparent bg-secondary/40 text-secondary-foreground"
                    )}
                  >
                    {remaining <= 3 ? "Almost Full" : "Available"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {session.instructor.bio && (
            <div className="border-t border-border/70 pt-4">
              <p className="mb-2 font-medium text-foreground">About the Instructor</p>
              <p className="text-sm text-foreground/80">{session.instructor.bio}</p>
            </div>
          )}

          {session.classType.description && (
            <div className="border-t border-border/70 pt-4">
              <p className="mb-2 font-medium text-foreground">Class Description</p>
              <p className="text-sm text-foreground/80">{session.classType.description}</p>
            </div>
          )}

          <form action={proceedToCheckout} className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-primary/80 to-accent text-lg text-primary-foreground hover:from-primary/90 hover:to-accent/90"
            >
              Proceed to Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
