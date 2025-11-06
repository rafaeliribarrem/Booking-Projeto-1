import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/account/DashboardHeader";
import { AccountPageClient } from "@/components/account/AccountPageClient";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  // Fetch user data
  const [bookings, passes, user] = await Promise.all([
    prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        classSession: {
          include: {
            classType: true,
            instructor: true,
          },
        },
      },
      orderBy: { classSession: { startsAt: "asc" } },
    }),
    prisma.pass.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true },
    }),
  ]);

  if (!user) {
    redirect("/auth/signin");
  }

  // Separate bookings into upcoming and past
  const now = new Date();
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.classSession.startsAt) >= now && b.status === "CONFIRMED"
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.classSession.startsAt) < now || b.status !== "CONFIRMED"
  );

  // Separate passes into active and expired
  const activePasses = passes.filter(
    (p) => !p.expiresAt || new Date(p.expiresAt) >= now
  );
  const expiredPasses = passes.filter(
    (p) => p.expiresAt && new Date(p.expiresAt) < now
  );

  // Calculate stats
  const totalCredits = activePasses.reduce(
    (sum, pass) => sum + (pass.creditsRemaining || 0),
    0
  );

  // Transform bookings for BookingCard component
  const transformBooking = (booking: (typeof bookings)[0]) => ({
    id: booking.id,
    className: booking.classSession.classType.name,
    instructor: booking.classSession.instructor.name,
    date: new Date(booking.classSession.startsAt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(booking.classSession.startsAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    duration: booking.classSession.classType.durationMinutes,
    location: booking.classSession.location || undefined,
    status:
      booking.status === "CANCELLED" ? ("cancelled" as const)
      : new Date(booking.classSession.startsAt) >= now ? ("upcoming" as const)
      : ("past" as const),
  });

  // Transform passes for PassesDisplay component
  const transformPass = (pass: (typeof passes)[0]) => ({
    id: pass.id,
    type: pass.type,
    creditsRemaining: pass.creditsRemaining || undefined,
    totalCredits: pass.type === "PACK_5" ? 5 : undefined,
    expiresAt:
      pass.expiresAt ?
        new Date(pass.expiresAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : undefined,
    status:
      pass.expiresAt && new Date(pass.expiresAt) < now ?
        ("expired" as const)
      : ("active" as const),
  });

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Dashboard Header */}
        <DashboardHeader
          userName={user.name || "User"}
          upcomingClasses={upcomingBookings.length}
          remainingCredits={totalCredits}
        />

        {/* Dashboard Tabs */}
        <div className="mt-12">
          <AccountPageClient
            upcomingBookings={upcomingBookings.map(transformBooking)}
            pastBookings={pastBookings.map(transformBooking)}
            activePasses={activePasses.map(transformPass)}
            expiredPasses={expiredPasses.map(transformPass)}
            user={{
              name: user.name || "",
              email: user.email || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
