// SessionService implementation with business logic

import { ISessionService } from "./interfaces";
import { SessionRepository } from "../repositories/SessionRepository";
import { BookingRepository } from "../repositories/BookingRepository";
import {
  ClassSession,
  SessionResult,
  SessionFilters,
  CreateSessionData,
  UpdateSessionData,
  TimeRange,
} from "../types";
import { SessionError, createSessionErrors, withErrorHandler } from "../errors";
import {
  validateSessionTiming,
  validateInstructorAvailability,
  validateSessionCapacity,
  validateBusinessHours,
} from "../validators/session";

export class SessionService implements ISessionService {
  constructor(
    private sessionRepository: SessionRepository,
    private bookingRepository: BookingRepository
  ) {}

  /**
   * Create a new class session
   */
  async createSession(data: CreateSessionData): Promise<SessionResult> {
    try {
      // 1. Validate session timing
      const timingValidation = validateSessionTiming(
        data.startsAt,
        data.endsAt
      );
      if (!timingValidation.isValid) {
        throw createSessionErrors.invalidTimeRange(data.startsAt, data.endsAt);
      }

      // 2. Validate business hours
      const businessHoursValidation = validateBusinessHours(
        data.startsAt,
        data.endsAt
      );
      if (!businessHoursValidation.isValid) {
        throw new SessionError(
          businessHoursValidation.reason!,
          "OUTSIDE_BUSINESS_HOURS" as any,
          400
        );
      }

      // 3. Check instructor availability
      const timeRange: TimeRange = {
        start: data.startsAt,
        end: data.endsAt,
      };

      const existingSessions = await this.sessionRepository.findByInstructor(
        data.instructorId
      );
      const availabilityCheck = validateInstructorAvailability(
        data.instructorId,
        data.startsAt,
        data.endsAt,
        existingSessions.map((session) => ({
          startTime: session.startsAt,
          endTime: session.endsAt,
          instructorId: session.instructorId,
        }))
      );

      if (!availabilityCheck.isAvailable) {
        throw createSessionErrors.instructorConflict(
          data.instructorId,
          timeRange
        );
      }

      // 4. Create the session
      const session = await this.sessionRepository.create(data);

      return {
        success: true,
        data: session,
      };
    } catch (error) {
      if (error instanceof SessionError) {
        return {
          success: false,
          error: error,
        };
      }

      // Handle unexpected errors
      return {
        success: false,
        error: new SessionError(
          "An unexpected error occurred while creating the session",
          "UNKNOWN_ERROR" as any,
          500
        ),
      };
    }
  }

  /**
   * Update an existing session
   */
  async updateSession(
    id: string,
    data: UpdateSessionData
  ): Promise<SessionResult> {
    try {
      // 1. Get existing session
      const existingSession = await this.sessionRepository.findById(id);
      if (!existingSession) {
        throw createSessionErrors.sessionNotFound(id);
      }

      // 2. Check if session is in the past
      if (existingSession.startsAt <= new Date()) {
        throw createSessionErrors.pastSession(id);
      }

      // 3. Validate timing if being updated
      if (data.startsAt || data.endsAt) {
        const newStartTime = data.startsAt || existingSession.startsAt;
        const newEndTime = data.endsAt || existingSession.endsAt;

        const timingValidation = validateSessionTiming(
          newStartTime,
          newEndTime
        );
        if (!timingValidation.isValid) {
          throw createSessionErrors.invalidTimeRange(newStartTime, newEndTime);
        }

        // Validate business hours
        const businessHoursValidation = validateBusinessHours(
          newStartTime,
          newEndTime
        );
        if (!businessHoursValidation.isValid) {
          throw new SessionError(
            businessHoursValidation.reason!,
            "OUTSIDE_BUSINESS_HOURS" as any,
            400
          );
        }
      }

      // 4. Check instructor availability if instructor or time is being changed
      if (data.instructorId || data.startsAt || data.endsAt) {
        const newInstructorId =
          data.instructorId || existingSession.instructorId;
        const newStartTime = data.startsAt || existingSession.startsAt;
        const newEndTime = data.endsAt || existingSession.endsAt;

        const existingSessions = await this.sessionRepository.findByInstructor(
          newInstructorId
        );
        const availabilityCheck = validateInstructorAvailability(
          newInstructorId,
          newStartTime,
          newEndTime,
          existingSessions.map((session) => ({
            startTime: session.startsAt,
            endTime: session.endsAt,
            instructorId: session.instructorId,
          })),
          id // exclude current session
        );

        if (!availabilityCheck.isAvailable) {
          throw createSessionErrors.instructorConflict(newInstructorId, {
            start: newStartTime,
            end: newEndTime,
          });
        }
      }

      // 5. Validate capacity if being reduced
      if (data.capacity !== undefined) {
        const bookingStats =
          await this.bookingRepository.getSessionBookingStats(id);
        const capacityValidation = validateSessionCapacity(
          data.capacity,
          bookingStats.confirmed
        );
        if (!capacityValidation.isValid) {
          throw new SessionError(
            capacityValidation.reason!,
            "CAPACITY_BELOW_BOOKINGS" as any,
            400
          );
        }
      }

      // 6. Update the session
      const updatedSession = await this.sessionRepository.update(id, data);

      return {
        success: true,
        data: updatedSession,
      };
    } catch (error) {
      if (error instanceof SessionError) {
        return {
          success: false,
          error: error,
        };
      }

      // Handle unexpected errors
      return {
        success: false,
        error: new SessionError(
          "An unexpected error occurred while updating the session",
          "UNKNOWN_ERROR" as any,
          500
        ),
      };
    }
  }

  /**
   * Delete a session (only if no confirmed bookings)
   */
  async deleteSession(id: string): Promise<void> {
    return withErrorHandler(async () => {
      // 1. Get session details
      const session = await this.sessionRepository.findById(id);
      if (!session) {
        throw createSessionErrors.sessionNotFound(id);
      }

      // 2. Check for existing bookings
      const bookingStats = await this.bookingRepository.getSessionBookingStats(
        id
      );
      if (bookingStats.confirmed > 0 || bookingStats.pending > 0) {
        throw createSessionErrors.cannotDeleteWithBookings(
          id,
          bookingStats.confirmed + bookingStats.pending
        );
      }

      // 3. Cancel any waitlisted bookings first
      if (bookingStats.waitlist > 0) {
        await this.cancelAllSessionBookings(
          id,
          "Session cancelled by administrator"
        );
      }

      // 4. Delete the session
      await this.sessionRepository.delete(id);
    })();
  }

  /**
   * Get sessions by various filters
   */
  async getSessionsByFilters(filters: SessionFilters): Promise<ClassSession[]> {
    return withErrorHandler(async () => {
      return await this.sessionRepository.findByFilters(filters);
    })();
  }

  /**
   * Get session by ID with full details
   */
  async getSessionById(id: string): Promise<ClassSession | null> {
    return withErrorHandler(async () => {
      return await this.sessionRepository.findById(id);
    })();
  }

  /**
   * Check for instructor scheduling conflicts
   */
  async checkInstructorConflicts(
    instructorId: string,
    timeRange: TimeRange,
    excludeSessionId?: string
  ): Promise<ClassSession[]> {
    return withErrorHandler(async () => {
      return await this.sessionRepository.findConflicting(
        timeRange,
        instructorId,
        excludeSessionId
      );
    })();
  }

  /**
   * Get upcoming sessions for an instructor
   */
  async getInstructorSessions(
    instructorId: string,
    startDate?: Date
  ): Promise<ClassSession[]> {
    return withErrorHandler(async () => {
      const fromDate = startDate || new Date();
      return await this.sessionRepository.findByInstructor(
        instructorId,
        fromDate
      );
    })();
  }

  /**
   * Get session statistics and analytics
   */
  async getSessionAnalytics(sessionId: string): Promise<{
    session: ClassSession;
    bookingStats: {
      totalBookings: number;
      confirmedBookings: number;
      availableSpots: number;
      waitlistCount: number;
    };
    utilizationRate: number;
    revenue: number;
  }> {
    return withErrorHandler(async () => {
      const [session, bookingStats] = await Promise.all([
        this.sessionRepository.findById(sessionId),
        this.bookingRepository.getSessionBookingStats(sessionId),
      ]);

      if (!session) {
        throw createSessionErrors.sessionNotFound(sessionId);
      }

      const utilizationRate =
        (bookingStats.confirmedBookings / session.capacity) * 100;

      // Mock revenue calculation (would integrate with payment service in real implementation)
      const revenue = bookingStats.confirmedBookings * 25; // $25 per booking

      return {
        session,
        bookingStats,
        utilizationRate: Math.round(utilizationRate * 100) / 100,
        revenue,
      };
    })();
  }

  /**
   * Get available sessions (with spots remaining)
   */
  async getAvailableSessions(limit: number = 50): Promise<ClassSession[]> {
    return withErrorHandler(async () => {
      return await this.sessionRepository.findAvailableSessions(limit);
    })();
  }

  /**
   * Get instructor schedule for a date range
   */
  async getInstructorSchedule(
    instructorId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ClassSession[]> {
    return withErrorHandler(async () => {
      return await this.sessionRepository.findInstructorSchedule(
        instructorId,
        startDate,
        endDate
      );
    })();
  }

  /**
   * Duplicate a session to a new time slot
   */
  async duplicateSession(
    sessionId: string,
    newStartTime: Date,
    adjustEndTime: boolean = true
  ): Promise<SessionResult> {
    return withErrorHandler(async () => {
      // 1. Get original session
      const originalSession = await this.sessionRepository.findById(sessionId);
      if (!originalSession) {
        throw createSessionErrors.sessionNotFound(sessionId);
      }

      // 2. Calculate new end time
      let newEndTime: Date;
      if (adjustEndTime) {
        const duration =
          originalSession.endsAt.getTime() - originalSession.startsAt.getTime();
        newEndTime = new Date(newStartTime.getTime() + duration);
      } else {
        newEndTime = originalSession.endsAt;
      }

      // 3. Create new session data
      const newSessionData: CreateSessionData = {
        classTypeId: originalSession.classTypeId,
        instructorId: originalSession.instructorId,
        startsAt: newStartTime,
        endsAt: newEndTime,
        capacity: originalSession.capacity,
        location: originalSession.location,
      };

      // 4. Create the duplicated session
      return await this.createSession(newSessionData);
    })();
  }

  /**
   * Bulk create recurring sessions
   */
  async createRecurringSessions(
    baseSessionData: CreateSessionData,
    recurrencePattern: {
      daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
      startDate: Date;
      endDate: Date;
      skipHolidays?: boolean;
    }
  ): Promise<{
    created: ClassSession[];
    errors: string[];
  }> {
    return withErrorHandler(async () => {
      const created: ClassSession[] = [];
      const errors: string[] = [];

      const currentDate = new Date(recurrencePattern.startDate);
      const endDate = new Date(recurrencePattern.endDate);

      while (currentDate <= endDate) {
        // Check if current day is in the recurrence pattern
        if (recurrencePattern.daysOfWeek.includes(currentDate.getDay())) {
          try {
            // Calculate session times for this date
            const sessionStart = new Date(currentDate);
            sessionStart.setHours(baseSessionData.startsAt.getHours());
            sessionStart.setMinutes(baseSessionData.startsAt.getMinutes());

            const sessionEnd = new Date(currentDate);
            sessionEnd.setHours(baseSessionData.endsAt.getHours());
            sessionEnd.setMinutes(baseSessionData.endsAt.getMinutes());

            const sessionData: CreateSessionData = {
              ...baseSessionData,
              startsAt: sessionStart,
              endsAt: sessionEnd,
            };

            const result = await this.createSession(sessionData);
            if (result.success) {
              created.push(result.data);
            }
          } catch (error) {
            errors.push(
              `Failed to create session for ${currentDate.toDateString()}: ${error}`
            );
          }
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return { created, errors };
    })();
  }

  /**
   * Cancel all bookings for a session
   */
  private async cancelAllSessionBookings(
    sessionId: string,
    reason: string
  ): Promise<void> {
    try {
      const bookings = await this.bookingRepository.findBySessionId(sessionId);
      const activeBookings = bookings.filter(
        (booking) => booking.status !== "CANCELLED"
      );

      for (const booking of activeBookings) {
        await this.bookingRepository.update(booking.id, {
          status: "CANCELLED" as any,
        });
      }
    } catch (error) {
      console.error("Error cancelling session bookings:", error);
      // Don't throw as this is a cleanup operation
    }
  }

  /**
   * Get session capacity utilization report
   */
  async getCapacityUtilizationReport(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalSessions: number;
    averageUtilization: number;
    highUtilizationSessions: number;
    lowUtilizationSessions: number;
    sessions: Array<{
      sessionId: string;
      sessionName: string;
      capacity: number;
      bookings: number;
      utilization: number;
    }>;
  }> {
    return withErrorHandler(async () => {
      const sessions = await this.sessionRepository.findByDateRange(
        startDate,
        endDate
      );

      const sessionReports = await Promise.all(
        sessions.map(async (session) => {
          const stats = await this.bookingRepository.getSessionBookingStats(
            session.id
          );
          const utilization = (stats.confirmed / session.capacity) * 100;

          return {
            sessionId: session.id,
            sessionName: session.classType?.name || "Unknown Class",
            capacity: session.capacity,
            bookings: stats.confirmed,
            utilization: Math.round(utilization * 100) / 100,
          };
        })
      );

      const totalSessions = sessionReports.length;
      const averageUtilization =
        totalSessions > 0
          ? sessionReports.reduce(
              (sum, report) => sum + report.utilization,
              0
            ) / totalSessions
          : 0;

      const highUtilizationSessions = sessionReports.filter(
        (report) => report.utilization >= 80
      ).length;
      const lowUtilizationSessions = sessionReports.filter(
        (report) => report.utilization < 50
      ).length;

      return {
        totalSessions,
        averageUtilization: Math.round(averageUtilization * 100) / 100,
        highUtilizationSessions,
        lowUtilizationSessions,
        sessions: sessionReports,
      };
    })();
  }
}
