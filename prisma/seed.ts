import { prisma } from "@/lib/prisma";

async function main() {
  // Instructors
  const instructors = await prisma.$transaction([
    prisma.instructor.upsert({
      where: { id: "seed-alex" },
      update: {},
      create: {
        id: "seed-alex",
        name: "Alex Rivera",
        bio: "Vinyasa & Power Yoga",
      },
    }),
    prisma.instructor.upsert({
      where: { id: "seed-mei" },
      update: {},
      create: { id: "seed-mei", name: "Mei Chen", bio: "Yin & Restorative" },
    }),
  ]);

  // Class types
  const vinyasa = await prisma.classType.upsert({
    where: { id: "seed-vinyasa" },
    update: {},
    create: {
      id: "seed-vinyasa",
      name: "Vinyasa Flow",
      description: "Dynamic flow linking breath with movement.",
      durationMinutes: 60,
      defaultCapacity: 16,
      difficulty: "All Levels",
    },
  });
  const yin = await prisma.classType.upsert({
    where: { id: "seed-yin" },
    update: {},
    create: {
      id: "seed-yin",
      name: "Yin Yoga",
      description: "Slow, meditative practice with deep stretches.",
      durationMinutes: 60,
      defaultCapacity: 14,
      difficulty: "All Levels",
    },
  });

  // Upcoming sessions (next 7 days)
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  for (let i = 0; i < 7; i++) {
    const start1 = new Date(now.getTime() + i * dayMs);
    start1.setHours(9, 0, 0, 0);
    const end1 = new Date(start1.getTime() + vinyasa.durationMinutes * 60000);

    const start2 = new Date(now.getTime() + i * dayMs);
    start2.setHours(18, 0, 0, 0);
    const end2 = new Date(start2.getTime() + yin.durationMinutes * 60000);

    await prisma.classSession.upsert({
      where: { id: `seed-vinyasa-${i}` },
      update: {},
      create: {
        id: `seed-vinyasa-${i}`,
        classTypeId: vinyasa.id,
        instructorId: instructors[0].id,
        startsAt: start1,
        endsAt: end1,
        capacity: vinyasa.defaultCapacity,
        location: "Studio A",
      },
    });
    await prisma.classSession.upsert({
      where: { id: `seed-yin-${i}` },
      update: {},
      create: {
        id: `seed-yin-${i}`,
        classTypeId: yin.id,
        instructorId: instructors[1].id,
        startsAt: start2,
        endsAt: end2,
        capacity: yin.defaultCapacity,
        location: "Studio B",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
