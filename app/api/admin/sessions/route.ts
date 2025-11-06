// Admin session management routes using new service layer

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { sessionService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import { prisma } from "@/lib/prisma";
import {
  createSuccessResponse,
  createErrorResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createValidationErrorResponse,
} from "@/lib/utils/response";

async function handleCreateSession(req: NextRequest) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Check admin permissions
  if (session.user.role !== "ADMIN") {
    return createForbiddenResponse("Admin access required");
  }

  // Parse and validate request body
  const body = await req.json();
  const validation = validateData(schemas.CreateSession, body);

  if (!validation.success) {
    return createValidationErrorResponse(
      validation.error!.flatten().fieldErrors
    );
  }

  const sessionData = {
    ...validation.data!,
    startsAt: new Date(validation.data!.startsAt),
    endsAt: new Date(validation.data!.endsAt),
  };

  // Create session using service
  const result = await sessionService.createSession(sessionData);

  if (!result.success) {
    return createErrorResponse(
      result.error.code,
      result.error.message,
      result.error.statusCode
    );
  }

  return createSuccessResponse(
    result.data,
    "Session created successfully",
    201
  );
}

async function handleGetSessions(req: NextRequest) {
  // Get authenticated user
  const session = await auth();
  if (!session?.user?.id) {
    return createUnauthorizedResponse();
  }

  // Check admin permissions
  if (session.user.role !== "ADMIN") {
    return createForbiddenResponse("Admin access required");
  }

  try {
    // Fetch all sessions with related data
    const sessions = await prisma.classSession.findMany({
      include: {
        classType: true,
        instructor: true,
        bookings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        startsAt: "asc",
      },
    });

    return createSuccessResponse(sessions);
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    return createErrorResponse("FETCH_ERROR", "Failed to fetch sessions", 500);
  }
}

export const GET = withStandardMiddleware(handleGetSessions, {
  enableCors: true,
});

export const POST = withStandardMiddleware(handleCreateSession, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 30, // 30 session creations per minute max
  },
});
