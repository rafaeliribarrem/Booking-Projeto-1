// Authentication and authorization middleware

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createUnauthorizedResponse,
  createForbiddenResponse,
} from "@/lib/utils/response";
import { ApiHandler } from "./errorHandler";

// User roles for authorization
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
}

// Extended request with user information
export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: UserRole;
  };
}

/**
 * Middleware to require authentication
 */
export function withAuth(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    // Get session
    const session = await auth();

    if (!session?.user?.id) {
      return createUnauthorizedResponse("Authentication required");
    }

    // Add user to request
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.user = {
      id: session.user.id,
      email: session.user.email || "",
      name: session.user.name || undefined,
      role: UserRole.USER, // Default role, would be fetched from database in real app
    };

    return handler(authenticatedReq, context);
  };
}

/**
 * Middleware to require specific roles
 */
export function withRole(roles: UserRole | UserRole[]) {
  return function (
    handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
  ): ApiHandler {
    return withAuth(
      async (
        req: AuthenticatedRequest,
        context?: any
      ): Promise<NextResponse> => {
        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        const userRole = req.user.role || UserRole.USER;

        if (!allowedRoles.includes(userRole)) {
          return createForbiddenResponse(
            `Access denied. Required role: ${allowedRoles.join(" or ")}`
          );
        }

        return handler(req, context);
      }
    );
  };
}

/**
 * Middleware for admin-only routes
 */
export function withAdmin(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
): ApiHandler {
  return withRole(UserRole.ADMIN)(handler);
}

/**
 * Middleware for instructor or admin routes
 */
export function withInstructorOrAdmin(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
): ApiHandler {
  return withRole([UserRole.INSTRUCTOR, UserRole.ADMIN])(handler);
}

/**
 * Optional authentication - adds user to request if authenticated, but doesn't require it
 */
export function withOptionalAuth(
  handler: (
    req: NextRequest & { user?: AuthenticatedRequest["user"] },
    context?: any
  ) => Promise<NextResponse>
): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    // Get session
    const session = await auth();

    // Add user to request if authenticated
    if (session?.user?.id) {
      (req as any).user = {
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.name || undefined,
        role: UserRole.USER,
      };
    }

    return handler(req, context);
  };
}

/**
 * Resource ownership check - ensures user can only access their own resources
 */
export function withOwnership(
  getResourceUserId: (
    req: AuthenticatedRequest,
    context?: any
  ) => Promise<string | null>
) {
  return function (
    handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
  ): ApiHandler {
    return withAuth(
      async (
        req: AuthenticatedRequest,
        context?: any
      ): Promise<NextResponse> => {
        // Skip ownership check for admins
        if (req.user.role === UserRole.ADMIN) {
          return handler(req, context);
        }

        // Get resource owner ID
        const resourceUserId = await getResourceUserId(req, context);

        if (!resourceUserId) {
          return createForbiddenResponse("Resource not found or access denied");
        }

        if (resourceUserId !== req.user.id) {
          return createForbiddenResponse(
            "You can only access your own resources"
          );
        }

        return handler(req, context);
      }
    );
  };
}

/**
 * Rate limiting by user ID
 */
const userRateLimits = new Map<string, { count: number; resetTime: number }>();

export function withUserRateLimit(options: {
  windowMs: number;
  maxRequests: number;
}) {
  return function (
    handler: (req: AuthenticatedRequest, context?: any) => Promise<NextResponse>
  ): ApiHandler {
    return withAuth(
      async (
        req: AuthenticatedRequest,
        context?: any
      ): Promise<NextResponse> => {
        const userId = req.user.id;
        const now = Date.now();

        // Clean up old entries
        for (const [key, value] of userRateLimits.entries()) {
          if (value.resetTime < now) {
            userRateLimits.delete(key);
          }
        }

        const current = userRateLimits.get(userId);

        if (!current || current.resetTime < now) {
          // First request in window or window expired
          userRateLimits.set(userId, {
            count: 1,
            resetTime: now + options.windowMs,
          });
        } else {
          // Increment count
          current.count++;

          if (current.count > options.maxRequests) {
            const retryAfter = Math.ceil((current.resetTime - now) / 1000);

            return NextResponse.json(
              {
                error: {
                  code: "RATE_LIMIT_EXCEEDED",
                  message: "Too many requests for this user",
                  details: { retryAfter },
                  timestamp: new Date().toISOString(),
                },
              },
              {
                status: 429,
                headers: {
                  "Retry-After": retryAfter.toString(),
                  "X-RateLimit-Limit": options.maxRequests.toString(),
                  "X-RateLimit-Remaining": "0",
                  "X-RateLimit-Reset": current.resetTime.toString(),
                },
              }
            );
          }
        }

        const response = await handler(req, context);

        // Add rate limit headers
        const remaining = Math.max(
          0,
          options.maxRequests - (userRateLimits.get(userId)?.count || 0)
        );
        response.headers.set(
          "X-RateLimit-Limit",
          options.maxRequests.toString()
        );
        response.headers.set("X-RateLimit-Remaining", remaining.toString());
        response.headers.set(
          "X-RateLimit-Reset",
          (userRateLimits.get(userId)?.resetTime || now).toString()
        );

        return response;
      }
    );
  };
}

/**
 * API key authentication (for external integrations)
 */
export function withApiKey(
  handler: (req: NextRequest, context?: any) => Promise<NextResponse>
): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const apiKey =
      req.headers.get("x-api-key") ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!apiKey) {
      return createUnauthorizedResponse("API key required");
    }

    // In a real app, you'd validate the API key against a database
    // For student project, we'll use a simple check
    const validApiKeys = process.env.VALID_API_KEYS?.split(",") || [];

    if (!validApiKeys.includes(apiKey)) {
      return createUnauthorizedResponse("Invalid API key");
    }

    return handler(req, context);
  };
}

/**
 * CORS preflight handler
 */
export function handleCorsPreflightAuth(
  allowedOrigins: string[] = ["*"]
): NextResponse {
  const response = new NextResponse(null, { status: 200 });

  response.headers.set(
    "Access-Control-Allow-Origin",
    allowedOrigins.join(", ")
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-API-Key"
  );
  response.headers.set("Access-Control-Max-Age", "86400");

  return response;
}
