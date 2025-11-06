# NextAuth v5 Upgrade Guide

## The Problem

You're using NextAuth v4.24.7 with Next.js 16.0.1, which are incompatible:
- NextAuth v4 doesn't support Next.js 16's async `params` and `cookies()` APIs
- This causes errors like "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

## The Solution

Upgrade to **NextAuth v5** (Auth.js), which fully supports Next.js 16.

## Quick Fix Steps

### 1. Install NextAuth v5

```bash
npm install next-auth@beta
```

### 2. Update Environment Variables

The environment variable names changed. Update your `.env` file:

```env
# Before (v4):
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# After (v5) - same values, no change needed:
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret-here
```

Or keep `NEXTAUTH_*` - v5 supports both.

### 3. Update lib/auth.ts

NextAuth v5 has a simpler API. Replace your current auth.ts with:

```typescript
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        return valid
          ? { id: user.id, name: user.name, email: user.email, role: user.role }
          : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // Refresh role from database on update trigger
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
```

### 4. Update API Route

Update `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

### 5. Update Client Code (if using SessionProvider)

If you're using `SessionProvider` in your layout, update the import:

```typescript
// Before (v4):
import { SessionProvider } from "next-auth/react";

// After (v5):
import { SessionProvider } from "next-auth/react";
// (Same import, but the provider works differently internally)
```

## Alternative: Temporary Workaround

If you don't want to upgrade yet, you can temporarily downgrade Next.js:

```bash
npm install next@15.0.3
```

But this is **not recommended** - NextAuth v5 is stable and better for new projects.

## Testing After Upgrade

1. Restart your dev server
2. Try signing in
3. Check if the errors are gone
4. Test the admin panel

## Migration Notes

### What Changed:
- Simpler API with `auth()` function directly
- Better TypeScript support
- Native async/await support
- Cleaner error messages

### What Stayed The Same:
- Provider configuration
- Callbacks work the same way
- Session structure unchanged
- Your database schema works as-is

## Resources

- [NextAuth v5 Upgrade Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [NextAuth v5 Documentation](https://authjs.dev)
- [Next.js 16 Compatibility](https://nextjs.org/docs/app/building-your-application/authentication)
