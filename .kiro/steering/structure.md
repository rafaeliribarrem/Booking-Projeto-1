# Project Structure & Architecture

## Directory Organization

### App Router Structure (`app/`)

```
app/
├── (marketing)/           # Public marketing pages (grouped route)
│   ├── page.tsx          # Homepage
│   └── pricing/          # Pricing page
├── admin/                # Administrative dashboard
│   ├── (dashboard)/      # Admin layout group
│   ├── classes/          # Class type management
│   ├── instructors/      # Instructor management
│   └── sessions/         # Session management
├── api/                  # API routes
│   ├── admin/           # Admin-only endpoints
│   ├── auth/            # Authentication endpoints
│   ├── bookings/        # Booking management
│   ├── sessions/        # Session queries
│   └── webhooks/        # External service webhooks
├── auth/                # Authentication pages
│   ├── signin/          # Sign in page
│   └── signup/          # Sign up page
├── booking/             # Booking flow
│   ├── checkout/        # Payment checkout
│   └── start/           # Booking initiation
├── class/               # Individual class pages
├── instructors/         # Instructor listing
└── schedule/            # Class schedule
```

### Component Architecture (`components/`)

```
components/
├── admin/               # Admin-specific components
├── home/                # Homepage components
├── instructors/         # Instructor-related components
├── schedule/            # Schedule and session components
├── site/                # Site-wide components (nav, footer)
└── ui/                  # shadcn/ui components (reusable)
```

### Library Structure (`lib/`)

```
lib/
├── generated/           # Auto-generated Prisma client
│   └── prisma/         # Custom Prisma output location
├── controllers/         # Business logic controllers
├── errors/             # Custom error definitions
├── middleware/         # Request middleware
├── repositories/       # Data access layer
├── services/           # Business logic services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── validators/         # Zod validation schemas
├── auth.ts             # NextAuth configuration
├── prisma.ts           # Prisma client instance
└── stripe.ts           # Stripe client configuration
```

## Architectural Patterns

### Layered Architecture

1. **API Routes** (`app/api/`) - HTTP endpoints
2. **Controllers** (`lib/controllers/`) - Request handling and validation
3. **Services** (`lib/services/`) - Business logic
4. **Repositories** (`lib/repositories/`) - Data access
5. **Database** (Prisma + PostgreSQL)

### Authentication Flow

- NextAuth.js handles session management
- JWT strategy for stateless sessions
- Custom pages for sign-in/sign-up
- Middleware for route protection

### Data Flow

- **Client** → **API Route** → **Controller** → **Service** → **Repository** → **Database**
- Error handling at each layer with custom error types
- Type safety throughout with TypeScript and Zod validation

## File Naming Conventions

### Components

- PascalCase for component files: `SessionCard.tsx`
- kebab-case for utility components: `instructor-card.tsx`
- Group related components in folders

### API Routes

- Follow Next.js App Router conventions
- Dynamic routes: `[id]/route.ts`
- Nested resources: `sessions/[id]/availability/route.ts`

### Types & Interfaces

- PascalCase for interfaces: `ClassSession`, `BookingStatus`
- Enums in UPPER_CASE: `BOOKING_STATUS.CONFIRMED`
- Result types for error handling: `Result<T, E>`

## Database Schema Patterns

### Entity Relationships

- **User** ↔ **Booking** ↔ **ClassSession**
- **ClassSession** → **ClassType** + **Instructor**
- **Booking** → **Payment** (optional)
- **User** → **Pass** (credit system)

### Naming Conventions

- PascalCase for model names: `ClassSession`, `BookingStatus`
- camelCase for field names: `startsAt`, `classTypeId`
- Descriptive foreign keys: `classSessionId`, `instructorId`

## Import Patterns

### Path Aliases

- `@/` maps to project root
- `@/components` for UI components
- `@/lib` for utilities and business logic
- `@/app` for pages and API routes

### Barrel Exports

- Index files re-export related modules
- `lib/services/index.ts` exports all services
- `lib/types/index.ts` exports all type definitions

## Error Handling Strategy

### Custom Error Types

- Domain-specific error codes: `BookingErrorCode`, `SessionErrorCode`
- Result pattern for service layer: `Result<T, E>`
- Middleware for consistent API error responses

### Validation

- Zod schemas for input validation
- Type-safe form handling with React Hook Form
- Server-side validation in API routes

## Testing Structure

### Test Organization

- Tests alongside source files or in `tests/` directory
- Unit tests for services and utilities
- Integration tests for API endpoints
- Vitest for test runner

This architecture promotes separation of concerns, type safety, and maintainable code organization.
