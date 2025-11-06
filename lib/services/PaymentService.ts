// PaymentService implementation (simplified for student project)

import { IPaymentService } from "./interfaces";
import { Payment, Result, CreatePaymentData, PaymentStatus } from "../types";
import { PaymentError, withErrorHandler } from "../errors";
import { prisma } from "../prisma";

export class PaymentService implements IPaymentService {
  /**
   * Create a payment record (mock implementation for student project)
   */
  async createPayment(
    data: CreatePaymentData
  ): Promise<Result<Payment, PaymentError>> {
    try {
      // Validate amount
      if (data.amountCents <= 0) {
        return {
          success: false,
          error: new PaymentError(
            "Payment amount must be greater than zero",
            "INVALID_AMOUNT" as any,
            400
          ),
        };
      }

      if (data.amountCents > 50000) {
        // $500 max for student project
        return {
          success: false,
          error: new PaymentError(
            "Payment amount exceeds maximum allowed",
            "INVALID_AMOUNT" as any,
            400
          ),
        };
      }

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          userId: data.userId,
          provider: data.provider || "MOCK",
          amountCents: data.amountCents,
          currency: data.currency || "USD",
          status: "PENDING",
        },
        include: {
          user: true,
        },
      });

      return {
        success: true,
        data: this.mapPrismaToPayment(payment),
      };
    } catch (error) {
      return {
        success: false,
        error: new PaymentError(
          "Failed to create payment",
          "PAYMENT_FAILED" as any,
          500
        ),
      };
    }
  }

  /**
   * Confirm a payment (mock implementation)
   */
  async confirmPayment(
    paymentId: string
  ): Promise<Result<Payment, PaymentError>> {
    try {
      // Get payment
      const existingPayment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { user: true },
      });

      if (!existingPayment) {
        return {
          success: false,
          error: new PaymentError(
            "Payment not found",
            "PAYMENT_NOT_FOUND" as any,
            404
          ),
        };
      }

      if (existingPayment.status !== "PENDING") {
        return {
          success: false,
          error: new PaymentError(
            `Cannot confirm payment with status: ${existingPayment.status}`,
            "INVALID_PAYMENT_STATUS" as any,
            400
          ),
        };
      }

      // Mock payment processing logic
      const isSuccessful = await this.mockPaymentProcessing(
        existingPayment.amountCents
      );

      const newStatus = isSuccessful ? "SUCCEEDED" : "FAILED";

      // Update payment status
      const updatedPayment = await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: newStatus,
          updatedAt: new Date(),
        },
        include: {
          user: true,
        },
      });

      if (!isSuccessful) {
        return {
          success: false,
          error: new PaymentError(
            "Payment processing failed",
            "PAYMENT_FAILED" as any,
            400
          ),
        };
      }

      return {
        success: true,
        data: this.mapPrismaToPayment(updatedPayment),
      };
    } catch (error) {
      return {
        success: false,
        error: new PaymentError(
          "Failed to confirm payment",
          "PAYMENT_FAILED" as any,
          500
        ),
      };
    }
  }

  /**
   * Process refund (mock implementation)
   */
  async refundPayment(
    paymentId: string,
    reason?: string
  ): Promise<Result<Payment, PaymentError>> {
    try {
      // Get payment
      const existingPayment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { user: true },
      });

      if (!existingPayment) {
        return {
          success: false,
          error: new PaymentError(
            "Payment not found",
            "PAYMENT_NOT_FOUND" as any,
            404
          ),
        };
      }

      if (existingPayment.status !== "SUCCEEDED") {
        return {
          success: false,
          error: new PaymentError(
            `Cannot refund payment with status: ${existingPayment.status}`,
            "INVALID_PAYMENT_STATUS" as any,
            400
          ),
        };
      }

      // Mock refund processing
      const refundSuccessful = await this.mockRefundProcessing(
        existingPayment.amountCents
      );

      if (!refundSuccessful) {
        return {
          success: false,
          error: new PaymentError(
            "Refund processing failed",
            "REFUND_FAILED" as any,
            500
          ),
        };
      }

      // Update payment status
      const updatedPayment = await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: "REFUNDED",
          updatedAt: new Date(),
        },
        include: {
          user: true,
        },
      });

      return {
        success: true,
        data: this.mapPrismaToPayment(updatedPayment),
      };
    } catch (error) {
      return {
        success: false,
        error: new PaymentError(
          "Failed to process refund",
          "REFUND_FAILED" as any,
          500
        ),
      };
    }
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: string): Promise<Payment | null> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: {
          user: true,
          bookings: {
            include: {
              classSession: {
                include: {
                  classType: true,
                  instructor: true,
                },
              },
            },
          },
        },
      });

      return payment ? this.mapPrismaToPayment(payment) : null;
    } catch (error) {
      console.error("Error fetching payment:", error);
      return null;
    }
  }

  /**
   * Get user's payment history
   */
  async getUserPayments(userId: string): Promise<Payment[]> {
    try {
      const payments = await prisma.payment.findMany({
        where: { userId },
        include: {
          user: true,
          bookings: {
            include: {
              classSession: {
                include: {
                  classType: true,
                  instructor: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return payments.map(this.mapPrismaToPayment);
    } catch (error) {
      console.error("Error fetching user payments:", error);
      return [];
    }
  }

  /**
   * Get payment statistics for a user
   */
  async getUserPaymentStats(userId: string): Promise<{
    totalPayments: number;
    totalAmountCents: number;
    successfulPayments: number;
    failedPayments: number;
    refundedPayments: number;
  }> {
    try {
      const [
        totalPayments,
        successfulPayments,
        failedPayments,
        refundedPayments,
        totalAmountResult,
      ] = await Promise.all([
        prisma.payment.count({ where: { userId } }),
        prisma.payment.count({ where: { userId, status: "SUCCEEDED" } }),
        prisma.payment.count({ where: { userId, status: "FAILED" } }),
        prisma.payment.count({ where: { userId, status: "REFUNDED" } }),
        prisma.payment.aggregate({
          where: { userId, status: "SUCCEEDED" },
          _sum: { amountCents: true },
        }),
      ]);

      return {
        totalPayments,
        totalAmountCents: totalAmountResult._sum.amountCents || 0,
        successfulPayments,
        failedPayments,
        refundedPayments,
      };
    } catch (error) {
      console.error("Error fetching payment stats:", error);
      return {
        totalPayments: 0,
        totalAmountCents: 0,
        successfulPayments: 0,
        failedPayments: 0,
        refundedPayments: 0,
      };
    }
  }

  /**
   * Process bulk refunds (admin function)
   */
  async processBulkRefunds(
    paymentIds: string[],
    reason?: string
  ): Promise<{
    successful: number;
    failed: number;
    errors: string[];
  }> {
    return withErrorHandler(async () => {
      let successful = 0;
      let failed = 0;
      const errors: string[] = [];

      for (const paymentId of paymentIds) {
        try {
          await this.refundPayment(paymentId, reason);
          successful++;
        } catch (error) {
          failed++;
          errors.push(`Payment ${paymentId}: ${error}`);
        }
      }

      return { successful, failed, errors };
    })();
  }

  /**
   * Calculate booking price (mock implementation)
   */
  async calculateBookingPrice(
    classTypeId: string,
    userId: string,
    promoCode?: string
  ): Promise<{
    basePrice: number;
    discount: number;
    finalPrice: number;
    currency: string;
  }> {
    return withErrorHandler(async () => {
      // Mock pricing logic for student project
      const basePrice = 2500; // $25.00 in cents
      let discount = 0;

      // Mock promo code logic
      if (promoCode) {
        switch (promoCode.toUpperCase()) {
          case "STUDENT10":
            discount = Math.round(basePrice * 0.1); // 10% discount
            break;
          case "FIRSTCLASS":
            discount = Math.round(basePrice * 0.5); // 50% discount for first class
            break;
          case "NEWBIE":
            discount = Math.round(basePrice * 0.2); // 20% discount
            break;
        }
      }

      // Check if user is new (first booking gets 20% off)
      const userPayments = await prisma.payment.count({
        where: { userId, status: "SUCCEEDED" },
      });

      if (userPayments === 0 && !promoCode) {
        discount = Math.round(basePrice * 0.2); // 20% new user discount
      }

      const finalPrice = Math.max(0, basePrice - discount);

      return {
        basePrice,
        discount,
        finalPrice,
        currency: "USD",
      };
    })();
  }

  /**
   * Mock payment processing (simulates external payment provider)
   */
  private async mockPaymentProcessing(amountCents: number): Promise<boolean> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Mock success rate (95% success for demo purposes)
    const random = Math.random();

    // Simulate different failure scenarios
    if (random < 0.02) {
      // 2% insufficient funds
      return false;
    }

    if (random < 0.03) {
      // 1% card declined
      return false;
    }

    if (random < 0.05) {
      // 2% network error
      return false;
    }

    // 95% success rate
    return true;
  }

  /**
   * Mock refund processing
   */
  private async mockRefundProcessing(amountCents: number): Promise<boolean> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Mock high success rate for refunds (98%)
    return Math.random() > 0.02;
  }

  /**
   * Map Prisma payment to domain Payment type
   */
  private mapPrismaToPayment(prismaPayment: any): Payment {
    return {
      id: prismaPayment.id,
      userId: prismaPayment.userId,
      provider: prismaPayment.provider,
      amountCents: prismaPayment.amountCents,
      currency: prismaPayment.currency,
      status: prismaPayment.status as PaymentStatus,
      stripeCheckoutId: prismaPayment.stripeCheckoutId,
      stripePaymentIntentId: prismaPayment.stripePaymentIntentId,
      createdAt: prismaPayment.createdAt,
      updatedAt: prismaPayment.updatedAt,
      user: prismaPayment.user
        ? {
            id: prismaPayment.user.id,
            name: prismaPayment.user.name,
            email: prismaPayment.user.email,
            emailVerified: prismaPayment.user.emailVerified,
            image: prismaPayment.user.image,
            passwordHash: prismaPayment.user.passwordHash,
            createdAt: prismaPayment.user.createdAt,
            updatedAt: prismaPayment.user.updatedAt,
          }
        : undefined,
      bookings:
        prismaPayment.bookings?.map((booking: any) => ({
          id: booking.id,
          userId: booking.userId,
          classSessionId: booking.classSessionId,
          status: booking.status,
          paymentId: booking.paymentId,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
          classSession: booking.classSession
            ? {
                id: booking.classSession.id,
                classTypeId: booking.classSession.classTypeId,
                instructorId: booking.classSession.instructorId,
                startsAt: booking.classSession.startsAt,
                endsAt: booking.classSession.endsAt,
                capacity: booking.classSession.capacity,
                location: booking.classSession.location,
                createdAt: booking.classSession.createdAt,
                updatedAt: booking.classSession.updatedAt,
                classType: booking.classSession.classType
                  ? {
                      id: booking.classSession.classType.id,
                      name: booking.classSession.classType.name,
                      description: booking.classSession.classType.description,
                      durationMinutes:
                        booking.classSession.classType.durationMinutes,
                      defaultCapacity:
                        booking.classSession.classType.defaultCapacity,
                      difficulty: booking.classSession.classType.difficulty,
                      createdAt: booking.classSession.classType.createdAt,
                      updatedAt: booking.classSession.classType.updatedAt,
                    }
                  : undefined,
                instructor: booking.classSession.instructor
                  ? {
                      id: booking.classSession.instructor.id,
                      name: booking.classSession.instructor.name,
                      bio: booking.classSession.instructor.bio,
                      imageUrl: booking.classSession.instructor.imageUrl,
                      createdAt: booking.classSession.instructor.createdAt,
                      updatedAt: booking.classSession.instructor.updatedAt,
                    }
                  : undefined,
              }
            : undefined,
        })) || [],
    };
  }
}
