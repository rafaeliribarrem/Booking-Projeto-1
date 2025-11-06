// Utility functions for creating standardized API responses

import { NextResponse } from 'next/server';
import { ApiResponse, SuccessResponse, ErrorResponse, PaginatedResponse } from '../types/api';

/**
 * Create a successful API response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: statusCode });
}

/**
 * Create an error API response
 */
export function createErrorResponse(
  code: string,
  message: string,
  statusCode: number = 400,
  details?: Record<string, any>
): NextResponse {
  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: statusCode });
}

/**
 * Create a paginated API response
 */
export function createPaginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  },
  message?: string
): NextResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const response: PaginatedResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
  };

  return NextResponse.json(response);
}

/**
 * Create a "not found" response
 */
export function createNotFoundResponse(resource: string = 'Resource'): NextResponse {
  return createErrorResponse(
    'NOT_FOUND',
    `${resource} not found`,
    404
  );
}

/**
 * Create an "unauthorized" response
 */
export function createUnauthorizedResponse(message: string = 'Authentication required'): NextResponse {
  return createErrorResponse(
    'UNAUTHORIZED',
    message,
    401
  );
}

/**
 * Create a "forbidden" response
 */
export function createForbiddenResponse(message: string = 'Access forbidden'): NextResponse {
  return createErrorResponse(
    'FORBIDDEN',
    message,
    403
  );
}

/**
 * Create a "validation error" response
 */
export function createValidationErrorResponse(
  details: Record<string, string[]>
): NextResponse {
  return createErrorResponse(
    'VALIDATION_ERROR',
    'Invalid input data',
    400,
    details
  );
}

/**
 * Create a "conflict" response
 */
export function createConflictResponse(message: string, details?: Record<string, any>): NextResponse {
  return createErrorResponse(
    'CONFLICT',
    message,
    409,
    details
  );
}

/**
 * Create a "created" response
 */
export function createCreatedResponse<T>(data: T, message?: string): NextResponse {
  return createSuccessResponse(data, message, 201);
}

/**
 * Create a "no content" response
 */
export function createNoContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Create a "bad request" response
 */
export function createBadRequestResponse(message: string, details?: Record<string, any>): NextResponse {
  return createErrorResponse(
    'BAD_REQUEST',
    message,
    400,
    details
  );
}

/**
 * Create an "internal server error" response
 */
export function createInternalErrorResponse(message: string = 'Internal server error'): NextResponse {
  return createErrorResponse(
    'INTERNAL_ERROR',
    message,
    500
  );
}

/**
 * Extract pagination parameters from URL search params
 */
export function extractPaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  offset: number;
} {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Extract sorting parameters from URL search params
 */
export function extractSortParams(
  searchParams: URLSearchParams,
  allowedFields: string[] = []
): Record<string, 'asc' | 'desc'> | undefined {
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | null;

  if (!sortBy || (allowedFields.length > 0 && !allowedFields.includes(sortBy))) {
    return undefined;
  }

  return {
    [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc',
  };
}

/**
 * Extract filter parameters from URL search params
 */
export function extractFilterParams(
  searchParams: URLSearchParams,
  allowedFilters: string[] = []
): Record<string, string> {
  const filters: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    if (allowedFilters.length === 0 || allowedFilters.includes(key)) {
      if (key !== 'page' && key !== 'limit' && key !== 'sortBy' && key !== 'sortOrder') {
        filters[key] = value;
      }
    }
  }

  return filters;
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: Record<string, any>,
  requiredFields: string[]
): string[] {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (!(field in body) || body[field] === null || body[field] === undefined || body[field] === '') {
      missingFields.push(field);
    }
  }

  return missingFields;
}

/**
 * Create response with cache headers
 */
export function createCachedResponse<T>(
  data: T,
  maxAge: number = 300, // 5 minutes default
  message?: string
): NextResponse {
  const response = createSuccessResponse(data, message);

  response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
  response.headers.set('ETag', generateETag(data));

  return response;
}

/**
 * Generate ETag for response data
 */
function generateETag(data: any): string {
  const hash = require('crypto')
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');

  return `"${hash}"`;
}

/**
 * Check if request has matching ETag
 */
export function checkETag(request: Request, data: any): boolean {
  const ifNoneMatch = request.headers.get('if-none-match');
  if (!ifNoneMatch) return false;

  const etag = generateETag(data);
  return ifNoneMatch === etag;
}

/**
 * Create "not modified" response
 */
export function createNotModifiedResponse(): NextResponse {
  return new NextResponse(null, { status: 304 });
}