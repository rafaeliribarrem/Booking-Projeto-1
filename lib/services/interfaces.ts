// Service layer interfaces for dependency injection and testing

import {
  Booking,
  ClassSession,
  Payment,
  Result,
  AvailabilityInfo,
  SessionFilters,
  BookingFilters,
  CreateBookingData,
  UpdateBookingData,
  CreateSessionData,
  UpdateSessionData,
  CreatePaymentData,
  TimeRange,
} from "../types";
import { BookingError, SessionError, PaymentError } from "../errors";

// Booking Service Interface
export interface IBookingService {
  /**
   * Create a new booking for a user
   */
  createBooking(
    userId: string,
    sessionId: string
  ): Promise<Result<Booking, BookingError>>;

  /**
   * Cancel an existing booking
   */
  cancelBooking(bookingId: string, userId: string): Promise<void>;

  /**
   * Get all bookings for a specific user
   */
  getUserBookings(userId: string, filters?: BookingFilters): Promise<Booking[]>;

  /**
   * Check availability for a specific session
   */
  checkAvailability(sessionId: string): Promise<AvailabilityInfo>;

  /**
   * Get booking by ID
   */
  getBookingById(bookingId: string): Promise<Booking | null>;

  /**
   * Update booking status
   */
  updateBookingStatus(
    bookingId: string,
    status: string,
    userId: string
  ): Promise<Result<Booking, BookingError>>;
}

// Session Service Interface
export interface ISessionService {
  /**
   * Create a new class session
   */
  createSession(
    data: CreateSessionData
  ): Promise<Result<ClassSession, SessionError>>;

  /**
   * Update an existing session
   */
  updateSession(
    id: string,
    data: UpdateSessionData
  ): Promise<Result<ClassSession, SessionError>>;

  /**
   * Delete a session (only if no confirmed bookings)
   */
  deleteSession(id: string): Promise<void>;

  /**
   * Get sessions by various filters
   */
  getSessionsByFilters(filters: SessionFilters): Promise<ClassSession[]>;

  /**
   * Get session by ID with full details
   */
  getSessionById(id: string): Promise<ClassSession | null>;

  /**
   * Check for instructor scheduling conflicts
   */
  checkInstructorConflicts(
    instructorId: string,
    timeRange: TimeRange,
    excludeSessionId?: string
  ): Promise<ClassSession[]>;

  /**
   * Get upcoming sessions for an instructor
   */
  getInstructorSessions(
    instructorId: string,
    startDate?: Date
  ): Promise<ClassSession[]>;
}

// Payment Service Interface (simplified for student project)
export interface IPaymentService {
  /**
   * Create a payment record (mock implementation)
   */
  createPayment(
    data: CreatePaymentData
  ): Promise<Result<Payment, PaymentError>>;

  /**
   * Confirm a payment (mock implementation)
   */
  confirmPayment(paymentId: string): Promise<Result<Payment, PaymentError>>;

  /**
   * Process refund (mock implementation)
   */
  refundPayment(
    paymentId: string,
    reason?: string
  ): Promise<Result<Payment, PaymentError>>;

  /**
   * Get payment by ID
   */
  getPaymentById(paymentId: string): Promise<Payment | null>;

  /**
   * Get user's payment history
   */
  getUserPayments(userId: string): Promise<Payment[]>;
}

// User Service Interface
export interface IUserService {
  /**
   * Get user by ID
   */
  getUserById(id: string): Promise<any>;

  /**
   * Update user profile
   */
  updateUser(id: string, data: any): Promise<any>;

  /**
   * Get user's active passes
   */
  getUserPasses(userId: string): Promise<any[]>;
}

// Notification Service Interface (for future implementation)
export interface INotificationService {
  /**
   * Send booking confirmation email
   */
  sendBookingConfirmation(userId: string, booking: Booking): Promise<void>;

  /**
   * Send booking cancellation email
   */
  sendBookingCancellation(userId: string, booking: Booking): Promise<void>;

  /**
   * Send session reminder
   */
  sendSessionReminder(userId: string, session: ClassSession): Promise<void>;
}
