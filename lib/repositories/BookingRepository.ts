// BookingRepository implementation using Prisma

import { prisma } from '../prisma';
import { IBookingRepository } from './interfaces';
import {
  Booking,
  CreateBookingData,
  UpdateBookingData,
  BookingFilters,
  BookingStatus
} from '../types';
import { DatabaseError } from '../errors';
import { Prisma } from '../generated/prisma/client';

export class BookingRepository implements IBookingRepository {
  /**
   * Create a new booking
   */
  async create(data: CreateBookingData): Promise<Booking> {
    try {
      const booking = await prisma.booking.create({
        data: {
          userId: data.userId,
          classSessionId: data.classSessionId,
          paymentId: data.paymentId,
          status: 'PENDING',
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
      });

      return this.mapPrismaToBooking(booking);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new DatabaseError('User already has a booking for this session');
        }
        if (error.code === 'P2003') {
          throw new DatabaseError('Invalid user ID, session ID, or payment ID');
        }
      }
      throw new DatabaseError('Failed to create booking', error as Error);
    }
  }

  /**
   * Find booking by ID
   */
  async findById(id: string): Promise<Booking | null> {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
      });

      return booking ? this.mapPrismaToBooking(booking) : null;
    } catch (error) {
      throw new DatabaseError('Failed to find booking', error as Error);
    }
  }

  /**
   * Update booking
   */
  async update(id: string, data: UpdateBookingData): Promise<Booking> {
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          status: data.status as any,
          paymentId: data.paymentId,
          updatedAt: new Date(),
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
      });

      return this.mapPrismaToBooking(booking);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new DatabaseError('Booking not found');
        }
      }
      throw new DatabaseError('Failed to update booking', error as Error);
    }
  }

  /**
   * Delete booking
   */
  async delete(id: string): Promise<void> {
    try {
      await prisma.booking.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new DatabaseError('Booking not found');
        }
      }
      throw new DatabaseError('Failed to delete booking', error as Error);
    }
  }

  /**
   * Find bookings by user ID
   */
  async findByUserId(userId: string, filters?: BookingFilters): Promise<Booking[]> {
    try {
      const where: Prisma.BookingWhereInput = {
        userId,
        ...(filters?.status && { status: filters.status as any }),
        ...(filters?.sessionId && { classSessionId: filters.sessionId }),
        ...(filters?.startDate && filters?.endDate && {
          classSession: {
            startsAt: {
              gte: new Date(filters.startDate),
              lte: new Date(filters.endDate),
            },
          },
        }),
      };

      const bookings = await prisma.booking.findMany({
        where,
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return bookings.map(this.mapPrismaToBooking);
    } catch (error) {
      throw new DatabaseError('Failed to find user bookings', error as Error);
    }
  }

  /**
   * Find bookings by session ID
   */
  async findBySessionId(sessionId: string): Promise<Booking[]> {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          classSessionId: sessionId,
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return bookings.map(this.mapPrismaToBooking);
    } catch (error) {
      throw new DatabaseError('Failed to find session bookings', error as Error);
    }
  }

  /**
   * Check if user already has a booking for this session
   */
  async findExistingBooking(userId: string, sessionId: string): Promise<Booking | null> {
    try {
      const booking = await prisma.booking.findUnique({
        where: {
          userId_classSessionId: {
            userId,
            classSessionId: sessionId,
          },
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
      });

      return booking ? this.mapPrismaToBooking(booking) : null;
    } catch (error) {
      throw new DatabaseError('Failed to check existing booking', error as Error);
    }
  }

  /**
   * Count confirmed bookings for a session
   */
  async countConfirmedBookings(sessionId: string): Promise<number> {
    try {
      return await prisma.booking.count({
        where: {
          classSessionId: sessionId,
          status: 'CONFIRMED',
        },
      });
    } catch (error) {
      throw new DatabaseError('Failed to count confirmed bookings', error as Error);
    }
  }

  /**
   * Find bookings by status
   */
  async findByStatus(status: string): Promise<Booking[]> {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          status: status as any,
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return bookings.map(this.mapPrismaToBooking);
    } catch (error) {
      throw new DatabaseError('Failed to find bookings by status', error as Error);
    }
  }

  /**
   * Find bookings in date range
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<Booking[]> {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          classSession: {
            startsAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
        orderBy: {
          classSession: {
            startsAt: 'asc',
          },
        },
      });

      return bookings.map(this.mapPrismaToBooking);
    } catch (error) {
      throw new DatabaseError('Failed to find bookings by date range', error as Error);
    }
  }

  /**
   * Get booking statistics for a user
   */
  async getUserBookingStats(userId: string): Promise<{
    total: number;
    confirmed: number;
    cancelled: number;
    pending: number;
  }> {
    try {
      const [total, confirmed, cancelled, pending] = await Promise.all([
        prisma.booking.count({ where: { userId } }),
        prisma.booking.count({ where: { userId, status: 'CONFIRMED' } }),
        prisma.booking.count({ where: { userId, status: 'CANCELLED' } }),
        prisma.booking.count({ where: { userId, status: 'PENDING' } }),
      ]);

      return { total, confirmed, cancelled, pending };
    } catch (error) {
      throw new DatabaseError('Failed to get user booking statistics', error as Error);
    }
  }

  /**
   * Get session booking statistics
   */
  async getSessionBookingStats(sessionId: string): Promise<{
    total: number;
    confirmed: number;
    cancelled: number;
    pending: number;
    waitlist: number;
  }> {
    try {
      const [total, confirmed, cancelled, pending, waitlist] = await Promise.all([
        prisma.booking.count({ where: { classSessionId: sessionId } }),
        prisma.booking.count({ where: { classSessionId: sessionId, status: 'CONFIRMED' } }),
        prisma.booking.count({ where: { classSessionId: sessionId, status: 'CANCELLED' } }),
        prisma.booking.count({ where: { classSessionId: sessionId, status: 'PENDING' } }),
        prisma.booking.count({ where: { classSessionId: sessionId, status: 'WAITLIST' } }),
      ]);

      return { total, confirmed, cancelled, pending, waitlist };
    } catch (error) {
      throw new DatabaseError('Failed to get session booking statistics', error as Error);
    }
  }

  /**
   * Find upcoming bookings for a user
   */
  async findUpcomingBookings(userId: string, limit: number = 10): Promise<Booking[]> {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          userId,
          status: {
            in: ['CONFIRMED', 'PENDING'],
          },
          classSession: {
            startsAt: {
              gte: new Date(),
            },
          },
        },
        include: {
          user: true,
          classSession: {
            include: {
              classType: true,
              instructor: true,
            },
          },
          payment: true,
        },
        orderBy: {
          classSession: {
            startsAt: 'asc',
          },
        },
        take: limit,
      });

      return bookings.map(this.mapPrismaToBooking);
    } catch (error) {
      throw new DatabaseError('Failed to find upcoming bookings', error as Error);
    }
  }

  /**
   * Map Prisma booking to domain Booking type
   */
  private mapPrismaToBooking(prismaBooking: any): Booking {
    return {
      id: prismaBooking.id,
      userId: prismaBooking.userId,
      classSessionId: prismaBooking.classSessionId,
      status: prismaBooking.status as BookingStatus,
      paymentId: prismaBooking.paymentId,
      createdAt: prismaBooking.createdAt,
      updatedAt: prismaBooking.updatedAt,
      user: prismaBooking.user ? {
        id: prismaBooking.user.id,
        name: prismaBooking.user.name,
        email: prismaBooking.user.email,
        emailVerified: prismaBooking.user.emailVerified,
        image: prismaBooking.user.image,
        passwordHash: prismaBooking.user.passwordHash,
        createdAt: prismaBooking.user.createdAt,
        updatedAt: prismaBooking.user.updatedAt,
      } : undefined,
      classSession: prismaBooking.classSession ? {
        id: prismaBooking.classSession.id,
        classTypeId: prismaBooking.classSession.classTypeId,
        instructorId: prismaBooking.classSession.instructorId,
        startsAt: prismaBooking.classSession.startsAt,
        endsAt: prismaBooking.classSession.endsAt,
        capacity: prismaBooking.classSession.capacity,
        location: prismaBooking.classSession.location,
        createdAt: prismaBooking.classSession.createdAt,
        updatedAt: prismaBooking.classSession.updatedAt,
        classType: prismaBooking.classSession.classType ? {
          id: prismaBooking.classSession.classType.id,
          name: prismaBooking.classSession.classType.name,
          description: prismaBooking.classSession.classType.description,
          durationMinutes: prismaBooking.classSession.classType.durationMinutes,
          defaultCapacity: prismaBooking.classSession.classType.defaultCapacity,
          difficulty: prismaBooking.classSession.classType.difficulty,
          createdAt: prismaBooking.classSession.classType.createdAt,
          updatedAt: prismaBooking.classSession.classType.updatedAt,
        } : undefined,
        instructor: prismaBooking.classSession.instructor ? {
          id: prismaBooking.classSession.instructor.id,
          name: prismaBooking.classSession.instructor.name,
          bio: prismaBooking.classSession.instructor.bio,
          imageUrl: prismaBooking.classSession.instructor.imageUrl,
          createdAt: prismaBooking.classSession.instructor.createdAt,
          updatedAt: prismaBooking.classSession.instructor.updatedAt,
        } : undefined,
      } : undefined,
      payment: prismaBooking.payment ? {
        id: prismaBooking.payment.id,
        userId: prismaBooking.payment.userId,
        provider: prismaBooking.payment.provider,
        amountCents: prismaBooking.payment.amountCents,
        currency: prismaBooking.payment.currency,
        status: prismaBooking.payment.status,
        stripeCheckoutId: prismaBooking.payment.stripeCheckoutId,
        stripePaymentIntentId: prismaBooking.payment.stripePaymentIntentId,
        createdAt: prismaBooking.payment.createdAt,
        updatedAt: prismaBooking.payment.updatedAt,
      } : undefined,
    };
  }
}