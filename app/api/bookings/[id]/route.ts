// Individual booking API routes

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { bookingService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createErrorResponse,
  createUnauthorizedResponse,
  createNotFoundResponse,
  createValidationErrorResponse,
  createNoContentResponse,
} from "@/lib/utils/response";

async function handleGetBooking(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Validate booking ID
  const validation = validateData(schemas.IdParam, { id });
  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  // Get booking
  const booking = await bookingService.getBookingById(id);
  if (!booking) {
    return createNotFoundResponse("Booking");
  }

  // Check ownership
  if (booking.userId !== session.user.id) {
    return createErrorResponse("FORBIDDEN", "Access denied", 403);
  }

  return createSuccessResponse(booking, "Booking retrieved successfully");
}

async function handleUpdateBooking(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Validate booking ID
  const idValidation = validateData(schemas.IdParam, { id });
  if (!idValidation.success) {
    return createValidationErrorResponse(
      idValidation.error!.flatten().fieldErrors
    );
  }

  // Parse and validate request body
  const body = await req.json();
  const validation = validateData(schemas.UpdateBooking, body);

  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  const { status } = validation.data!;

  // Update booking status
  const result = await bookingService.updateBookingStatus(
    id,
    status!,
    session.user.id
  );

  if (!result.success) {
    return createErrorResponse(
      result.error.code,
      result.error.message,
      result.error.statusCode
    );
  }

  return createSuccessResponse(result.data, "Booking updated successfully");
}

async function handleCancelBooking(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Validate booking ID
  const validation = validateData(schemas.IdParam, { id });
  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  // Cancel booking
  await bookingService.cancelBooking(id, session.user.id);

  return createNoContentResponse();
}

// Route handlers
export const GET = withStandardMiddleware(handleGetBooking, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 60,
  },
});

export const PATCH = withStandardMiddleware(handleUpdateBooking, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 20,
  },
});

export const DELETE = withStandardMiddleware(handleCancelBooking, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 10,
  },
});
