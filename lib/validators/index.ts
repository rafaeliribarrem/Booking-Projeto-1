// Validation schemas and utilities using Zod

import { z } from "zod";
import { BookingStatus, PassType, PaymentStatus } from "../types";

// Base validation utilities
export const cuidSchema = z.string().cuid();
export const emailSchema = z.string().email();
export const dateSchema = z.string().datetime().or(z.date());
export const positiveIntSchema = z.number().int().positive();
export const nonNegativeIntSchema = z.number().int().min(0);

// Booking validation schemas
export const CreateBookingSchema = z.object({
  userId: cuidSchema,
  classSessionId: cuidSchema,
  paymentId: cuidSchema.optional(),
});

export const UpdateBookingSchema = z.object({
  status: z.nativeEnum(BookingStatus).optional(),
  paymentId: cuidSchema.optional(),
});

export const BookingFiltersSchema = z.object({
  userId: cuidSchema.optional(),
  status: z.nativeEnum(BookingStatus).optional(),
  sessionId: cuidSchema.optional(),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
});

// Session validation schemas
export const CreateSessionSchema = z
  .object({
    classTypeId: z.string().min(1, "Class type ID is required"),
    instructorId: z.string().min(1, "Instructor ID is required"),
    startsAt: dateSchema,
    endsAt: dateSchema,
    capacity: positiveIntSchema.max(50),
    location: z.string().min(1).max(100).optional(),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End time must be after start time",
    path: ["endsAt"],
  });

export const UpdateSessionSchema = z
  .object({
    classTypeId: cuidSchema.optional(),
    instructorId: cuidSchema.optional(),
    startsAt: dateSchema.optional(),
    endsAt: dateSchema.optional(),
    capacity: positiveIntSchema.max(50).optional(),
    location: z.string().min(1).max(100).optional(),
  })
  .refine(
    (data) => {
      if (data.startsAt && data.endsAt) {
        return new Date(data.endsAt) > new Date(data.startsAt);
      }
      return true;
    },
    {
      message: "End time must be after start time",
      path: ["endsAt"],
    }
  );

export const SessionFiltersSchema = z.object({
  date: z.string().optional(),
  instructorId: cuidSchema.optional(),
  classTypeId: cuidSchema.optional(),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
  limit: positiveIntSchema.max(200).default(50).optional(),
  offset: nonNegativeIntSchema.default(0).optional(),
});

// Payment validation schemas (simplified for student project)
export const CreatePaymentSchema = z.object({
  userId: cuidSchema,
  amountCents: positiveIntSchema,
  currency: z.string().length(3).default("USD").optional(),
  provider: z.string().default("MOCK").optional(),
});

export const PaymentFiltersSchema = z.object({
  userId: cuidSchema.optional(),
  status: z.nativeEnum(PaymentStatus).optional(),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
});

// User validation schemas
export const UserRegistrationSchema = z.object({
  name: z.string().min(2).max(50),
  email: emailSchema,
  password: z.string().min(8).max(100),
});

export const UserLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: emailSchema.optional(),
  image: z.string().url().optional(),
});

// Instructor validation schemas
export const CreateInstructorSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  imageUrl: z.string().url().optional(),
});

export const UpdateInstructorSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  imageUrl: z.string().url().optional(),
});

// ClassType validation schemas
export const CreateClassTypeSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
  durationMinutes: positiveIntSchema.max(180).default(60),
  defaultCapacity: positiveIntSchema.max(50).default(12),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
});

export const UpdateClassTypeSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  description: z.string().max(500).optional(),
  durationMinutes: positiveIntSchema.max(180).optional(),
  defaultCapacity: positiveIntSchema.max(50).optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
});

// Query parameter validation
export const PaginationSchema = z.object({
  page: positiveIntSchema.default(1),
  limit: positiveIntSchema.max(100).default(20),
});

export const IdParamSchema = z.object({
  id: cuidSchema,
});

// Validation utility functions
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: z.ZodError;
};

export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

export function validateAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<ValidationResult<T>> {
  return Promise.resolve(validateData(schema, data));
}

// Format validation errors for API responses
export function formatValidationError(error: z.ZodError): {
  message: string;
  details: Record<string, string[]>;
} {
  const details: Record<string, string[]> = {};

  error.issues.forEach((err: z.ZodIssue) => {
    const path = err.path.join(".");
    if (!details[path]) {
      details[path] = [];
    }
    details[path].push(err.message);
  });

  return {
    message: "Validation failed",
    details,
  };
}

// Export all schemas for easy access
export const schemas = {
  // Booking schemas
  CreateBooking: CreateBookingSchema,
  UpdateBooking: UpdateBookingSchema,
  BookingFilters: BookingFiltersSchema,

  // Session schemas
  CreateSession: CreateSessionSchema,
  UpdateSession: UpdateSessionSchema,
  SessionFilters: SessionFiltersSchema,

  // Payment schemas
  CreatePayment: CreatePaymentSchema,
  PaymentFilters: PaymentFiltersSchema,

  // User schemas
  UserRegistration: UserRegistrationSchema,
  UserLogin: UserLoginSchema,
  UpdateUser: UpdateUserSchema,

  // Instructor schemas
  CreateInstructor: CreateInstructorSchema,
  UpdateInstructor: UpdateInstructorSchema,

  // ClassType schemas
  CreateClassType: CreateClassTypeSchema,
  UpdateClassType: UpdateClassTypeSchema,

  // Utility schemas
  Pagination: PaginationSchema,
  IdParam: IdParamSchema,
};
