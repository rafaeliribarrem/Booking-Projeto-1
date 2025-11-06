// Error handling middleware for API routes

import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '../errors';
import { randomUUID } from 'crypto';

// Request handler type
export type ApiHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

// Enhanced request with context
export interface EnhancedRequest extends NextRequest {
  requestId: string;
  startTime: number;
}

/**
 * Wraps API handlers with comprehensive error handling
 */
export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const requestId = randomUUID();
    const startTime = Date.now();

    // Add request context
    const enhancedReq = req as EnhancedRequest;
    enhancedReq.requestId = requestId;
    enhancedReq.startTime = startTime;

    try {
      console.log(`[${requestId}] ${req.method} ${req.url} - Started`);

      const response = await handler(enhancedReq, context);

      const duration = Date.now() - startTime;
      console.log(`[${requestId}] ${req.method} ${req.url} - Completed in ${duration}ms`);

      // Add request ID to response headers
      response.headers.set('X-Request-ID', requestId);

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[${requestId}] ${req.method} ${req.url} - Error after ${duration}ms:`, error);

      const errorResponse = handleApiError(error, requestId);
      errorResponse.headers.set('X-Request-ID', requestId);

      return errorResponse;
    }
  };
}

/**
 * Middleware for logging requests and responses
 */
export function withLogging(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const requestId = (req as EnhancedRequest).requestId || randomUUID();
    const startTime = Date.now();

    // Log request details
    console.log(`[${requestId}] Request:`, {
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries()),
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await handler(req, context);

      const duration = Date.now() - startTime;

      // Log response details
      console.log(`[${requestId}] Response:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      console.error(`[${requestId}] Error:`, {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  };
}

/**
 * Middleware for handling CORS
 */
export function withCors(handler: ApiHandler, options?: {
  origin?: string | string[];
  methods?: string[];
  headers?: string[];
}): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const origin = req.headers.get('origin');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });

      if (origin && isOriginAllowed(origin, options?.origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }

      response.headers.set('Access-Control-Allow-Methods', options?.methods?.join(', ') || 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', options?.headers?.join(', ') || 'Content-Type, Authorization');
      response.headers.set('Access-Control-Max-Age', '86400');

      return response;
    }

    const response = await handler(req, context);

    // Add CORS headers to actual response
    if (origin && isOriginAllowed(origin, options?.origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }

    return response;
  };
}

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string, allowedOrigins?: string | string[]): boolean {
  if (!allowedOrigins) return true;

  if (typeof allowedOrigins === 'string') {
    return allowedOrigins === '*' || allowedOrigins === origin;
  }

  return allowedOrigins.includes(origin) || allowedOrigins.includes('*');
}

/**
 * Middleware for rate limiting (simple in-memory implementation)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function withRateLimit(handler: ApiHandler, options: {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (req: NextRequest) => string;
}): ApiHandler {
  return async (req: NextRequest, context?: any): Promise<NextResponse> => {
    const key = options.keyGenerator ? options.keyGenerator(req) : getClientIP(req);
    const now = Date.now();
    const windowStart = now - options.windowMs;

    // Clean up old entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k);
      }
    }

    const current = rateLimitStore.get(key);

    if (!current || current.resetTime < now) {
      // First request in window or window expired
      rateLimitStore.set(key, {
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
              code: 'RATE_LIMIT_EXCEEDED',
              message: 'Too many requests',
              details: { retryAfter },
              timestamp: new Date().toISOString(),
            },
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': options.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': current.resetTime.toString(),
            },
          }
        );
      }
    }

    const response = await handler(req, context);

    // Add rate limit headers
    const remaining = Math.max(0, options.maxRequests - (rateLimitStore.get(key)?.count || 0));
    response.headers.set('X-RateLimit-Limit', options.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', (rateLimitStore.get(key)?.resetTime || now).toString());

    return response;
  };
}

/**
 * Get client IP address from request
 */
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

/**
 * Compose multiple middleware functions
 */
export function compose(...middlewares: ((handler: ApiHandler) => ApiHandler)[]): (handler: ApiHandler) => ApiHandler {
  return (handler: ApiHandler) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

/**
 * Standard middleware stack for API routes
 */
export function withStandardMiddleware(handler: ApiHandler, options?: {
  enableCors?: boolean;
  enableRateLimit?: boolean;
  enableLogging?: boolean;
  rateLimitOptions?: {
    windowMs: number;
    maxRequests: number;
  };
}): ApiHandler {
  const middlewares: ((handler: ApiHandler) => ApiHandler)[] = [];

  // Add error handling (always first)
  middlewares.push(withErrorHandler);

  // Add logging if enabled
  if (options?.enableLogging !== false) {
    middlewares.push(withLogging);
  }

  // Add CORS if enabled
  if (options?.enableCors) {
    middlewares.push((h) => withCors(h));
  }

  // Add rate limiting if enabled
  if (options?.enableRateLimit && options.rateLimitOptions) {
    middlewares.push((h) => withRateLimit(h, options.rateLimitOptions!));
  }

  return compose(...middlewares)(handler);
}