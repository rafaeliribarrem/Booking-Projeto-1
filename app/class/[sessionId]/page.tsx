import { prisma } from "@/lib/prisma";
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
  if (!session)
    return <div className="container mx-auto px-4 py-8">Class not found.</div>;
  const remaining = session.capacity - session.bookings.length;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        {session.classType.name}
      </h1>
      <p className="mt-2 text-muted-foreground">
        With {session.instructor.name}
      </p>
      <p className="mt-1 text-muted-foreground">
        {new Date(session.startsAt).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        })}{" "}
        · {remaining} spots left
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href={`/booking/start?sessionId=${session.id}`}>
            Book this class
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/schedule">Back to schedule</Link>
        </Button>
      </div>
    </div>
  );
}
