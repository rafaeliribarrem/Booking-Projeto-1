// Repository layer interfaces for data access abstraction

import {
  Booking,
  ClassSession,
  Payment,
  User,
  Instructor,
  ClassType,
  SessionFilters,
  BookingFilters,
  CreateBookingData,
  UpdateBookingData,
  CreateSessionData,
  UpdateSessionData,
  CreatePaymentData,
  TimeRange
} from '../types';

// Base Repository Interface
export interface IBaseRepository<T, CreateData, UpdateData> {
  create(data: CreateData): Promise<T>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: UpdateData): Promise<T>;
  delete(id: string): Promise<void>;
}

// Booking Repository Interface
export interface IBookingRepository extends IBaseRepository<Booking, CreateBookingData, UpdateBookingData> {
  /**
   * Find bookings by user ID
   */
  findByUserId(userId: string, filters?: BookingFilters): Promise<Booking[]>;

  /**
   * Find bookings by session ID
   */
  findBySessionId(sessionId: string): Promise<Booking[]>;

  /**
   * Check if user already has a booking for this session
   */
  findExistingBooking(userId: string, sessionId: string): Promise<Booking | null>;

  /**
   * Count confirmed bookings for a session
   */
  countConfirmedBookings(sessionId: string): Promise<number>;

  /**
   * Find bookings by status
   */
  findByStatus(status: string): Promise<Booking[]>;

  /**
   * Find bookings in date range
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<Booking[]>;
}

// Session Repository Interface
export interface ISessionRepository extends IBaseRepository<ClassSession, CreateSessionData, UpdateSessionData> {
  /**
   * Find sessions by various filters
   */
  findByFilters(filters: SessionFilters): Promise<ClassSession[]>;

  /**
   * Find sessions that conflict with given time range for an instructor
   */
  findConflicting(timeRange: TimeRange, instructorId: string, excludeSessionId?: string): Promise<ClassSession[]>;

  /**
   * Find upcoming sessions
   */
  findUpcoming(limit?: number): Promise<ClassSession[]>;

  /**
   * Find sessions by instructor
   */
  findByInstructor(instructorId: string, startDate?: Date): Promise<ClassSession[]>;

  /**
   * Find sessions by class type
   */
  findByClassType(classTypeId: string): Promise<ClassSession[]>;

  /**
   * Find sessions by date range
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<ClassSession[]>;

  /**
   * Count total sessions
   */
  count(filters?: SessionFilters): Promise<number>;
}

// Payment Repository Interface
export interface IPaymentRepository extends IBaseRepository<Payment, CreatePaymentData, Partial<Payment>> {
  /**
   * Find payments by user ID
   */
  findByUserId(userId: string): Promise<Payment[]>;

  /**
   * Find payments by status
   */
  findByStatus(status: string): Promise<Payment[]>;

  /**
   * Find payment by external ID (e.g., Stripe payment intent ID)
   */
  findByExternalId(externalId: string): Promise<Payment | null>;
}

// User Repository Interface
export interface IUserRepository extends IBaseRepository<User, Partial<User>, Partial<User>> {
  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find users by name (search)
   */
  findByName(name: string): Promise<User[]>;

  /**
   * Update user's last login
   */
  updateLastLogin(id: string): Promise<void>;
}

// Instructor Repository Interface
export interface IInstructorRepository extends IBaseRepository<Instructor, Partial<Instructor>, Partial<Instructor>> {
  /**
   * Find all instructors
   */
  findAll(): Promise<Instructor[]>;

  /**
   * Find instructors by name
   */
  findByName(name: string): Promise<Instructor[]>;

  /**
   * Check if instructor exists
   */
  exists(id: string): Promise<boolean>;
}

// ClassType Repository Interface
export interface IClassTypeRepository extends IBaseRepository<ClassType, Partial<ClassType>, Partial<ClassType>> {
  /**
   * Find all class types
   */
  findAll(): Promise<ClassType[]>;

  /**
   * Find class types by difficulty
   */
  findByDifficulty(difficulty: string): Promise<ClassType[]>;

  /**
   * Check if class type exists
   */
  exists(id: string): Promise<boolean>;
}