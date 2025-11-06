# Admin Access Setup Guide

## Overview

The admin access system has been successfully implemented. This document explains how to use it.

## What Was Changed

### 1. Database Schema
- Added `UserRole` enum with values: `USER`, `ADMIN`, `INSTRUCTOR`
- Added `role` field to `User` model (defaults to `USER`)

### 2. Authentication
- Updated NextAuth callbacks to include `role` in JWT and session
- Role is automatically fetched on login and refreshed when updated

### 3. Authorization
- Admin layout ([app/admin/(dashboard)/layout.tsx](app/admin/(dashboard)/layout.tsx)) now checks for admin role
- All admin pages are protected and will redirect non-admin users to home
- Admin API routes now verify admin role before allowing access

### 4. Admin Features
- **User Management Page**: [/admin/users](http://localhost:3000/admin/users)
  - View all users
  - Change user roles (USER, INSTRUCTOR, ADMIN)
  - See user statistics (bookings, join date)
  - Delete users (cannot delete yourself)

### 5. API Endpoints
- `GET /api/admin/users` - List all users (admin only)
- `PATCH /api/admin/users/[id]` - Update user role (admin only)
- `DELETE /api/admin/users/[id]` - Delete user (admin only)

## How to Promote a User to Admin

### Method 1: Using the Script (Recommended for first admin)

```bash
npx tsx scripts/promote-admin.ts user@example.com
```

This script will:
1. Find the user by email
2. Display current user information
3. Promote the user to ADMIN role
4. Confirm the change

### Method 2: Using the Admin UI (For existing admins)

1. Sign in as an admin
2. Navigate to [/admin/users](http://localhost:3000/admin/users)
3. Find the user you want to promote
4. Use the "Change Role" dropdown
5. Select "Admin"
6. Confirm the change

### Method 3: Direct Database Update

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'user@example.com';
```

## Security Features

### Protected Routes
All routes under `/admin/*` are protected:
- Users must be authenticated
- Users must have `ADMIN` role
- Non-admin users are redirected to home page

### Protected API Endpoints
All admin API routes check for:
1. Valid authentication session
2. `ADMIN` role on the user

### Self-Protection
- Admins cannot demote themselves
- Admins cannot delete their own accounts

## User Roles

### USER (Default)
- Can book classes
- Can manage their own bookings
- Can view schedule and class information

### INSTRUCTOR
- All USER permissions
- (Future: can manage their own classes)

### ADMIN
- All USER permissions
- Can access admin dashboard
- Can manage all users and their roles
- Can manage sessions, classes, and instructors
- Can view system metrics and analytics

## Testing the Setup

1. **Create a test user**:
   - Go to [/auth/signup](http://localhost:3000/auth/signup)
   - Register with an email and password

2. **Promote to admin**:
   ```bash
   npx tsx scripts/promote-admin.ts your-email@example.com
   ```

3. **Sign out and sign back in**:
   - The user needs to refresh their session
   - Sign out completely
   - Sign back in

4. **Access admin panel**:
   - Navigate to [/admin](http://localhost:3000/admin)
   - You should now see the admin dashboard

## Troubleshooting

### "Access Denied" after promotion
- Make sure you signed out and back in after being promoted
- The session needs to be refreshed to pick up the new role

### Can't access admin pages
- Verify your role in the database:
  ```sql
  SELECT email, role FROM "User" WHERE email = 'your-email@example.com';
  ```
- Ensure the role is `ADMIN` (case-sensitive)

### TypeScript errors
- Run `npx prisma generate` to regenerate Prisma client
- Restart your development server

## File Changes Summary

### Modified Files
- [prisma/schema.prisma](prisma/schema.prisma) - Added UserRole enum and role field
- [lib/auth.ts](lib/auth.ts) - Updated NextAuth callbacks
- [lib/types/index.ts](lib/types/index.ts) - Added UserRole enum
- [types/next-auth.d.ts](types/next-auth.d.ts) - Added role to JWT type
- [app/admin/(dashboard)/layout.tsx](app/admin/(dashboard)/layout.tsx) - Added admin protection
- [app/api/admin/sessions/route.ts](app/api/admin/sessions/route.ts) - Added role check
- [app/api/admin/sessions/[id]/route.ts](app/api/admin/sessions/[id]/route.ts) - Added role checks

### New Files
- [app/api/admin/users/route.ts](app/api/admin/users/route.ts) - User list endpoint
- [app/api/admin/users/[id]/route.ts](app/api/admin/users/[id]/route.ts) - User management endpoint
- [app/admin/(dashboard)/users/page.tsx](app/admin/(dashboard)/users/page.tsx) - User management UI
- [scripts/promote-admin.ts](scripts/promote-admin.ts) - CLI tool for promoting users

## Next Steps

1. Create your first admin account using the promotion script
2. Test the admin dashboard and user management features
3. Consider implementing:
   - Email verification for new users
   - Two-factor authentication for admin accounts
   - Audit logging for admin actions
   - More granular permissions (if needed)

## Support

If you encounter any issues, check:
1. Database schema is up to date (`npx prisma db push`)
2. Prisma client is regenerated (`npx prisma generate`)
3. Environment variables are correctly set
4. Development server is restarted after schema changes
