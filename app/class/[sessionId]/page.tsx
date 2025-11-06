import { prisma } from "@/lib/prisma";
import { ClassDetailHero } from "@/components/class/ClassDetailHero";
import { ClassDetailsGrid } from "@/components/class/ClassDetailsGrid";
import { StickyBookingCTA } from "@/components/class/StickyBookingCTA";
import { SimilarClassesSection } from "@/components/class/SimilarClassesSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: { sessionId: string };
}

export default async function ClassDetailPage({ params }: Props) {
  const session = await prisma.classSession.findUnique({
    where: { id: params.sessionId },
    include: { classType: true, instructor: true, bookings: true },
  });

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-sand-900 mb-4">
          Class Not Found
        </h1>
        <p className="text-sand-700 mb-6">
          The class you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/schedule">Browse Schedule</Link>
        </Button>
      </div>
    );
  }

  const bookedCount = session.bookings.length;
  const isFull = bookedCount >= session.capacity;

  // Fetch similar classes (same class type, future sessions)
  const similarSessions = await prisma.classSession.findMany({
    where: {
      classTypeId: session.classTypeId,
      id: { not: session.id },
      startsAt: { gte: new Date() },
    },
    include: {
      classType: true,
      instructor: true,
      bookings: true,
    },
    take: 6,
    orderBy: { startsAt: "asc" },
  });

  const transformedSimilarSessions = similarSessions.map((s) => ({
    id: s.id,
    classType: {
      name: s.classType.name,
      image: undefined,
    },
    instructor: {
      name: s.instructor.name,
      avatar: s.instructor.imageUrl || undefined,
    },
    startsAt: s.startsAt,
    duration: s.classType.durationMinutes,
    capacity: s.capacity,
    bookedCount: s.bookings.length,
  }));

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <ClassDetailHero
        classType={{
          name: session.classType.name,
          difficulty: session.classType.difficulty || undefined,
        }}
      />

      {/* Details Grid */}
      <ClassDetailsGrid
        session={{
          startsAt: session.startsAt,
          duration: session.classType.durationMinutes,
          location: session.location || undefined,
          capacity: session.capacity,
          bookedCount,
          price: 25, // Default drop-in price
        }}
        classType={{
          description: session.classType.description || undefined,
          difficulty: session.classType.difficulty || undefined,
          expectations: [
            "Bring your own mat or rent one at the studio",
            "Arrive 10 minutes early to settle in",
            "Wear comfortable, breathable clothing",
            "Stay hydrated before and after class",
          ],
        }}
        instructor={{
          name: session.instructor.name,
          avatar: session.instructor.imageUrl || undefined,
          bio: session.instructor.bio || undefined,
        }}
      />

      {/* Desktop Booking CTA */}
      <div className="hidden md:block bg-sand-50 border-t border-sand-200 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-sand-700 mb-1">Ready to join?</p>
              <p className="font-display text-2xl font-bold text-terracotta-600">
                Starting at $25
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/schedule">Back to Schedule</Link>
              </Button>
              {isFull ? (
                <Button variant="secondary" size="lg" asChild>
                  <Link
                    href={`/booking/start?sessionId=${session.id}&waitlist=true`}
                  >
                    Join Waitlist
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <Link href={`/booking/start?sessionId=${session.id}`}>
                    Book This Class
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Classes */}
      <SimilarClassesSection sessions={transformedSimilarSessions} />

      {/* Mobile Sticky CTA */}
      <StickyBookingCTA sessionId={session.id} isFull={isFull} price={25} />
    </div>
  );
}
