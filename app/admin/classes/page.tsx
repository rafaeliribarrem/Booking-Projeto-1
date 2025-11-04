import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminClassesPage() {
  const classTypes = await prisma.classType.findMany({
    orderBy: { name: "asc" },
  });
  return (
    <div>
      <h2 className="text-2xl font-semibold">Class Types</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {classTypes.map((c) => (
          <li key={c.id}>
            {c.name} · {c.durationMinutes} min · cap {c.defaultCapacity}
          </li>
        ))}
      </ul>
    </div>
  );
}
