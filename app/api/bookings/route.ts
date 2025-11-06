// Booking API routes using the new service layer

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { bookingService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createErrorResponse,
  createUnauthorizedResponse,
  createValidationErrorResponse,
  extractPaginationParams,
  extractFilterParams,
} from "@/lib/utils/response";

async function handleCreateBooking(req: NextRequest) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Parse and validate request body
  const body = await req.json();
  const validation = validateData(schemas.CreateBooking, body);

  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  const { classSessionId } = validation.data!;

  // Create booking using service
  const result = await bookingService.createBooking(
    session.user.id,
    classSessionId
  );

  if (!result.success) {
    return createErrorResponse(
      result.error.code,
      result.error.message,
      result.error.statusCode
    );
  }

  return createSuccessResponse(
    result.data,
    "Booking created successfully",
    201
  );
}

async function handleGetBookings(req: NextRequest) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const { page, limit } = extractPaginationParams(searchParams);
  const filters = extractFilterParams(searchParams, [
    "status",
    "sessionId",
    "startDate",
    "endDate",
  ]);

  // Validate filters
  const filterValidation = validateData(schemas.BookingFilters, {
    ...filters,
    page,
    limit,
  });

  if (!filterValidation.success) {
    return createValidationErrorResponse(
      filterValidation.error!.flatten().fieldErrors
    );
  }

  // Convert date strings to Date objects
  const processedFilters: any = {};

  if (filterValidation.data!.userId) {
    processedFilters.userId = filterValidation.data!.userId;
  }
  if (filterValidation.data!.status) {
    processedFilters.status = filterValidation.data!.status;
  }
  if (filterValidation.data!.sessionId) {
    processedFilters.sessionId = filterValidation.data!.sessionId;
  }
  if (filterValidation.data!.startDate) {
    processedFilters.startDate = new Date(filterValidation.data!.startDate);
  }
  if (filterValidation.data!.endDate) {
    processedFilters.endDate = new Date(filterValidation.data!.endDate);
  }

  // Get user bookings
  const bookings = await bookingService.getUserBookings(
    session.user.id,
    processedFilters
  );

  return createSuccessResponse(bookings, "Bookings retrieved successfully");
}

// Main route handlers
export const POST = withStandardMiddleware(handleCreateBooking, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000, // 1 minute
    maxRequests: 10, // 10 bookings per minute max
  },
});

export const GET = withStandardMiddleware(handleGetBookings, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 30,
  },
});
