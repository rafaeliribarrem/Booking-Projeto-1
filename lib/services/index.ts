// Service layer exports and factory

import { BookingService } from './BookingService';
import { SessionService } from './SessionService';
import { PaymentService } from './PaymentService';
import { BookingRepository, SessionRepository } from '../repositories';

// Export service classes
export { BookingService } from './BookingService';
export { SessionService } from './SessionService';
export { PaymentService } from './PaymentService';

// Export interfaces
export * from './interfaces';

// Service factory for dependency injection
export class ServiceFactory {
  private static bookingService: BookingService;
  private static sessionService: SessionService;
  private static paymentService: PaymentService;

  /**
   * Get BookingService instance (singleton)
   */
  static getBookingService(): BookingService {
    if (!this.bookingService) {
      const bookingRepository = new BookingRepository();
      const sessionRepository = new SessionRepository();
      this.bookingService = new BookingService(bookingRepository, sessionRepository);
    }
    return this.bookingService;
  }

  /**
   * Get SessionService instance (singleton)
   */
  static getSessionService(): SessionService {
    if (!this.sessionService) {
      const sessionRepository = new SessionRepository();
      const bookingRepository = new BookingRepository();
      this.sessionService = new SessionService(sessionRepository, bookingRepository);
    }
    return this.sessionService;
  }

  /**
   * Get PaymentService instance (singleton)
   */
  static getPaymentService(): PaymentService {
    if (!this.paymentService) {
      this.paymentService = new PaymentService();
    }
    return this.paymentService;
  }

  /**
   * Reset all service instances (useful for testing)
   */
  static reset(): void {
    this.bookingService = null as any;
    this.sessionService = null as any;
    this.paymentService = null as any;
  }
}

// Convenience exports for direct access
export const bookingService = ServiceFactory.getBookingService();
export const sessionService = ServiceFactory.getSessionService();
export const paymentService = ServiceFactory.getPaymentService();