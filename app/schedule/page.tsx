import { prisma } from "@/lib/prisma";
import { SessionList } from "@/components/schedule/SessionList";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface SchedulePageProps {
  searchParams?: {
    date?: string;
    instructor?: string;
    style?: string;
  };
}

export default async function SchedulePage({
  searchParams,
}: SchedulePageProps) {
  const params = await searchParams;
  const where: any = { startsAt: { gte: new Date() } };
  if (params?.instructor) where.instructorId = params.instructor;
  if (params?.style) where.classTypeId = params.style;
  if (params?.date) {
    const day = new Date(params.date);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    where.startsAt = { gte: day, lt: nextDay };
  }

  const sessions = await prisma.classSession.findMany({
    where,
    orderBy: { startsAt: "asc" },
    include: { classType: true, instructor: true, bookings: true },
    take: 200,
  });

  const instructors = await prisma.instructor.findMany({
    orderBy: { name: "asc" },
  });
  const styles = await prisma.classType.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Class Schedule</h1>
        <p className="text-muted-foreground text-lg">
          Find your perfect session and book your spot
        </p>
      </div>
      <Suspense>
        <SessionList
          sessions={sessions}
          instructors={instructors}
          styles={styles}
        />
      </Suspense>
    </div>
  );
}
