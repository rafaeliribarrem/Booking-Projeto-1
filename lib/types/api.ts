// API-specific types and interfaces

import { NextRequest } from 'next/server';

// Standard API Response format
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  message?: string;
  timestamp: string;
  requestId?: string;
}

// Success response helper
export interface SuccessResponse<T> extends ApiResponse<T> {
  success: true;
  data: T;
}

// Error response helper
export interface ErrorResponse extends ApiResponse<never> {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Paginated response
export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Request with authenticated user
export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: 'USER' | 'ADMIN';
  };
}

// API route context
export interface RouteContext {
  params?: Record<string, string>;
  searchParams?: URLSearchParams;
}

// Middleware context
export interface MiddlewareContext {
  requestId: string;
  startTime: number;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

// Rate limiting info
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Health check response
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  services: {
    database: 'connected' | 'disconnected';
    cache?: 'connected' | 'disconnected';
  };
  uptime: number;
}