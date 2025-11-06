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
        email: "alex@serenityyoga.com",
        phone: "+1 (555) 123-4567",
        bio: "Alex specializes in Vinyasa and Power Yoga with over 10 years of teaching experience. Her dynamic classes help students build strength and flexibility.",
        credentials: "RYT-500, E-RYT 200",
        isActive: true,
      },
    }),
    prisma.instructor.upsert({
      where: { id: "seed-mei" },
      update: {},
      create: {
        id: "seed-mei",
        name: "Mei Chen",
        email: "mei@serenityyoga.com",
        phone: "+1 (555) 234-5678",
        bio: "Mei brings a gentle approach to Yin and Restorative yoga, helping students find deep relaxation and inner peace. She has been teaching for 8 years.",
        credentials: "RYT-200, Yin Yoga Certified",
        isActive: true,
      },
    }),
    prisma.instructor.upsert({
      where: { id: "seed-sarah" },
      update: {},
      create: {
        id: "seed-sarah",
        name: "Sarah Johnson",
        email: "sarah@serenityyoga.com",
        phone: "+1 (555) 345-6789",
        bio: "Sarah teaches Hatha and beginner-friendly classes, making yoga accessible to everyone. Her patient teaching style is perfect for those new to yoga.",
        credentials: "RYT-200",
        isActive: true,
      },
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
      difficulty: "Intermediate",
      isActive: true,
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
      difficulty: "Beginner",
      isActive: true,
    },
  });
  const hatha = await prisma.classType.upsert({
    where: { id: "seed-hatha" },
    update: {},
    create: {
      id: "seed-hatha",
      name: "Hatha Yoga",
      description: "Traditional yoga focusing on physical postures and breathing techniques.",
      durationMinutes: 75,
      defaultCapacity: 12,
      difficulty: "Beginner",
      isActive: true,
    },
  });
  const power = await prisma.classType.upsert({
    where: { id: "seed-power" },
    update: {},
    create: {
      id: "seed-power",
      name: "Power Yoga",
      description: "Vigorous, fitness-based approach to vinyasa-style yoga.",
      durationMinutes: 60,
      defaultCapacity: 16,
      difficulty: "Advanced",
      isActive: true,
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
