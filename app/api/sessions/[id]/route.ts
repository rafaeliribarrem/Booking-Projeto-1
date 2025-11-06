// Individual session API route

import { NextRequest } from "next/server";
import { sessionService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createNotFoundResponse,
  createValidationErrorResponse,
  createCachedResponse,
} from "@/lib/utils/response";

async function handleGetSession(
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

  // Get session details
  const session = await sessionService.getSessionById(id);
  if (!session) {
    return createNotFoundResponse("Session");
  }

  // Cache for 5 minutes since session details don't change frequently
  return createCachedResponse(session, 300, "Session retrieved successfully");
}

export const GET = withStandardMiddleware(handleGetSession, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 100,
  },
});
