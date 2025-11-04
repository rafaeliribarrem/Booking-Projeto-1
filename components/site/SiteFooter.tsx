import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-sm text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Serenity Yoga Studio. Breathe. Move.
          Restore.
        </p>
        <div className="flex gap-4">
          <Link href="/schedule">Schedule</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
      </div>
    </footer>
  );
}
