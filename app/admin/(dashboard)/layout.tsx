import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Admin Dashboard</h1>
      <div className="flex gap-2 mb-8 border-b pb-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/sessions">Sessions</Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/classes">Class Types</Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/instructors">Instructors</Link>
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}
