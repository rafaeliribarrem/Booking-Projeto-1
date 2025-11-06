// Business logic types and domain-specific interfaces

// Business rules and constraints
export interface BusinessRules {
  booking: {
    maxAdvanceBookingDays: number;
    minCancellationHours: number;
    maxBookingsPerUser: number;
    allowWaitlist: boolean;
  };
  session: {
    minDurationMinutes: number;
    maxDurationMinutes: number;
    maxCapacity: number;
    minCapacity: number;
  };
  payment: {
    refundWindowHours: number;
    processingFeePercent: number;
    minimumAmountCents: number;
  };
}

// Booking availability calculation
export interface AvailabilityCalculation {
  sessionId: string;
  totalCapacity: number;
  confirmedBookings: number;
  pendingBookings: number;
  availableSpots: number;
  waitlistCount: number;
  isAvailable: boolean;
  canJoinWaitlist: boolean;
}

// Session scheduling constraints
export interface SchedulingConstraints {
  instructorId: string;
  timeSlot: {
    start: Date;
    end: Date;
  };
  conflicts: ClassSessionConflict[];
  isValid: boolean;
  suggestions?: TimeSlot[];
}

export interface ClassSessionConflict {
  sessionId: string;
  sessionName: string;
  conflictType: 'INSTRUCTOR_BUSY' | 'ROOM_OCCUPIED' | 'TIME_OVERLAP';
  timeSlot: {
    start: Date;
    end: Date;
  };
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  reason?: string;
}

// Booking workflow states
export enum BookingWorkflowState {
  INITIATED = 'INITIATED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW'
}

export interface BookingWorkflow {
  bookingId: string;
  currentState: BookingWorkflowState;
  previousState?: BookingWorkflowState;
  transitions: BookingTransition[];
  canTransitionTo: BookingWorkflowState[];
}

export interface BookingTransition {
  from: BookingWorkflowState;
  to: BookingWorkflowState;
  timestamp: Date;
  reason?: string;
  userId?: string;
}

// Payment processing
export interface PaymentProcessing {
  paymentId: string;
  amount: number;
  currency: string;
  status: PaymentProcessingStatus;
  method: PaymentMethod;
  metadata?: Record<string, any>;
}

export enum PaymentProcessingStatus {
  INITIATED = 'INITIATED',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  MOCK = 'MOCK',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PASS_CREDIT = 'PASS_CREDIT'
}

// Notification events
export interface NotificationEvent {
  type: NotificationEventType;
  userId: string;
  data: Record<string, any>;
  scheduledFor?: Date;
  priority: NotificationPriority;
}

export enum NotificationEventType {
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  SESSION_REMINDER = 'SESSION_REMINDER',
  SESSION_CANCELLED = 'SESSION_CANCELLED',
  WAITLIST_SPOT_AVAILABLE = 'WAITLIST_SPOT_AVAILABLE',
  PAYMENT_SUCCESSFUL = 'PAYMENT_SUCCESSFUL',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  REFUND_PROCESSED = 'REFUND_PROCESSED'
}

export enum NotificationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

// Analytics and reporting
export interface BookingAnalytics {
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    totalBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    noShows: number;
    revenue: number;
    averageBookingsPerSession: number;
    popularTimeSlots: TimeSlotPopularity[];
    instructorPerformance: InstructorMetrics[];
    classTypePopularity: ClassTypeMetrics[];
  };
}

export interface TimeSlotPopularity {
  hour: number;
  dayOfWeek: number;
  bookingCount: number;
  averageCapacityUtilization: number;
}

export interface InstructorMetrics {
  instructorId: string;
  instructorName: string;
  totalSessions: number;
  totalBookings: number;
  averageCapacityUtilization: number;
  cancellationRate: number;
  rating?: number;
}

export interface ClassTypeMetrics {
  classTypeId: string;
  classTypeName: string;
  totalSessions: number;
  totalBookings: number;
  averageCapacityUtilization: number;
  popularityRank: number;
}

// User behavior and preferences
export interface UserPreferences {
  userId: string;
  preferredInstructors: string[];
  preferredClassTypes: string[];
  preferredTimeSlots: {
    dayOfWeek: number;
    startHour: number;
    endHour: number;
  }[];
  notificationSettings: {
    email: boolean;
    sms: boolean;
    push: boolean;
    reminderHours: number;
  };
}

export interface UserBehavior {
  userId: string;
  bookingPatterns: {
    averageAdvanceBookingDays: number;
    preferredBookingTime: number; // hour of day
    cancellationRate: number;
    noShowRate: number;
  };
  classPreferences: {
    mostBookedClassType: string;
    favoriteInstructor: string;
    averageSessionsPerWeek: number;
  };
}

// Capacity management
export interface CapacityManagement {
  sessionId: string;
  baseCapacity: number;
  adjustedCapacity: number;
  adjustmentReason?: string;
  waitlistEnabled: boolean;
  maxWaitlistSize: number;
  currentWaitlistSize: number;
}

// Session lifecycle
export enum SessionLifecycleState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  BOOKING_OPEN = 'BOOKING_OPEN',
  BOOKING_CLOSED = 'BOOKING_CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface SessionLifecycle {
  sessionId: string;
  currentState: SessionLifecycleState;
  stateHistory: {
    state: SessionLifecycleState;
    timestamp: Date;
    reason?: string;
  }[];
  automaticTransitions: {
    bookingOpenTime?: Date;
    bookingCloseTime?: Date;
    sessionStartTime: Date;
    sessionEndTime: Date;
  };
}