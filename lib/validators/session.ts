// Session-specific validation schemas and utilities

import { z } from 'zod';

// Enhanced session validation with business rules
export const CreateSessionSchema = z.object({
  classTypeId: z.string().cuid('Invalid class type ID format'),
  instructorId: z.string().cuid('Invalid instructor ID format'),
  startsAt: z.string().datetime('Invalid start date format'),
  endsAt: z.string().datetime('Invalid end date format'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1').max(50, 'Capacity cannot exceed 50'),
  location: z.string().min(1, 'Location is required').max(100, 'Location too long').optional(),
}).refine(
  (data) => {
    const start = new Date(data.startsAt);
    const end = new Date(data.endsAt);
    return end > start;
  },
  {
    message: "End time must be after start time",
    path: ["endsAt"],
  }
).refine(
  (data) => {
    const start = new Date(data.startsAt);
    const now = new Date();
    return start > now;
  },
  {
    message: "Session must be scheduled for a future time",
    path: ["startsAt"],
  }
).refine(
  (data) => {
    const start = new Date(data.startsAt);
    const end = new Date(data.endsAt);
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return durationMinutes >= 15 && durationMinutes <= 180;
  },
  {
    message: "Session duration must be between 15 minutes and 3 hours",
    path: ["endsAt"],
  }
);

export const UpdateSessionSchema = z.object({
  classTypeId: z.string().cuid('Invalid class type ID format').optional(),
  instructorId: z.string().cuid('Invalid instructor ID format').optional(),
  startsAt: z.string().datetime('Invalid start date format').optional(),
  endsAt: z.string().datetime('Invalid end date format').optional(),
  capacity: z.number().int().min(1).max(50).optional(),
  location: z.string().min(1).max(100).optional(),
}).refine(
  (data) => {
    if (data.startsAt && data.endsAt) {
      const start = new Date(data.startsAt);
      const end = new Date(data.endsAt);
      return end > start;
    }
    return true;
  },
  {
    message: "End time must be after start time",
    path: ["endsAt"],
  }
).refine(
  (data) => {
    if (data.startsAt && data.endsAt) {
      const start = new Date(data.startsAt);
      const end = new Date(data.endsAt);
      const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
      return durationMinutes >= 15 && durationMinutes <= 180;
    }
    return true;
  },
  {
    message: "Session duration must be between 15 minutes and 3 hours",
    path: ["endsAt"],
  }
);

export const SessionQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
  instructorId: z.string().cuid().optional(),
  classTypeId: z.string().cuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  minCapacity: z.coerce.number().int().min(1).optional(),
  maxCapacity: z.coerce.number().int().min(1).optional(),
  availableOnly: z.coerce.boolean().default(false),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  sortBy: z.enum(['startsAt', 'capacity', 'createdAt']).default('startsAt'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
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
).refine(
  (data) => {
    if (data.minCapacity && data.maxCapacity) {
      return data.minCapacity <= data.maxCapacity;
    }
    return true;
  },
  {
    message: "Minimum capacity must be less than or equal to maximum capacity",
    path: ["maxCapacity"],
  }
);

// Bulk session creation
export const BulkSessionSchema = z.object({
  sessions: z.array(CreateSessionSchema).min(1).max(20),
  skipConflicts: z.boolean().default(false),
});

// Session duplication
export const DuplicateSessionSchema = z.object({
  sessionId: z.string().cuid('Invalid session ID format'),
  newStartTime: z.string().datetime('Invalid start date format'),
  adjustEndTime: z.boolean().default(true),
  copyBookings: z.boolean().default(false),
});

// Recurring session creation
export const RecurringSessionSchema = z.object({
  classTypeId: z.string().cuid('Invalid class type ID format'),
  instructorId: z.string().cuid('Invalid instructor ID format'),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'),
  duration: z.number().int().min(15).max(180),
  capacity: z.number().int().min(1).max(50),
  location: z.string().min(1).max(100).optional(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  skipHolidays: z.boolean().default(true),
}).refine(
  (data) => {
    return new Date(data.startDate) <= new Date(data.endDate);
  },
  {
    message: "Start date must be before or equal to end date",
    path: ["endDate"],
  }
);

// Session validation utilities
export function validateSessionTiming(
  startTime: Date,
  endTime: Date,
  currentTime: Date = new Date()
): {
  isValid: boolean;
  reason?: string;
} {
  // Check if session is in the future
  if (startTime <= currentTime) {
    return {
      isValid: false,
      reason: 'Session must be scheduled for a future time'
    };
  }

  // Check if end time is after start time
  if (endTime <= startTime) {
    return {
      isValid: false,
      reason: 'End time must be after start time'
    };
  }

  // Check duration constraints
  const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  if (durationMinutes < 15) {
    return {
      isValid: false,
      reason: 'Session duration must be at least 15 minutes'
    };
  }

  if (durationMinutes > 180) {
    return {
      isValid: false,
      reason: 'Session duration cannot exceed 3 hours'
    };
  }

  // Check if session is scheduled too far in advance (business rule: 6 months)
  const maxAdvanceMonths = 6;
  const maxAdvanceTime = new Date(currentTime);
  maxAdvanceTime.setMonth(maxAdvanceTime.getMonth() + maxAdvanceMonths);

  if (startTime > maxAdvanceTime) {
    return {
      isValid: false,
      reason: `Sessions cannot be scheduled more than ${maxAdvanceMonths} months in advance`
    };
  }

  return { isValid: true };
}

export function validateInstructorAvailability(
  instructorId: string,
  startTime: Date,
  endTime: Date,
  existingSessions: Array<{ startTime: Date; endTime: Date; instructorId: string }>,
  excludeSessionId?: string
): {
  isAvailable: boolean;
  conflicts: Array<{ startTime: Date; endTime: Date }>;
} {
  const conflicts = existingSessions
    .filter(session =>
      session.instructorId === instructorId &&
      // Check for time overlap
      (
        (startTime >= session.startTime && startTime < session.endTime) ||
        (endTime > session.startTime && endTime <= session.endTime) ||
        (startTime <= session.startTime && endTime >= session.endTime)
      )
    )
    .map(session => ({
      startTime: session.startTime,
      endTime: session.endTime
    }));

  return {
    isAvailable: conflicts.length === 0,
    conflicts
  };
}

export function validateSessionCapacity(
  newCapacity: number,
  currentBookings: number
): {
  isValid: boolean;
  reason?: string;
} {
  if (newCapacity < currentBookings) {
    return {
      isValid: false,
      reason: `Cannot reduce capacity below current bookings (${currentBookings})`
    };
  }

  return { isValid: true };
}

// Business hours validation
export function validateBusinessHours(
  startTime: Date,
  endTime: Date,
  businessHours: { start: string; end: string } = { start: '06:00', end: '22:00' }
): {
  isValid: boolean;
  reason?: string;
} {
  const [startHour, startMinute] = businessHours.start.split(':').map(Number);
  const [endHour, endMinute] = businessHours.end.split(':').map(Number);

  const sessionStart = new Date(startTime);
  const sessionEnd = new Date(endTime);

  const businessStart = new Date(sessionStart);
  businessStart.setHours(startHour, startMinute, 0, 0);

  const businessEnd = new Date(sessionStart);
  businessEnd.setHours(endHour, endMinute, 0, 0);

  if (sessionStart < businessStart || sessionEnd > businessEnd) {
    return {
      isValid: false,
      reason: `Sessions must be scheduled between ${businessHours.start} and ${businessHours.end}`
    };
  }

  return { isValid: true };
}