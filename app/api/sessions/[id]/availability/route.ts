// Session availability API route

import { NextRequest } from "next/server";
import { bookingService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createCachedResponse,
} from "@/lib/utils/response";

async function handleCheckAvailability(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Validate session ID
  const validation = validateData(schemas.IdParam, { id });
  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  // Check availability
  const availability = await bookingService.checkAvailability(id);

  // Cache for 30 seconds since availability changes frequently
  return createCachedResponse(
    availability,
    30,
    "Availability checked successfully"
  );
}

export const GET = withStandardMiddleware(handleCheckAvailability, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 100, // High limit for availability checks
  },
});
