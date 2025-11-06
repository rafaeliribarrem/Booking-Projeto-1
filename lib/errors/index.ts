// Custom error classes and error handling utilities

import { NextResponse } from "next/server";
import { z } from "zod";

// Base API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR",
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Booking-specific errors
export class BookingError extends ApiError {
  constructor(
    message: string,
    public bookingCode: BookingErrorCode,
    statusCode: number = 400,
    details?: Record<string, any>
  ) {
    super(message, statusCode, bookingCode, details);
    this.name = "BookingError";
  }
}

export enum BookingErrorCode {
  SESSION_FULL = "SESSION_FULL",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
  ALREADY_BOOKED = "ALREADY_BOOKED",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  INVALID_TIME = "INVALID_TIME",
  BOOKING_NOT_FOUND = "BOOKING_NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  CANNOT_CANCEL = "CANNOT_CANCEL",
}

// Session-specific errors
export class SessionError extends ApiError {
  constructor(
    message: string,
    public sessionCode: SessionErrorCode,
    statusCode: number = 400,
    details?: Record<string, any>
  ) {
    super(message, statusCode, sessionCode, details);
    this.name = "SessionError";
  }
}

export enum SessionErrorCode {
  INSTRUCTOR_CONFLICT = "INSTRUCTOR_CONFLICT",
  INVALID_TIME_RANGE = "INVALID_TIME_RANGE",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
  CAPACITY_EXCEEDED = "CAPACITY_EXCEEDED",
  CANNOT_DELETE_WITH_BOOKINGS = "CANNOT_DELETE_WITH_BOOKINGS",
  PAST_SESSION = "PAST_SESSION",
}

// Payment-specific errors
export class PaymentError extends ApiError {
  constructor(
    message: string,
    public paymentCode: PaymentErrorCode,
    statusCode: number = 400,
    details?: Record<string, any>
  ) {
    super(message, statusCode, paymentCode, details);
    this.name = "PaymentError";
  }
}

export enum PaymentErrorCode {
  PAYMENT_FAILED = "PAYMENT_FAILED",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  PAYMENT_NOT_FOUND = "PAYMENT_NOT_FOUND",
  REFUND_FAILED = "REFUND_FAILED",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
}

// Authentication errors
export class AuthError extends ApiError {
  constructor(
    message: string,
    public authCode: AuthErrorCode,
    statusCode: number = 401,
    details?: Record<string, any>
  ) {
    super(message, statusCode, authCode, details);
    this.name = "AuthError";
  }
}

export enum AuthErrorCode {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_INVALID = "TOKEN_INVALID",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
}

// Validation error
export class ValidationError extends ApiError {
  constructor(
    message: string,
    public validationDetails: Record<string, string[]>,
    statusCode: number = 400
  ) {
    super(message, statusCode, "VALIDATION_ERROR", validationDetails);
    this.name = "ValidationError";
  }
}

// Database error
export class DatabaseError extends ApiError {
  constructor(
    message: string,
    public originalError?: Error,
    statusCode: number = 500
  ) {
    super(message, statusCode, "DATABASE_ERROR", {
      originalError: originalError?.message,
    });
    this.name = "DatabaseError";
  }
}

// Rate limiting error
export class RateLimitError extends ApiError {
  constructor(
    message: string = "Too many requests",
    public retryAfter?: number
  ) {
    super(message, 429, "RATE_LIMIT_EXCEEDED", { retryAfter });
    this.name = "RateLimitError";
  }
}

// Error response interface
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId?: string;
  };
}

// Error handler utility
export function handleApiError(
  error: unknown,
  requestId?: string
): NextResponse {
  console.error("API Error:", error);

  const timestamp = new Date().toISOString();

  // Handle known API errors
  if (error instanceof ApiError) {
    const response: ErrorResponse = {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp,
        requestId,
      },
    };

    return NextResponse.json(response, { status: error.statusCode });
  }

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    const details: Record<string, string[]> = {};
    error.issues.forEach((err) => {
      const path = err.path.join(".");
      if (!details[path]) {
        details[path] = [];
      }
      details[path].push(err.message);
    });

    const response: ErrorResponse = {
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input data",
        details,
        timestamp,
        requestId,
      },
    };

    return NextResponse.json(response, { status: 400 });
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as any;
    let message = "Database operation failed";
    let statusCode = 500;

    switch (prismaError.code) {
      case "P2002":
        message = "A record with this data already exists";
        statusCode = 409;
        break;
      case "P2025":
        message = "Record not found";
        statusCode = 404;
        break;
      case "P2003":
        message = "Foreign key constraint failed";
        statusCode = 400;
        break;
    }

    const response: ErrorResponse = {
      error: {
        code: "DATABASE_ERROR",
        message,
        details: { prismaCode: prismaError.code },
        timestamp,
        requestId,
      },
    };

    return NextResponse.json(response, { status: statusCode });
  }

  // Handle generic errors
  const response: ErrorResponse = {
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
      timestamp,
      requestId,
    },
  };

  return NextResponse.json(response, { status: 500 });
}

// Error factory functions for common scenarios
export const createBookingErrors = {
  sessionFull: (sessionId: string) =>
    new BookingError(
      "Session is fully booked",
      BookingErrorCode.SESSION_FULL,
      409,
      { sessionId }
    ),

  sessionNotFound: (sessionId: string) =>
    new BookingError(
      "Session not found",
      BookingErrorCode.SESSION_NOT_FOUND,
      404,
      { sessionId }
    ),

  alreadyBooked: (userId: string, sessionId: string) =>
    new BookingError(
      "User already has a booking for this session",
      BookingErrorCode.ALREADY_BOOKED,
      409,
      { userId, sessionId }
    ),

  bookingNotFound: (bookingId: string) =>
    new BookingError(
      "Booking not found",
      BookingErrorCode.BOOKING_NOT_FOUND,
      404,
      { bookingId }
    ),

  unauthorized: (userId: string, bookingId: string) =>
    new BookingError(
      "Not authorized to access this booking",
      BookingErrorCode.UNAUTHORIZED,
      403,
      { userId, bookingId }
    ),

  cannotCancel: (bookingId: string, reason: string) =>
    new BookingError(
      `Cannot cancel booking: ${reason}`,
      BookingErrorCode.CANNOT_CANCEL,
      400,
      { bookingId, reason }
    ),
};

export const createSessionErrors = {
  instructorConflict: (
    instructorId: string,
    timeRange: { start: Date; end: Date }
  ) =>
    new SessionError(
      "Instructor has a conflicting session",
      SessionErrorCode.INSTRUCTOR_CONFLICT,
      409,
      { instructorId, timeRange }
    ),

  invalidTimeRange: (start: Date, end: Date) =>
    new SessionError(
      "Invalid time range",
      SessionErrorCode.INVALID_TIME_RANGE,
      400,
      { start, end }
    ),

  sessionNotFound: (sessionId: string) =>
    new SessionError(
      "Session not found",
      SessionErrorCode.SESSION_NOT_FOUND,
      404,
      { sessionId }
    ),

  cannotDeleteWithBookings: (sessionId: string, bookingCount: number) =>
    new SessionError(
      "Cannot delete session with existing bookings",
      SessionErrorCode.CANNOT_DELETE_WITH_BOOKINGS,
      400,
      { sessionId, bookingCount }
    ),

  pastSession: (sessionId: string) =>
    new SessionError(
      "Cannot modify past session",
      SessionErrorCode.PAST_SESSION,
      400,
      { sessionId }
    ),
};

export const createAuthErrors = {
  invalidCredentials: () =>
    new AuthError(
      "Invalid email or password",
      AuthErrorCode.INVALID_CREDENTIALS,
      401
    ),

  unauthorized: () =>
    new AuthError("Authentication required", AuthErrorCode.UNAUTHORIZED, 401),

  forbidden: (resource?: string) =>
    new AuthError("Access forbidden", AuthErrorCode.FORBIDDEN, 403, {
      resource,
    }),

  userNotFound: (identifier: string) =>
    new AuthError("User not found", AuthErrorCode.USER_NOT_FOUND, 404, {
      identifier,
    }),

  emailExists: (email: string) =>
    new AuthError(
      "Email already registered",
      AuthErrorCode.EMAIL_ALREADY_EXISTS,
      409,
      { email }
    ),
};

// Middleware wrapper for error handling
export function withErrorHandler<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      // Re-throw API errors as-is
      if (error instanceof ApiError) {
        throw error;
      }

      // Wrap unknown errors
      console.error("Unexpected error in handler:", error);
      throw new ApiError(
        "An unexpected error occurred",
        500,
        "INTERNAL_ERROR",
        {
          originalError: error instanceof Error ? error.message : String(error),
        }
      );
    }
  };
}
