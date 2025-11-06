/**
 * Script to promote a user to admin role
 * Usage: npx tsx scripts/promote-admin.ts <email>
 */

import { prisma } from "../lib/prisma";

async function promoteToAdmin(email: string) {
  try {
    console.log(`\nLooking for user with email: ${email}...`);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      process.exit(1);
    }

    console.log(`\nFound user:`);
    console.log(`- ID: ${user.id}`);
    console.log(`- Name: ${user.name || "N/A"}`);
    console.log(`- Email: ${user.email}`);
    console.log(`- Current Role: ${user.role}`);

    if (user.role === "ADMIN") {
      console.log(`\n✅ User is already an admin!`);
      process.exit(0);
    }

    console.log(`\nPromoting user to ADMIN...`);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    console.log(`\n✅ Successfully promoted user to admin!`);
    console.log(`- ID: ${updatedUser.id}`);
    console.log(`- Name: ${updatedUser.name || "N/A"}`);
    console.log(`- Email: ${updatedUser.email}`);
    console.log(`- New Role: ${updatedUser.role}`);
    console.log(`\n🔐 The user will need to sign out and sign back in to see the changes.\n`);

  } catch (error) {
    console.error(`\n❌ Error promoting user:`, error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error("❌ Please provide an email address");
  console.log("Usage: npx tsx scripts/promote-admin.ts <email>");
  process.exit(1);
}

promoteToAdmin(email);
