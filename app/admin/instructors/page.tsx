import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInstructorsPage() {
  const instructors = await prisma.instructor.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h2 className="text-2xl font-semibold">Instructors</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {instructors.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}


