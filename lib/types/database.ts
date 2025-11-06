// Database-specific types and utilities

import { Prisma } from '../generated/prisma/client';

// Prisma model types with relations
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    bookings: {
      include: {
        classSession: {
          include: {
            classType: true;
            instructor: true;
          };
        };
      };
    };
    passes: true;
    payments: true;
  };
}>;

export type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    user: true;
    classSession: {
      include: {
        classType: true;
        instructor: true;
      };
    };
    payment: true;
  };
}>;

export type ClassSessionWithRelations = Prisma.ClassSessionGetPayload<{
  include: {
    classType: true;
    instructor: true;
    bookings: {
      include: {
        user: true;
      };
    };
  };
}>;

export type InstructorWithSessions = Prisma.InstructorGetPayload<{
  include: {
    sessions: {
      include: {
        classType: true;
        bookings: true;
      };
    };
  };
}>;

export type ClassTypeWithSessions = Prisma.ClassTypeGetPayload<{
  include: {
    sessions: {
      include: {
        instructor: true;
        bookings: true;
      };
    };
  };
}>;

export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: {
    user: true;
    bookings: {
      include: {
        classSession: {
          include: {
            classType: true;
            instructor: true;
          };
        };
      };
    };
  };
}>;

// Database transaction type
export type DatabaseTransaction = Prisma.TransactionClient;

// Common where clauses
export type UserWhereInput = Prisma.UserWhereInput;
export type BookingWhereInput = Prisma.BookingWhereInput;
export type ClassSessionWhereInput = Prisma.ClassSessionWhereInput;
export type InstructorWhereInput = Prisma.InstructorWhereInput;
export type ClassTypeWhereInput = Prisma.ClassTypeWhereInput;
export type PaymentWhereInput = Prisma.PaymentWhereInput;

// Order by clauses
export type UserOrderByInput = Prisma.UserOrderByWithRelationInput;
export type BookingOrderByInput = Prisma.BookingOrderByWithRelationInput;
export type ClassSessionOrderByInput = Prisma.ClassSessionOrderByWithRelationInput;
export type InstructorOrderByInput = Prisma.InstructorOrderByWithRelationInput;
export type ClassTypeOrderByInput = Prisma.ClassTypeOrderByWithRelationInput;
export type PaymentOrderByInput = Prisma.PaymentOrderByWithRelationInput;

// Create input types
export type UserCreateInput = Prisma.UserCreateInput;
export type BookingCreateInput = Prisma.BookingCreateInput;
export type ClassSessionCreateInput = Prisma.ClassSessionCreateInput;
export type InstructorCreateInput = Prisma.InstructorCreateInput;
export type ClassTypeCreateInput = Prisma.ClassTypeCreateInput;
export type PaymentCreateInput = Prisma.PaymentCreateInput;

// Update input types
export type UserUpdateInput = Prisma.UserUpdateInput;
export type BookingUpdateInput = Prisma.BookingUpdateInput;
export type ClassSessionUpdateInput = Prisma.ClassSessionUpdateInput;
export type InstructorUpdateInput = Prisma.InstructorUpdateInput;
export type ClassTypeUpdateInput = Prisma.ClassTypeUpdateInput;
export type PaymentUpdateInput = Prisma.PaymentUpdateInput;

// Database connection configuration
export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
  connectionTimeout?: number;
  queryTimeout?: number;
  logLevel?: 'info' | 'query' | 'warn' | 'error';
}

// Query options
export interface QueryOptions {
  include?: Record<string, any>;
  select?: Record<string, any>;
  orderBy?: Record<string, any>;
  where?: Record<string, any>;
  take?: number;
  skip?: number;
}

// Pagination options for database queries
export interface DatabasePaginationOptions {
  page: number;
  limit: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
}

// Database operation result
export type DatabaseResult<T> = {
  success: boolean;
  data?: T;
  error?: Error;
  affectedRows?: number;
};

// Bulk operation result
export interface BulkOperationResult {
  count: number;
  success: boolean;
  errors?: Error[];
}

// Database health check
export interface DatabaseHealth {
  connected: boolean;
  responseTime: number;
  activeConnections?: number;
  maxConnections?: number;
}