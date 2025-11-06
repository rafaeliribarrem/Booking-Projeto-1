// Repository layer exports and factory

import { BookingRepository } from './BookingRepository';
import { SessionRepository } from './SessionRepository';
import { BaseRepository } from './BaseRepository';

// Export repository classes
export { BookingRepository } from './BookingRepository';
export { SessionRepository } from './SessionRepository';
export { BaseRepository } from './BaseRepository';

// Export interfaces
export * from './interfaces';

// Repository factory for dependency injection
export class RepositoryFactory {
  private static bookingRepository: BookingRepository;
  private static sessionRepository: SessionRepository;

  /**
   * Get BookingRepository instance (singleton)
   */
  static getBookingRepository(): BookingRepository {
    if (!this.bookingRepository) {
      this.bookingRepository = new BookingRepository();
    }
    return this.bookingRepository;
  }

  /**
   * Get SessionRepository instance (singleton)
   */
  static getSessionRepository(): SessionRepository {
    if (!this.sessionRepository) {
      this.sessionRepository = new SessionRepository();
    }
    return this.sessionRepository;
  }

  /**
   * Reset all repository instances (useful for testing)
   */
  static reset(): void {
    this.bookingRepository = null as any;
    this.sessionRepository = null as any;
  }
}

// Convenience exports for direct access
export const bookingRepository = RepositoryFactory.getBookingRepository();
export const sessionRepository = RepositoryFactory.getSessionRepository();