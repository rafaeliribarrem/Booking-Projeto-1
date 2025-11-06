// Authentication and user validation schemas

import { z } from 'zod';

// Password validation with security requirements
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

// Email validation with additional checks
const emailSchema = z.string()
  .email('Invalid email format')
  .max(254, 'Email address too long')
  .toLowerCase()
  .refine(
    (email) => {
      // Additional email validation rules
      const domain = email.split('@')[1];
      return domain && domain.length > 0 && !domain.startsWith('-') && !domain.endsWith('-');
    },
    {
      message: 'Invalid email domain'
    }
  );

// Name validation
const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters long')
  .max(50, 'Name must not exceed 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .transform((name) => name.trim());

// User registration schema
export const UserRegistrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
  marketingConsent: z.boolean().default(false),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// User login schema
export const UserLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

// Password reset request schema
export const PasswordResetRequestSchema = z.object({
  email: emailSchema,
});

// Password reset schema
export const PasswordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// Change password schema (for authenticated users)
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmNewPassword: z.string(),
}).refine(
  (data) => data.newPassword === data.confirmNewPassword,
  {
    message: "New passwords don't match",
    path: ["confirmNewPassword"],
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: "New password must be different from current password",
    path: ["newPassword"],
  }
);

// Update user profile schema
export const UpdateUserProfileSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  dateOfBirth: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 13 && age <= 120;
      },
      {
        message: 'Age must be between 13 and 120 years'
      }
    ),
  emergencyContact: z.object({
    name: nameSchema,
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
    relationship: z.string().min(1).max(50),
  }).optional(),
  medicalConditions: z.string().max(500).optional(),
  fitnessLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  preferences: z.object({
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    marketingEmails: z.boolean().default(false),
    reminderTime: z.number().int().min(0).max(48).default(2), // hours before session
  }).optional(),
});

// Email verification schema
export const EmailVerificationSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

// Two-factor authentication setup schema
export const TwoFactorSetupSchema = z.object({
  secret: z.string().min(1, 'Secret is required'),
  token: z.string().regex(/^\d{6}$/, 'Token must be 6 digits'),
});

// Two-factor authentication verification schema
export const TwoFactorVerificationSchema = z.object({
  token: z.string().regex(/^\d{6}$/, 'Token must be 6 digits'),
});

// Admin user creation schema
export const AdminCreateUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  role: z.enum(['USER', 'ADMIN', 'INSTRUCTOR']).default('USER'),
  sendWelcomeEmail: z.boolean().default(true),
  temporaryPassword: z.boolean().default(true),
});

// User search schema
export const UserSearchSchema = z.object({
  query: z.string().min(1).max(100),
  role: z.enum(['USER', 'ADMIN', 'INSTRUCTOR']).optional(),
  active: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Session management schema
export const SessionManagementSchema = z.object({
  action: z.enum(['revoke', 'extend', 'refresh']),
  sessionId: z.string().optional(),
  allSessions: z.boolean().default(false),
});

// Validation utilities
export function validatePasswordStrength(password: string): {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  // Character variety checks
  if (/[a-z]/.test(password)) score++;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Include uppercase letters');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Include numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else feedback.push('Include special characters');

  // Additional checks
  if (password.length >= 12) score = Math.min(score + 0.5, 4);
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(score - 0.5, 0);
    feedback.push('Avoid repeated characters');
  }

  return {
    score: Math.round(score),
    feedback,
    isStrong: score >= 3
  };
}

export function validateEmailDomain(email: string, allowedDomains?: string[]): boolean {
  if (!allowedDomains || allowedDomains.length === 0) return true;

  const domain = email.split('@')[1]?.toLowerCase();
  return allowedDomains.some(allowed =>
    domain === allowed.toLowerCase() ||
    domain?.endsWith('.' + allowed.toLowerCase())
  );
}

export function sanitizeUserInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}