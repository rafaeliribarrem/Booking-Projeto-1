# Technology Stack

## Core Framework & Runtime

- **Next.js 16.0.1**: React framework with App Router
- **React 19.2.0**: UI library with latest features
- **TypeScript 5**: Type-safe development
- **Node.js 20+**: Runtime environment

## Database & ORM

- **PostgreSQL 14+**: Primary database
- **Prisma 6.18.0**: Database ORM and query builder
- **Custom Prisma Output**: Generated client in `lib/generated/prisma`

## Authentication & Security

- **NextAuth.js 4.24.13**: Authentication framework
- **bcrypt**: Password hashing
- **Credentials Provider**: Email/password authentication
- **Google OAuth**: Social authentication

## Payment Processing

- **Stripe 19.2.0**: Payment processing and subscriptions
- **Webhook Integration**: Real-time payment status updates

## UI & Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Component library (New York style)
- **Radix UI**: Headless UI primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## Form Handling & Validation

- **React Hook Form 7.66.0**: Form management
- **Zod 4.1.12**: Schema validation
- **@hookform/resolvers**: Form validation integration

## Development Tools

- **ESLint 9**: Code linting
- **Vitest 4.0.6**: Testing framework
- **tsx**: TypeScript execution

## Common Commands

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm test           # Run tests
```

### Database Operations

```bash
npx prisma generate                    # Generate Prisma client
npx prisma migrate dev                # Run database migrations
npx prisma migrate deploy             # Deploy migrations to production
npx tsx prisma/seed.ts               # Seed database with sample data
npx prisma studio                    # Open Prisma Studio GUI
```

### Stripe Development

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Forward webhooks locally
```

## Environment Configuration

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: NextAuth encryption secret
- `NEXTAUTH_URL`: Application URL
- `STRIPE_SECRET_KEY`: Stripe API key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook endpoint secret
- `GOOGLE_CLIENT_ID`: Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret (optional)
- `RESEND_API_KEY`: Email service API key (optional)

## Build Configuration

- **Turbopack**: Enabled for faster builds
- **Path Aliases**: `@/*` maps to project root
- **Custom Prisma Output**: Client generated in `lib/generated/prisma`
- **Strict TypeScript**: Enabled for type safety
