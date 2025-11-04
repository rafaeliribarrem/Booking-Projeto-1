import { prisma } from "@/lib/prisma";
import { processMockPayment } from "@/lib/mock-payment";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { bookingId, sessionId, amount } = await req.json();

  if (!bookingId || !sessionId) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    // Simula o processamento do pagamento
    const result = await processMockPayment(sessionId);

    if (!result.success) {
      return new Response("Payment processing failed", { status: 400 });
    }

    // Atualiza o booking e cria o registro de pagamento
    await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      });

      await tx.payment.create({
        data: {
          userId: booking.userId,
          amountCents: amount,
          currency: "brl",
          status: "SUCCEEDED",
          provider: "MOCK",
          stripeCheckoutId: sessionId, // Reutilizando campo para armazenar sessionId mock
        },
      });

      // Atualiza a relação booking -> payment
      await tx.booking.update({
        where: { id: bookingId },
        data: {
          paymentId: (await tx.payment.findFirst({
            where: { userId: booking.userId },
            orderBy: { createdAt: "desc" },
          }))?.id,
        },
      });
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error processing mock payment:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
