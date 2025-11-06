import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";
import { AdminMetricsOverview } from "@/components/admin/AdminMetricsOverview";
import { AdminQuickActions } from "@/components/admin/AdminQuickActions";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // Get current date for today's metrics
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // Fetch metrics data
  const [
    todayBookings,
    totalBookings,
    todaySessions,
    totalActiveSessions,
    totalUsers,
    totalRevenue,
  ] = await Promise.all([
    // Today's bookings
    prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
        status: "CONFIRMED",
      },
    }),
    // Total bookings this month
    prisma.booking.count({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1),
        },
        status: "CONFIRMED",
      },
    }),
    // Today's sessions
    prisma.classSession.count({
      where: {
        startsAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    }),
    // Total active sessions (future sessions)
    prisma.classSession.count({
      where: {
        startsAt: {
          gte: new Date(),
        },
      },
    }),
    // Total users
    prisma.user.count(),
    // Calculate revenue (simplified - assuming $25 per booking)
    prisma.booking.count({
      where: {
        status: "CONFIRMED",
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1),
        },
      },
    }),
  ]);

  // Calculate capacity utilization for today's sessions
  const todaySessionsWithBookings = await prisma.classSession.findMany({
    where: {
      startsAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      bookings: {
        where: {
          status: "CONFIRMED",
        },
      },
    },
  });

  const capacityData = todaySessionsWithBookings.reduce(
    (acc, session) => {
      acc.totalCapacity += session.capacity;
      acc.totalBooked += session.bookings.length;
      return acc;
    },
    { totalCapacity: 0, totalBooked: 0 }
  );

  const capacityUtilization =
    capacityData.totalCapacity > 0 ?
      Math.round((capacityData.totalBooked / capacityData.totalCapacity) * 100)
    : 0;

  const metrics = {
    todayBookings,
    totalBookings,
    todaySessions,
    totalActiveSessions,
    totalUsers,
    monthlyRevenue: totalRevenue * 25, // Simplified calculation
    capacityUtilization,
  };

  return (
    <div className="space-y-8">
      <AdminMetricsOverview metrics={metrics} />
      <AdminQuickActions />
    </div>
  );
}
