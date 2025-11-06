/**
 * Script to list all users in the database
 */

import { prisma } from "../lib/prisma";

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    if (users.length === 0) {
      console.log("No users found in database.");
      return;
    }

    console.log(`\nFound ${users.length} user(s):\n`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'No name'} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   ID: ${user.id}\n`);
    });

  } catch (error) {
    console.error("Error listing users:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
