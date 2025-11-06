// Public sessions API route

import { NextRequest } from "next/server";
import { sessionService } from "@/lib/services";
import { schemas, validateData } from "@/lib/validators";
import { withStandardMiddleware } from "@/lib/middleware/errorHandler";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createPaginatedResponse,
  extractPaginationParams,
  extractFilterParams,
  extractSortParams,
} from "@/lib/utils/response";

async function handleGetSessions(req: NextRequest) {
  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const { page, limit } = extractPaginationParams(searchParams);
  const filters = extractFilterParams(searchParams, [
    "date",
    "instructorId",
    "classTypeId",
    "startDate",
    "endDate",
    "location",
    "availableOnly",
  ]);
  const sortParams = extractSortParams(searchParams, [
    "startsAt",
    "capacity",
    "createdAt",
  ]);

  // Validate query parameters
  const queryValidation = validateData(schemas.SessionFilters, {
    ...filters,
    page,
    limit,
    sortBy: sortParams ? Object.keys(sortParams)[0] : "startsAt",
    sortOrder: sortParams ? Object.values(sortParams)[0] : "asc",
  });

  if (!queryValidation.success) {
    return createValidationErrorResponse(
      queryValidation.error!.flatten().fieldErrors
    );
  }

  // Convert date strings to Date objects
  const processedFilters: any = {};

  if (queryValidation.data!.date) {
    processedFilters.date = queryValidation.data!.date;
  }
  if (queryValidation.data!.instructorId) {
    processedFilters.instructorId = queryValidation.data!.instructorId;
  }
  if (queryValidation.data!.classTypeId) {
    processedFilters.classTypeId = queryValidation.data!.classTypeId;
  }
  if (queryValidation.data!.startDate) {
    processedFilters.startDate = new Date(queryValidation.data!.startDate);
  }
  if (queryValidation.data!.endDate) {
    processedFilters.endDate = new Date(queryValidation.data!.endDate);
  }
  if (queryValidation.data!.limit) {
    processedFilters.limit = queryValidation.data!.limit;
  }
  if (queryValidation.data!.offset) {
    processedFilters.offset = queryValidation.data!.offset;
  }

  // Get sessions using service
  const sessions = await sessionService.getSessionsByFilters(processedFilters);

  // For pagination, we need to get total count
  // In a real implementation, you'd modify the service to return both data and count
  // For now, we'll return the sessions without pagination metadata
  return createSuccessResponse(sessions, "Sessions retrieved successfully");
}

export const GET = withStandardMiddleware(handleGetSessions, {
  enableCors: true,
  enableRateLimit: true,
  rateLimitOptions: {
    windowMs: 60000,
    maxRequests: 100, // High limit for public session browsing
  },
});
