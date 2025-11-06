// Core domain types and interfaces for the booking system

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  passwordHash?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instructor {
  id: string;
  name: string;
  bio?: string | null;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassType {
  id: string;
  name: string;
  description?: string | null;
  durationMinutes: number;
  defaultCapacity: number;
  difficulty?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassSession {
  id: string;
  classTypeId: string;
  instructorId: string;
  startsAt: Date;
  endsAt: Date;
  capacity: number;
  location?: string | null;
  createdAt: Date;
  updatedAt: Date;
  classType?: ClassType;
  instructor?: Instructor;
  bookings?: Booking[];
  availableSpots?: number;
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  WAITLIST = "WAITLIST",
}

export interface Booking {
  id: string;
  userId: string;
  classSessionId: string;
  status: BookingStatus;
  paymentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  classSession?: ClassSession;
  payment?: Payment;
}

export enum PassType {
  DROPIN = "DROPIN",
  PACK_5 = "PACK_5",
  UNLIMITED_MONTH = "UNLIMITED_MONTH",
}

export interface Pass {
  id: string;
  userId: string;
  type: PassType;
  creditsRemaining?: number | null;
  startsAt?: Date | null;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface Payment {
  id: string;
  userId: string;
  provider: string;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  stripeCheckoutId?: string | null;
  stripePaymentIntentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  bookings?: Booking[];
}

// Result types for better error handling
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Service-specific result types
export type SessionResult = Result<ClassSession, any>;
export type BookingResult = Result<Booking, any>;
export type PaymentResult = Result<Payment, any>;

// Availability information
export interface AvailabilityInfo {
  available: boolean;
  spotsRemaining: number;
  waitlistAvailable: boolean;
  sessionFull: boolean;
}

// Filter and query types
export interface SessionFilters {
  date?: string;
  instructorId?: string;
  classTypeId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface BookingFilters {
  userId?: string;
  status?: BookingStatus;
  sessionId?: string;
  startDate?: Date;
  endDate?: Date;
}

// Time range for scheduling
export interface TimeRange {
  start: Date;
  end: Date;
}

// Create/Update data types
export interface CreateBookingData {
  userId: string;
  classSessionId: string;
  paymentId?: string;
}

export interface UpdateBookingData {
  status?: BookingStatus;
  paymentId?: string;
}

export interface CreateSessionData {
  classTypeId: string;
  instructorId: string;
  startsAt: Date;
  endsAt: Date;
  capacity: number;
  location?: string;
}

export interface UpdateSessionData {
  classTypeId?: string;
  instructorId?: string;
  startsAt?: Date;
  endsAt?: Date;
  capacity?: number;
  location?: string;
}

export interface CreatePaymentData {
  userId: string;
  amountCents: number;
  currency?: string;
  provider?: string;
}

// Error types are defined in errors/index.ts

export enum BookingErrorCode {
  SESSION_FULL = "SESSION_FULL",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
  ALREADY_BOOKED = "ALREADY_BOOKED",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
  INVALID_TIME = "INVALID_TIME",
  BOOKING_NOT_FOUND = "BOOKING_NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export enum SessionErrorCode {
  INSTRUCTOR_CONFLICT = "INSTRUCTOR_CONFLICT",
  INVALID_TIME_RANGE = "INVALID_TIME_RANGE",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
  CAPACITY_EXCEEDED = "CAPACITY_EXCEEDED",
  CANNOT_DELETE_WITH_BOOKINGS = "CANNOT_DELETE_WITH_BOOKINGS",
}

export enum PaymentErrorCode {
  PAYMENT_FAILED = "PAYMENT_FAILED",
  INVALID_AMOUNT = "INVALID_AMOUNT",
  PAYMENT_NOT_FOUND = "PAYMENT_NOT_FOUND",
  REFUND_FAILED = "REFUND_FAILED",
}
