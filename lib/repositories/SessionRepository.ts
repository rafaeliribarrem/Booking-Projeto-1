// SessionRepository implementation using Prisma

import { prisma } from "../prisma";
import { ISessionRepository } from "./interfaces";
import {
  ClassSession,
  CreateSessionData,
  UpdateSessionData,
  SessionFilters,
  TimeRange,
} from "../types";
import { DatabaseError } from "../errors";
import { Prisma } from "../generated/prisma/client";

export class SessionRepository implements ISessionRepository {
  /**
   * Create a new session
   */
  async create(data: CreateSessionData): Promise<ClassSession> {
    try {
      const session = await prisma.classSession.create({
        data: {
          classTypeId: data.classTypeId,
          instructorId: data.instructorId,
          startsAt: data.startsAt,
          endsAt: data.endsAt,
          capacity: data.capacity,
          location: data.location,
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
      });

      return this.mapPrismaToSession(session);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new DatabaseError("Invalid class type ID or instructor ID");
        }
      }
      throw new DatabaseError("Failed to create session", error as Error);
    }
  }

  /**
   * Find session by ID
   */
  async findById(id: string): Promise<ClassSession | null> {
    try {
      const session = await prisma.classSession.findUnique({
        where: { id },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
      });

      return session ? this.mapPrismaToSession(session) : null;
    } catch (error) {
      throw new DatabaseError("Failed to find session", error as Error);
    }
  }

  /**
   * Update session
   */
  async update(id: string, data: UpdateSessionData): Promise<ClassSession> {
    try {
      const session = await prisma.classSession.update({
        where: { id },
        data: {
          ...(data.classTypeId && { classTypeId: data.classTypeId }),
          ...(data.instructorId && { instructorId: data.instructorId }),
          ...(data.startsAt && { startsAt: data.startsAt }),
          ...(data.endsAt && { endsAt: data.endsAt }),
          ...(data.capacity !== undefined && { capacity: data.capacity }),
          ...(data.location !== undefined && { location: data.location }),
          updatedAt: new Date(),
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
      });

      return this.mapPrismaToSession(session);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new DatabaseError("Session not found");
        }
        if (error.code === "P2003") {
          throw new DatabaseError("Invalid class type ID or instructor ID");
        }
      }
      throw new DatabaseError("Failed to update session", error as Error);
    }
  }

  /**
   * Delete session
   */
  async delete(id: string): Promise<void> {
    try {
      await prisma.classSession.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new DatabaseError("Session not found");
        }
        if (error.code === "P2003") {
          throw new DatabaseError(
            "Cannot delete session with existing bookings"
          );
        }
      }
      throw new DatabaseError("Failed to delete session", error as Error);
    }
  }

  /**
   * Find sessions by various filters
   */
  async findByFilters(filters: SessionFilters): Promise<ClassSession[]> {
    try {
      const where: Prisma.ClassSessionWhereInput = {};

      // Date filtering
      if (filters.date) {
        const date = new Date(filters.date);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        where.startsAt = {
          gte: date,
          lt: nextDay,
        };
      } else if (filters.startDate && filters.endDate) {
        where.startsAt = {
          gte: filters.startDate,
          lte: filters.endDate,
        };
      } else if (filters.startDate) {
        where.startsAt = {
          gte: filters.startDate,
        };
      } else if (filters.endDate) {
        where.startsAt = {
          lte: filters.endDate,
        };
      }

      // Instructor filtering
      if (filters.instructorId) {
        where.instructorId = filters.instructorId;
      }

      // Class type filtering
      if (filters.classTypeId) {
        where.classTypeId = filters.classTypeId;
      }

      const sessions = await prisma.classSession.findMany({
        where,
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
        take: filters.limit || 50,
        skip: filters.offset || 0,
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find sessions by filters",
        error as Error
      );
    }
  }

  /**
   * Find sessions that conflict with given time range for an instructor
   */
  async findConflicting(
    timeRange: TimeRange,
    instructorId: string,
    excludeSessionId?: string
  ): Promise<ClassSession[]> {
    try {
      const where: Prisma.ClassSessionWhereInput = {
        instructorId,
        OR: [
          // Session starts during the time range
          {
            startsAt: {
              gte: timeRange.start,
              lt: timeRange.end,
            },
          },
          // Session ends during the time range
          {
            endsAt: {
              gt: timeRange.start,
              lte: timeRange.end,
            },
          },
          // Session encompasses the entire time range
          {
            startsAt: {
              lte: timeRange.start,
            },
            endsAt: {
              gte: timeRange.end,
            },
          },
        ],
      };

      if (excludeSessionId) {
        where.id = {
          not: excludeSessionId,
        };
      }

      const sessions = await prisma.classSession.findMany({
        where,
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find conflicting sessions",
        error as Error
      );
    }
  }

  /**
   * Find upcoming sessions
   */
  async findUpcoming(limit: number = 50): Promise<ClassSession[]> {
    try {
      const sessions = await prisma.classSession.findMany({
        where: {
          startsAt: {
            gte: new Date(),
          },
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
        take: limit,
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find upcoming sessions",
        error as Error
      );
    }
  }

  /**
   * Find sessions by instructor
   */
  async findByInstructor(
    instructorId: string,
    startDate?: Date
  ): Promise<ClassSession[]> {
    try {
      const where: Prisma.ClassSessionWhereInput = {
        instructorId,
      };

      if (startDate) {
        where.startsAt = {
          gte: startDate,
        };
      }

      const sessions = await prisma.classSession.findMany({
        where,
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find instructor sessions",
        error as Error
      );
    }
  }

  /**
   * Find sessions by class type
   */
  async findByClassType(classTypeId: string): Promise<ClassSession[]> {
    try {
      const sessions = await prisma.classSession.findMany({
        where: {
          classTypeId,
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find class type sessions",
        error as Error
      );
    }
  }

  /**
   * Find sessions by date range
   */
  async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<ClassSession[]> {
    try {
      const sessions = await prisma.classSession.findMany({
        where: {
          startsAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find sessions by date range",
        error as Error
      );
    }
  }

  /**
   * Count total sessions
   */
  async count(filters?: SessionFilters): Promise<number> {
    try {
      const where: Prisma.ClassSessionWhereInput = {};

      if (filters) {
        if (filters.date) {
          const date = new Date(filters.date);
          const nextDay = new Date(date);
          nextDay.setDate(date.getDate() + 1);
          where.startsAt = {
            gte: date,
            lt: nextDay,
          };
        }

        if (filters.instructorId) {
          where.instructorId = filters.instructorId;
        }

        if (filters.classTypeId) {
          where.classTypeId = filters.classTypeId;
        }

        if (filters.startDate && filters.endDate) {
          where.startsAt = {
            gte: filters.startDate,
            lte: filters.endDate,
          };
        }
      }

      return await prisma.classSession.count({ where });
    } catch (error) {
      throw new DatabaseError("Failed to count sessions", error as Error);
    }
  }

  /**
   * Find sessions with available spots
   */
  async findAvailableSessions(limit: number = 50): Promise<ClassSession[]> {
    try {
      const sessions = await prisma.classSession.findMany({
        where: {
          startsAt: {
            gte: new Date(),
          },
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            where: {
              status: "CONFIRMED",
            },
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
        take: limit,
      });

      // Filter sessions with available spots
      const availableSessions = sessions.filter((session) => {
        const confirmedBookings = session.bookings.filter(
          (booking) => booking.status === "CONFIRMED"
        ).length;
        return confirmedBookings < session.capacity;
      });

      return availableSessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find available sessions",
        error as Error
      );
    }
  }

  /**
   * Get session statistics
   */
  async getSessionStats(sessionId: string): Promise<{
    totalBookings: number;
    confirmedBookings: number;
    availableSpots: number;
    waitlistCount: number;
  }> {
    try {
      const session = await prisma.classSession.findUnique({
        where: { id: sessionId },
        include: {
          bookings: true,
        },
      });

      if (!session) {
        throw new DatabaseError("Session not found");
      }

      const totalBookings = session.bookings.length;
      const confirmedBookings = session.bookings.filter(
        (booking) => booking.status === "CONFIRMED"
      ).length;
      const waitlistCount = session.bookings.filter(
        (booking) => booking.status === "WAITLIST"
      ).length;
      const availableSpots = Math.max(0, session.capacity - confirmedBookings);

      return {
        totalBookings,
        confirmedBookings,
        availableSpots,
        waitlistCount,
      };
    } catch (error) {
      throw new DatabaseError(
        "Failed to get session statistics",
        error as Error
      );
    }
  }

  /**
   * Find sessions by instructor with date range
   */
  async findInstructorSchedule(
    instructorId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ClassSession[]> {
    try {
      const sessions = await prisma.classSession.findMany({
        where: {
          instructorId,
          startsAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          classType: true,
          instructor: true,
          bookings: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startsAt: "asc",
        },
      });

      return sessions.map(this.mapPrismaToSession);
    } catch (error) {
      throw new DatabaseError(
        "Failed to find instructor schedule",
        error as Error
      );
    }
  }

  /**
   * Map Prisma session to domain ClassSession type
   */
  private mapPrismaToSession(prismaSession: any): ClassSession {
    const confirmedBookings =
      prismaSession.bookings?.filter(
        (booking: any) => booking.status === "CONFIRMED"
      ).length || 0;

    return {
      id: prismaSession.id,
      classTypeId: prismaSession.classTypeId,
      instructorId: prismaSession.instructorId,
      startsAt: prismaSession.startsAt,
      endsAt: prismaSession.endsAt,
      capacity: prismaSession.capacity,
      location: prismaSession.location,
      createdAt: prismaSession.createdAt,
      updatedAt: prismaSession.updatedAt,
      availableSpots: Math.max(0, prismaSession.capacity - confirmedBookings),
      classType: prismaSession.classType
        ? {
            id: prismaSession.classType.id,
            name: prismaSession.classType.name,
            description: prismaSession.classType.description,
            durationMinutes: prismaSession.classType.durationMinutes,
            defaultCapacity: prismaSession.classType.defaultCapacity,
            difficulty: prismaSession.classType.difficulty,
            createdAt: prismaSession.classType.createdAt,
            updatedAt: prismaSession.classType.updatedAt,
          }
        : undefined,
      instructor: prismaSession.instructor
        ? {
            id: prismaSession.instructor.id,
            name: prismaSession.instructor.name,
            bio: prismaSession.instructor.bio,
            imageUrl: prismaSession.instructor.imageUrl,
            createdAt: prismaSession.instructor.createdAt,
            updatedAt: prismaSession.instructor.updatedAt,
          }
        : undefined,
      bookings:
        prismaSession.bookings?.map((booking: any) => ({
          id: booking.id,
          userId: booking.userId,
          classSessionId: booking.classSessionId,
          status: booking.status,
          paymentId: booking.paymentId,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
          user: booking.user
            ? {
                id: booking.user.id,
                name: booking.user.name,
                email: booking.user.email,
                emailVerified: booking.user.emailVerified,
                image: booking.user.image,
                passwordHash: booking.user.passwordHash,
                createdAt: booking.user.createdAt,
                updatedAt: booking.user.updatedAt,
              }
            : undefined,
        })) || [],
    };
  }
}
