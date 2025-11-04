import { prisma } from "@/lib/prisma";
import { InstructorCard } from "@/components/instructors/instructor-card";

// Mock data for specialties and experience - in a real app, this could come from the database
const instructorDetails: Record<string, { specialty: string; experience: string }> = {
  "default": { specialty: "Yoga Master", experience: "5+ years teaching" },
};

export default async function InstructorsPage() {
  const instructors = await prisma.instructor.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          Meet Our Instructors
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Our experienced team of yoga instructors is dedicated to helping you achieve balance,
          strength, and inner peace through the practice of yoga.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors.map((instructor, index) => (
          <InstructorCard
            key={instructor.id}
            instructor={instructor}
            specialty={instructorDetails[instructor.id]?.specialty || "Yoga Instructor"}
            experience={instructorDetails[instructor.id]?.experience || "Experienced Teacher"}
            index={index}
          />
        ))}
      </div>

      {instructors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No instructors found.</p>
        </div>
      )}
    </div>
  );
}
