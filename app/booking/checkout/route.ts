import { prisma } from "@/lib/prisma";
import { createMockCheckoutSession } from "@/lib/mock-payment";

export async function POST(req: Request) {
  const { bookingId } = await req.json();
  if (!bookingId) return new Response("Missing bookingId", { status: 400 });

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { classSession: { include: { classType: true } }, user: true },
  });
  if (!booking) return new Response("Booking not found", { status: 404 });

  // Cria uma sessão de checkout simulada
  const session = createMockCheckoutSession({
    bookingId: booking.id,
    priceType: "DROPIN", // Sempre drop-in por enquanto
    userId: booking.userId,
    successUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/account?paid=1`,
    cancelUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/class/${booking.classSessionId}?canceled=1`,
  });

  return Response.json({ url: session.url });
}
