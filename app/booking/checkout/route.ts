import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { bookingId } = await req.json();
  if (!bookingId) return new Response("Missing bookingId", { status: 400 });

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { classSession: { include: { classType: true } }, user: true },
  });
  if (!booking) return new Response("Booking not found", { status: 404 });

  const priceId = process.env.STRIPE_PRICE_DROPIN;
  if (!priceId)
    return new Response("Stripe price not configured", { status: 500 });

  const stripe = await getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/account?paid=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/class/${booking.classSessionId}?canceled=1`,
    metadata: { bookingId: booking.id },
    customer_email: booking.user?.email ?? undefined,
  });

  if (!session.url) {
    return new Response("Failed to create checkout session", { status: 500 });
  }

  return Response.json({ url: session.url });
}
