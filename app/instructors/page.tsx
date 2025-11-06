import { prisma } from "@/lib/prisma";
import { InstructorCard } from "@/components/instructors/instructor-card";

// Mock data for specialties and experience - in a real app, this could come from the database
const instructorDetails: Record<
  string,
  { specialty: string; experience: string }
> = {
  default: { specialty: "Yoga Master", experience: "5+ years teaching" },
};

export default async function InstructorsPage() {
  const instructors = await prisma.instructor.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="mb-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-4">
            Meet Our Instructors
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-sand-700 leading-relaxed">
            Our experienced team of yoga instructors is dedicated to helping you
            achieve balance, strength, and inner peace through the practice of
            yoga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              specialty={
                instructorDetails[instructor.id]?.specialty || "Yoga Instructor"
              }
              experience={
                instructorDetails[instructor.id]?.experience ||
                "Experienced Teacher"
              }
              index={index}
            />
          ))}
        </div>

        {instructors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sand-700">No instructors found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
