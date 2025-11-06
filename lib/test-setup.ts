// Simple test to verify the refactored code works
// This file can be deleted after testing

import { BookingService, SessionService, PaymentService } from './services';
import { BookingRepository, SessionRepository } from './repositories';
import { validateData, schemas } from './validators';

// Test that all services can be instantiated
export function testServiceInstantiation() {
  try {
    const bookingRepo = new BookingRepository();
    const sessionRepo = new SessionRepository();

    const bookingService = new BookingService(bookingRepo, sessionRepo);
    const sessionService = new SessionService(sessionRepo, bookingRepo);
    const paymentService = new PaymentService();

    console.log('✅ All services instantiated successfully');
    return true;
  } catch (error) {
    console.error('❌ Service instantiation failed:', error);
    return false;
  }
}

// Test validation schemas
export function testValidationSchemas() {
  try {
    // Test booking validation
    const bookingData = {
      userId: 'cm123456789',
      classSessionId: 'cm987654321',
    };

    const bookingValidation = validateData(schemas.CreateBooking, bookingData);
    if (!bookingValidation.success) {
      console.error('❌ Booking validation failed:', bookingValidation.error);
      return false;
    }

    // Test session validation
    const sessionData = {
      classTypeId: 'cm123456789',
      instructorId: 'cm987654321',
      startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      endsAt: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
      capacity: 12,
      location: 'Studio A',
    };

    const sessionValidation = validateData(schemas.CreateSession, sessionData);
    if (!sessionValidation.success) {
      console.error('❌ Session validation failed:', sessionValidation.error);
      return false;
    }

    console.log('✅ All validation schemas work correctly');
    return true;
  } catch (error) {
    console.error('❌ Validation test failed:', error);
    return false;
  }
}

// Run all tests
export function runAllTests() {
  console.log('🧪 Running refactored code tests...\n');

  const serviceTest = testServiceInstantiation();
  const validationTest = testValidationSchemas();

  if (serviceTest && validationTest) {
    console.log('\n🎉 All tests passed! The refactored code is ready to use.');
    return true;
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    return false;
  }
}

// Export for easy testing
if (typeof window === 'undefined') {
  // Only run in Node.js environment (not in browser)
  // runAllTests();
}