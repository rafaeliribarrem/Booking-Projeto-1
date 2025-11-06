import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookingSuccess } from "@/components/booking/BookingSuccess";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface Props {
  searchParams?: { bookingId?: string };
}

export default async function BookingSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const bookingId = params?.bookingId;

  if (!bookingId) {
    redirect("/schedule");
  }

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch booking details
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      classSession: {
        include: {
          classType: true,
          instructor: true,
        },
      },
    },
  });

  if (!booking || booking.userId !== session.user.id) {
    redirect("/account");
  }

  const bookingInfo = {
    id: booking.id,
    className: booking.classSession.classType.name,
    instructor: booking.classSession.instructor.name,
    date: new Date(booking.classSession.startsAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(booking.classSession.startsAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    location: booking.classSession.location || undefined,
  };

  return <BookingSuccess booking={bookingInfo} />;
}
