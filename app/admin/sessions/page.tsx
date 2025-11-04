import { prisma } from "@/lib/prisma";
import { SessionManagement } from "@/components/admin/SessionManagement";

export const dynamic = "force-dynamic";

export default async function AdminSessionsPage() {
  const sessions = await prisma.classSession.findMany({
    where: {
      startsAt: { gte: new Date() },
    },
    orderBy: { startsAt: "asc" },
    include: {
      classType: true,
      instructor: true,
      bookings: true,
    },
    take: 100,
  });

  const instructors = await prisma.instructor.findMany({
    orderBy: { name: "asc" },
  });

  const classTypes = await prisma.classType.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Sessions</h2>
      <SessionManagement
        sessions={sessions}
        instructors={instructors}
        classTypes={classTypes}
      />
    </div>
  );
}
