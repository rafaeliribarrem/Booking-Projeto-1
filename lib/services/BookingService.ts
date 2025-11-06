// Simplified BookingService without withErrorHandler

import { IBookingService } from "./interfaces";
import { BookingRepository } from "../repositories/BookingRepository";
import { SessionRepository } from "../repositories/SessionRepository";
import {
  Booking,
  Result,
  AvailabilityInfo,
  BookingFilters,
  BookingStatus,
  CreateBookingData,
} from "../types";
import { BookingError, createBookingErrors } from "../errors";
import {
  validateBookingTime,
  validateCancellationTime,
  validateBookingCapacity,
  validateUserBookingLimits,
} from "../validators/booking";

export class BookingService implements IBookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private sessionRepository: SessionRepository
  ) {}

  async createBooking(
    userId: string,
    sessionId: string
  ): Promise<Result<Booking, BookingError>> {
    try {
      // 1. Validate session exists and get details
      const session = await this.sessionRepository.findById(sessionId);
      if (!session) {
        throw createBookingErrors.sessionNotFound(sessionId);
      }

      // 2. Validate booking timing
      const timingValidation = validateBookingTime(session.startsAt);
      if (!timingValidation.isValid) {
        throw new BookingError(
          timingValidation.reason!,
          "INVALID_TIME" as any,
          400
        );
      }

      // 3. Check if user already has a booking for this session
      const existingBooking = await this.bookingRepository.findExistingBooking(
        userId,
        sessionId
      );
      if (existingBooking) {
        throw createBookingErrors.alreadyBooked(userId, sessionId);
      }

      // 4. Check user booking limits
      const userBookings = await this.bookingRepository.findByUserId(userId, {
        status: BookingStatus.CONFIRMED,
      });
      const limitsValidation = validateUserBookingLimits(userBookings.length);
      if (!limitsValidation.canBook) {
        throw new BookingError(
          limitsValidation.reason!,
          "BOOKING_LIMIT_EXCEEDED" as any,
          400
        );
      }

      // 5. Check session availability
      const availability = await this.checkAvailability(sessionId);
      if (!availability.available && !availability.waitlistAvailable) {
        throw createBookingErrors.sessionFull(sessionId);
      }

      // 6. Create booking with appropriate status
      const bookingData: CreateBookingData = {
        userId,
        classSessionId: sessionId,
      };

      const booking = await this.bookingRepository.create(bookingData);

      // 7. Update booking status based on availability
      let finalBooking = booking;
      if (!availability.available && availability.waitlistAvailable) {
        finalBooking = await this.bookingRepository.update(booking.id, {
          status: BookingStatus.WAITLIST,
        });
      } else {
        finalBooking = await this.bookingRepository.update(booking.id, {
          status: BookingStatus.CONFIRMED,
        });
      }

      return {
        success: true,
        data: finalBooking,
      };
    } catch (error) {
      return {
        success: false,
        error: error as BookingError,
      };
    }
  }

  async cancelBooking(bookingId: string, userId: string): Promise<void> {
    // 1. Get booking details
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw createBookingErrors.bookingNotFound(bookingId);
    }

    // 2. Verify ownership
    if (booking.userId !== userId) {
      throw createBookingErrors.unauthorized(userId, bookingId);
    }

    // 3. Check if booking can be cancelled
    if (booking.status === BookingStatus.CANCELLED) {
      throw createBookingErrors.cannotCancel(
        bookingId,
        "Booking is already cancelled"
      );
    }

    // 4. Validate cancellation timing
    if (booking.classSession) {
      const cancellationValidation = validateCancellationTime(
        booking.classSession.startsAt
      );
      if (!cancellationValidation.isValid) {
        throw createBookingErrors.cannotCancel(
          bookingId,
          cancellationValidation.reason!
        );
      }
    }

    // 5. Cancel the booking
    await this.bookingRepository.update(bookingId, {
      status: BookingStatus.CANCELLED,
    });

    // 6. Process waitlist if applicable
    if (booking.status === BookingStatus.CONFIRMED && booking.classSession) {
      await this.processWaitlist(booking.classSession.id);
    }
  }

  async getUserBookings(
    userId: string,
    filters?: BookingFilters
  ): Promise<Booking[]> {
    return await this.bookingRepository.findByUserId(userId, filters);
  }

  async checkAvailability(sessionId: string): Promise<AvailabilityInfo> {
    // 1. Get session details
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw createBookingErrors.sessionNotFound(sessionId);
    }

    // 2. Get booking statistics
    const stats = await this.bookingRepository.getSessionBookingStats(
      sessionId
    );

    // 3. Calculate availability
    const capacityValidation = validateBookingCapacity(
      stats.confirmed,
      session.capacity,
      true // waitlist enabled
    );

    return {
      available: capacityValidation.canBook,
      spotsRemaining: capacityValidation.spotsRemaining,
      waitlistAvailable: capacityValidation.canJoinWaitlist,
      sessionFull:
        !capacityValidation.canBook && !capacityValidation.canJoinWaitlist,
    };
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    return await this.bookingRepository.findById(bookingId);
  }

  async updateBookingStatus(
    bookingId: string,
    status: string,
    userId: string
  ): Promise<Result<Booking, BookingError>> {
    try {
      // 1. Get booking details
      const booking = await this.bookingRepository.findById(bookingId);
      if (!booking) {
        throw createBookingErrors.bookingNotFound(bookingId);
      }

      // 2. Verify ownership (for non-admin users)
      if (booking.userId !== userId) {
        throw createBookingErrors.unauthorized(userId, bookingId);
      }

      // 3. Update booking
      const updatedBooking = await this.bookingRepository.update(bookingId, {
        status: status as BookingStatus,
      });

      return {
        success: true,
        data: updatedBooking,
      };
    } catch (error) {
      return {
        success: false,
        error: error as BookingError,
      };
    }
  }

  private async processWaitlist(sessionId: string): Promise<void> {
    try {
      // Get waitlisted bookings
      const waitlistBookings = await this.bookingRepository.findBySessionId(
        sessionId
      );
      const waitlistedBookings = waitlistBookings
        .filter((booking) => booking.status === BookingStatus.WAITLIST)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()); // FIFO

      if (waitlistedBookings.length === 0) {
        return;
      }

      // Check if there are available spots
      const availability = await this.checkAvailability(sessionId);
      if (!availability.available) {
        return;
      }

      // Promote first waitlisted booking
      const firstWaitlisted = waitlistedBookings[0];
      await this.bookingRepository.update(firstWaitlisted.id, {
        status: BookingStatus.CONFIRMED,
      });

      console.log(
        `Booking ${firstWaitlisted.id} promoted from waitlist to confirmed`
      );
    } catch (error) {
      console.error("Error processing waitlist:", error);
    }
  }
}
