# Serenity Yoga Booking

A Next.js 14 app for browsing schedules, booking classes, and managing passes.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL (Supabase)
- NextAuth (Credentials + Google)
- Stripe Checkout + Webhooks

## Setup
1. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in:
   - `DATABASE_URL` (Supabase)
   - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_DROPIN`
   - Optional: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `RESEND_API_KEY`
3. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```

## Database
- Prisma schema at `prisma/schema.prisma`.
- Generate client:
  ```bash
  npx prisma generate
  ```
- Run migrations (requires `DATABASE_URL`):
  ```bash
  npx prisma migrate deploy
  ```
- Seed data (requires DB):
  ```bash
  tsx prisma/seed.ts
  ```

## Stripe
- Set price ID in `STRIPE_PRICE_DROPIN`.
- Webhook endpoint: `/api/webhooks/stripe`.
- In Stripe CLI:
  ```bash
  stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
  ```

## Deploy
- Host on Vercel; connect Supabase and Stripe.
- Add all env vars in Vercel Project Settings.
- Configure Stripe webhook to deployed URL.
