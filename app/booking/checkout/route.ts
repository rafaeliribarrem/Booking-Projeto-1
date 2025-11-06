// Refactored checkout route using new service layer

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { bookingService, paymentService } from "@/lib/services";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createErrorResponse,
  createUnauthorizedResponse,
  createNotFoundResponse,
  createBadRequestResponse,
} from "@/lib/utils/response";

async function handleCheckout(req: NextRequest) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Parse request body
  const body = await req.json();
  const { bookingId, promoCode } = body;

  if (!bookingId) {
    return createBadRequestResponse("Missing bookingId");
  }

  // Get booking details
  const booking = await bookingService.getBookingById(bookingId);
  if (!booking) {
    return createNotFoundResponse("Booking");
  }

  // Verify ownership
  if (booking.userId !== session.user.id) {
    return createErrorResponse("FORBIDDEN", "Access denied", 403);
  }

  // Calculate pricing
  const pricing = await paymentService.calculateBookingPrice(
    booking.classSession?.classTypeId || "",
    session.user.id,
    promoCode
  );

  // For student project, always use mock checkout
  const useMockCheckout = true; // Simplified for student project

  if (useMockCheckout) {
    // Create payment record
    const paymentResult = await paymentService.createPayment({
      userId: session.user.id,
      amountCents: pricing.finalPrice,
      currency: pricing.currency,
      provider: "MOCK",
    });

    if (!paymentResult.success) {
      return createErrorResponse(
        paymentResult.error.code,
        paymentResult.error.message,
        paymentResult.error.statusCode
      );
    }

    // Simulate payment processing
    const confirmResult = await paymentService.confirmPayment(
      paymentResult.data.id
    );

    if (!confirmResult.success) {
      return createErrorResponse(
        confirmResult.error.code,
        confirmResult.error.message,
        confirmResult.error.statusCode
      );
    }

    // Update booking with payment
    await bookingService.updateBookingStatus(
      bookingId,
      "CONFIRMED",
      session.user.id
    );

    // Return mock checkout URL
    const baseUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "";
    const mockCheckoutUrl = `${baseUrl}/booking/mock-checkout?bookingId=${booking.id}&paymentId=${paymentResult.data.id}`;

    return createSuccessResponse(
      {
        url: mockCheckoutUrl,
        payment: confirmResult.data,
        pricing,
      },
      "Checkout session created successfully"
    );
  }

  // This would be for real Stripe integration (not used in student project)
  return createErrorResponse(
    "NOT_IMPLEMENTED",
    "Real payment processing not implemented for student project",
    501
  );
}

export const POST = withStandardMiddleware(handleCheckout, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 20,
  },
});
