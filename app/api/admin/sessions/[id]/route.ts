// Admin individual session management routes

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { sessionService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createValidationErrorResponse,
  createNoContentResponse,
} from "@/lib/utils/response";

async function handleUpdateSession(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Check admin permissions
  if (session.user.role !== 'ADMIN') {
    return createForbiddenResponse("Admin access required");
  }

  // Validate session ID
  const idValidation = validateData(schemas.IdParam, { id: params.id });
  if (!idValidation.success) {
    return createValidationErrorResponse(
      idValidation.error!.flatten().fieldErrors
    );
  }

  // Parse and validate request body
  const body = await req.json();
  const validation = validateData(schemas.UpdateSession, body);

  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  const updateData: any = {};

  if (validation.data!.classTypeId) {
    updateData.classTypeId = validation.data!.classTypeId;
  }
  if (validation.data!.instructorId) {
    updateData.instructorId = validation.data!.instructorId;
  }
  if (validation.data!.startsAt) {
    updateData.startsAt = new Date(validation.data!.startsAt);
  }
  if (validation.data!.endsAt) {
    updateData.endsAt = new Date(validation.data!.endsAt);
  }
  if (validation.data!.capacity !== undefined) {
    updateData.capacity = validation.data!.capacity;
  }
  if (validation.data!.location !== undefined) {
    updateData.location = validation.data!.location;
  }

  // Update session using service
  const result = await sessionService.updateSession(params.id, updateData);

  if (!result.success) {
    return createErrorResponse(
      result.error.code,
      result.error.message,
      result.error.statusCode
    );
  }

  return createSuccessResponse(result.data, "Session updated successfully");
}

async function handleDeleteSession(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Check admin permissions
  if (session.user.role !== 'ADMIN') {
    return createForbiddenResponse("Admin access required");
  }

  // Validate session ID
  const validation = validateData(schemas.IdParam, { id: params.id });
  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  // Delete session using service
  await sessionService.deleteSession(params.id);

  return createNoContentResponse();
}

// Route handlers
export const PUT = withStandardMiddleware(handleUpdateSession, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 20,
  },
});

export const DELETE = withStandardMiddleware(handleDeleteSession, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 10,
  },
});
