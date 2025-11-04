import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id)
    return <div className="container mx-auto px-4 py-8">Please sign in.</div>;

  const [bookings, passes] = await Promise.all([
    prisma.booking.findMany({
      where: { userId: session.user.id },
      include: { classSession: { include: { classType: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.pass.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">
          Upcoming bookings
        </h2>
        <ul className="mt-4 space-y-2">
          {bookings.map((b) => (
            <li key={b.id} className="text-sm text-muted-foreground">
              {b.classSession.classType.name} on{" "}
              {new Date(b.classSession.startsAt).toLocaleString([], {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Passes</h2>
        <ul className="mt-4 space-y-2">
          {passes.map((p) => (
            <li key={p.id} className="text-sm text-muted-foreground">
              {p.type}{" "}
              {p.creditsRemaining ? `· ${p.creditsRemaining} credits` : ""}{" "}
              {p.expiresAt
                ? `· Expires ${new Date(p.expiresAt).toLocaleDateString()}`
                : ""}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
