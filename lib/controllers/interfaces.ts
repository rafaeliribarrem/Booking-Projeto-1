// Controller interfaces for API request handling

import { NextRequest, NextResponse } from 'next/server';

// Base Controller Interface
export interface IBaseController {
  /**
   * Handle HTTP requests with proper error handling
   */
  handleRequest(req: NextRequest, handler: RequestHandler): Promise<NextResponse>;
}

// Request Handler Type
export type RequestHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiErrorResponse;
  message?: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, any>;
  statusCode: number;
}

// Pagination Response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Booking Controller Interface
export interface IBookingController extends IBaseController {
  /**
   * Create a new booking
   * POST /api/bookings
   */
  createBooking(req: NextRequest): Promise<NextResponse>;

  /**
   * Get user's bookings
   * GET /api/bookings?userId=xxx
   */
  getUserBookings(req: NextRequest): Promise<NextResponse>;

  /**
   * Cancel a booking
   * DELETE /api/bookings/[id]
   */
  cancelBooking(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;

  /**
   * Get booking by ID
   * GET /api/bookings/[id]
   */
  getBooking(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;

  /**
   * Update booking status
   * PATCH /api/bookings/[id]
   */
  updateBooking(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;
}

// Session Controller Interface
export interface ISessionController extends IBaseController {
  /**
   * Create a new session (admin only)
   * POST /api/admin/sessions
   */
  createSession(req: NextRequest): Promise<NextResponse>;

  /**
   * Get sessions with filters
   * GET /api/sessions
   */
  getSessions(req: NextRequest): Promise<NextResponse>;

  /**
   * Get session by ID
   * GET /api/sessions/[id]
   */
  getSession(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;

  /**
   * Update session (admin only)
   * PUT /api/admin/sessions/[id]
   */
  updateSession(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;

  /**
   * Delete session (admin only)
   * DELETE /api/admin/sessions/[id]
   */
  deleteSession(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;

  /**
   * Check session availability
   * GET /api/sessions/[id]/availability
   */
  checkAvailability(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;
}

// Payment Controller Interface (simplified for student project)
export interface IPaymentController extends IBaseController {
  /**
   * Create payment (mock)
   * POST /api/payments
   */
  createPayment(req: NextRequest): Promise<NextResponse>;

  /**
   * Confirm payment (mock)
   * POST /api/payments/[id]/confirm
   */
  confirmPayment(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse>;

  /**
   * Get user payments
   * GET /api/payments?userId=xxx
   */
  getUserPayments(req: NextRequest): Promise<NextResponse>;
}

// Auth Controller Interface
export interface IAuthController extends IBaseController {
  /**
   * User registration
   * POST /api/auth/register
   */
  register(req: NextRequest): Promise<NextResponse>;

  /**
   * User login
   * POST /api/auth/login
   */
  login(req: NextRequest): Promise<NextResponse>;

  /**
   * Get current user
   * GET /api/auth/me
   */
  getCurrentUser(req: NextRequest): Promise<NextResponse>;
}

// Request Context Types
export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export interface RequestContext {
  params?: Record<string, string>;
  searchParams?: URLSearchParams;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}