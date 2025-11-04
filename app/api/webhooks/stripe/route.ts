import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });
  const body = await req.text();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret)
    return new Response("Missing webhook secret", { status: 500 });

  try {
    const stripe = await getStripe();
    // @ts-expect-error - constructEvent exists at runtime
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
    if (event.type === "checkout.session.completed") {
      const session: any = event.data.object;
      const bookingId = session?.metadata?.bookingId as string | undefined;
      if (bookingId) {
        await prisma.$transaction(async (tx) => {
          const booking = await tx.booking.update({
            where: { id: bookingId },
            data: { status: "CONFIRMED" },
          });
          await tx.payment.create({
            data: {
              userId: booking.userId,
              amountCents: (session.amount_total as number) ?? 0,
              currency: (session.currency as string) ?? "usd",
              status: "SUCCEEDED",
              stripeCheckoutId: session.id,
              stripePaymentIntentId: session.payment_intent as
                | string
                | undefined,
            },
          });
        });
      }
    }
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Invalid signature", { status: 400 });
  }
}
