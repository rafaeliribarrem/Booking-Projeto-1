// Base repository with transaction support and common utilities

import { prisma } from "../prisma";
import { DatabaseError } from "../errors";
import { Prisma } from "../generated/prisma/client";

export type TransactionClient = Prisma.TransactionClient;

/**
 * Base repository class with common database operations and transaction support
 */
export abstract class BaseRepository {
  protected prisma = prisma;

  /**
   * Execute operations within a database transaction
   */
  async withTransaction<T>(
    operations: (tx: TransactionClient) => Promise<T>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): Promise<T> {
    try {
      return await this.prisma.$transaction(operations, {
        maxWait: options?.maxWait || 5000, // 5 seconds
        timeout: options?.timeout || 10000, // 10 seconds
        isolationLevel:
          options?.isolationLevel ||
          Prisma.TransactionIsolationLevel.ReadCommitted,
      });
    } catch (error) {
      throw new DatabaseError("Transaction failed", error as Error);
    }
  }

  /**
   * Execute multiple operations in parallel within a transaction
   */
  async withParallelTransaction<T extends any[]>(
    operations: T,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): Promise<T> {
    try {
      return (await this.prisma.$transaction(operations as any, {
        maxWait: options?.maxWait || 5000,
        timeout: options?.timeout || 10000,
        isolationLevel:
          options?.isolationLevel ||
          Prisma.TransactionIsolationLevel.ReadCommitted,
      })) as T;
    } catch (error) {
      throw new DatabaseError("Parallel transaction failed", error as Error);
    }
  }

  /**
   * Check if a record exists by ID
   */
  protected async exists(model: string, id: string): Promise<boolean> {
    try {
      const count = await (this.prisma as any)[model].count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      throw new DatabaseError(
        `Failed to check if ${model} exists`,
        error as Error
      );
    }
  }

  /**
   * Soft delete implementation (if needed in the future)
   */
  protected async softDelete(model: string, id: string): Promise<void> {
    try {
      await (this.prisma as any)[model].update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new DatabaseError(`${model} not found`);
        }
      }
      throw new DatabaseError(`Failed to soft delete ${model}`, error as Error);
    }
  }

  /**
   * Batch create operations with error handling
   */
  protected async batchCreate<T>(
    model: string,
    data: T[],
    batchSize: number = 100
  ): Promise<{ count: number; errors: Error[] }> {
    const errors: Error[] = [];
    let totalCount = 0;

    // Process in batches to avoid overwhelming the database
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      try {
        const result = await (this.prisma as any)[model].createMany({
          data: batch,
          skipDuplicates: true,
        });
        totalCount += result.count;
      } catch (error) {
        errors.push(error as Error);
      }
    }

    return { count: totalCount, errors };
  }

  /**
   * Batch update operations
   */
  protected async batchUpdate<T>(
    model: string,
    updates: Array<{ where: any; data: T }>,
    batchSize: number = 50
  ): Promise<{ count: number; errors: Error[] }> {
    const errors: Error[] = [];
    let totalCount = 0;

    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);

      try {
        await this.withTransaction(async (tx) => {
          for (const update of batch) {
            await (tx as any)[model].update(update);
            totalCount++;
          }
        });
      } catch (error) {
        errors.push(error as Error);
      }
    }

    return { count: totalCount, errors };
  }

  /**
   * Get database connection health
   */
  async getConnectionHealth(): Promise<{
    connected: boolean;
    responseTime: number;
  }> {
    const startTime = Date.now();

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        connected: true,
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        connected: false,
        responseTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Execute raw SQL query with error handling
   */
  protected async executeRawQuery<T = unknown>(
    query: string,
    ...values: any[]
  ): Promise<T> {
    try {
      return await this.prisma.$queryRawUnsafe<T>(query, ...values);
    } catch (error) {
      throw new DatabaseError("Raw query execution failed", error as Error);
    }
  }

  /**
   * Execute raw SQL command (INSERT, UPDATE, DELETE)
   */
  protected async executeRawCommand(
    command: string,
    ...values: any[]
  ): Promise<number> {
    try {
      return await this.prisma.$executeRawUnsafe(command, ...values);
    } catch (error) {
      throw new DatabaseError("Raw command execution failed", error as Error);
    }
  }

  /**
   * Handle Prisma errors and convert to appropriate domain errors
   */
  protected handlePrismaError(error: unknown, operation: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new DatabaseError("Unique constraint violation", error);
        case "P2003":
          throw new DatabaseError("Foreign key constraint violation", error);
        case "P2025":
          throw new DatabaseError("Record not found", error);
        case "P2014":
          throw new DatabaseError("Invalid ID provided", error);
        case "P2021":
          throw new DatabaseError("Table does not exist", error);
        case "P2022":
          throw new DatabaseError("Column does not exist", error);
        default:
          throw new DatabaseError(
            `Database operation failed: ${operation}`,
            error
          );
      }
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new DatabaseError(
        `Unknown database error during ${operation}`,
        error
      );
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
      throw new DatabaseError(
        `Database engine panic during ${operation}`,
        error
      );
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new DatabaseError("Database connection failed", error);
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new DatabaseError("Invalid query parameters", error);
    }

    throw new DatabaseError(
      `Unexpected error during ${operation}`,
      error as Error
    );
  }

  /**
   * Log slow queries for performance monitoring
   */
  protected logSlowQuery(
    query: string,
    duration: number,
    threshold: number = 1000
  ): void {
    if (duration > threshold) {
      console.warn(`Slow query detected (${duration}ms):`, {
        query: query.substring(0, 200) + (query.length > 200 ? "..." : ""),
        duration,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Create optimized where clause for text search
   */
  protected createTextSearchWhere(
    fields: string[],
    searchTerm: string
  ): Prisma.StringFilter[] {
    const searchWords = searchTerm.trim().split(/\s+/);

    return fields.map((field) => ({
      [field]: {
        contains: searchWords.join(" "),
        mode: "insensitive" as const,
      },
    }));
  }

  /**
   * Create pagination parameters
   */
  protected createPaginationParams(
    page: number,
    limit: number
  ): {
    skip: number;
    take: number;
  } {
    const normalizedPage = Math.max(1, page);
    const normalizedLimit = Math.min(Math.max(1, limit), 100);

    return {
      skip: (normalizedPage - 1) * normalizedLimit,
      take: normalizedLimit,
    };
  }

  /**
   * Create date range filter
   */
  protected createDateRangeFilter(
    startDate?: Date,
    endDate?: Date
  ): Prisma.DateTimeFilter | undefined {
    if (!startDate && !endDate) return undefined;

    const filter: Prisma.DateTimeFilter = {};

    if (startDate) {
      filter.gte = startDate;
    }

    if (endDate) {
      filter.lte = endDate;
    }

    return filter;
  }
}
