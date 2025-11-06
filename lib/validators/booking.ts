// Booking-specific validation schemas and utilities

import { z } from 'zod';
import { BookingStatus } from '../types';

// Enhanced booking validation with business rules
export const CreateBookingSchema = z.object({
  userId: z.string().cuid('Invalid user ID format'),
  classSessionId: z.string().cuid('Invalid session ID format'),
  paymentId: z.string().cuid('Invalid payment ID format').optional(),
}).refine(
  async (data) => {
    // Additional validation can be added here
    // For example, checking if the session exists and is bookable
    return true;
  },
  {
    message: "Booking validation failed",
  }
);

export const UpdateBookingSchema = z.object({
  status: z.nativeEnum(BookingStatus, {
    errorMap: () => ({ message: "Invalid booking status" })
  }).optional(),
  paymentId: z.string().cuid('Invalid payment ID format').optional(),
});

export const BookingQuerySchema = z.object({
  userId: z.string().cuid().optional(),
  sessionId: z.string().cuid().optional(),
  status: z.nativeEnum(BookingStatus).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  {
    message: "Start date must be before or equal to end date",
    path: ["endDate"],
  }
);

export const CancelBookingSchema = z.object({
  reason: z.string().min(1).max(500).optional(),
  refundRequested: z.boolean().default(false),
});

// Booking availability check schema
export const AvailabilityCheckSchema = z.object({
  sessionId: z.string().cuid('Invalid session ID format'),
  userId: z.string().cuid('Invalid user ID format').optional(),
});

// Bulk booking operations
export const BulkBookingSchema = z.object({
  bookings: z.array(CreateBookingSchema).min(1).max(10),
  paymentId: z.string().cuid().optional(),
});

// Waitlist management
export const JoinWaitlistSchema = z.object({
  userId: z.string().cuid('Invalid user ID format'),
  sessionId: z.string().cuid('Invalid session ID format'),
  priority: z.number().int().min(1).max(10).default(5),
});

// Booking transfer (for future use)
export const TransferBookingSchema = z.object({
  fromUserId: z.string().cuid('Invalid user ID format'),
  toUserId: z.string().cuid('Invalid user ID format'),
  bookingId: z.string().cuid('Invalid booking ID format'),
  reason: z.string().min(1).max(200).optional(),
});

// Booking validation utilities
export function validateBookingTime(sessionStart: Date, bookingTime: Date = new Date()): {
  isValid: boolean;
  reason?: string;
} {
  const now = new Date();
  const sessionStartTime = new Date(sessionStart);

  // Cannot book sessions in the past
  if (sessionStartTime <= now) {
    return {
      isValid: false,
      reason: 'Cannot book sessions that have already started or are in the past'
    };
  }

  // Cannot book more than 30 days in advance (business rule)
  const maxAdvanceDays = 30;
  const maxAdvanceTime = new Date(now.getTime() + (maxAdvanceDays * 24 * 60 * 60 * 1000));

  if (sessionStartTime > maxAdvanceTime) {
    return {
      isValid: false,
      reason: `Cannot book sessions more than ${maxAdvanceDays} days in advance`
    };
  }

  return { isValid: true };
}

export function validateCancellationTime(sessionStart: Date, cancellationTime: Date = new Date()): {
  isValid: boolean;
  reason?: string;
  refundEligible?: boolean;
} {
  const sessionStartTime = new Date(sessionStart);
  const now = new Date(cancellationTime);

  // Cannot cancel sessions that have already started
  if (sessionStartTime <= now) {
    return {
      isValid: false,
      reason: 'Cannot cancel sessions that have already started',
      refundEligible: false
    };
  }

  // Calculate hours until session
  const hoursUntilSession = (sessionStartTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  // Minimum cancellation time (business rule: 2 hours)
  const minCancellationHours = 2;

  if (hoursUntilSession < minCancellationHours) {
    return {
      isValid: false,
      reason: `Cancellations must be made at least ${minCancellationHours} hours before the session`,
      refundEligible: false
    };
  }

  // Refund eligibility (business rule: 24 hours for full refund)
  const refundEligible = hoursUntilSession >= 24;

  return {
    isValid: true,
    refundEligible
  };
}

// Booking capacity validation
export function validateBookingCapacity(
  currentBookings: number,
  maxCapacity: number,
  waitlistEnabled: boolean = true
): {
  canBook: boolean;
  canJoinWaitlist: boolean;
  spotsRemaining: number;
} {
  const spotsRemaining = Math.max(0, maxCapacity - currentBookings);
  const canBook = spotsRemaining > 0;
  const canJoinWaitlist = !canBook && waitlistEnabled;

  return {
    canBook,
    canJoinWaitlist,
    spotsRemaining
  };
}

// User booking limits validation
export function validateUserBookingLimits(
  userBookingsCount: number,
  maxBookingsPerUser: number = 10
): {
  canBook: boolean;
  reason?: string;
} {
  if (userBookingsCount >= maxBookingsPerUser) {
    return {
      canBook: false,
      reason: `Maximum of ${maxBookingsPerUser} active bookings allowed per user`
    };
  }

  return { canBook: true };
}