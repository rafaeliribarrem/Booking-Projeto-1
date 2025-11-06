"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SessionCard } from "./SessionCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Session = {
  id: string;
  startsAt: string | Date;
  endsAt: string | Date;
  capacity: number;
  location: string | null;
  bookings: { id: string }[];
  classType: {
    id: string;
    name: string;
    description: string | null;
    durationMinutes: number;
    difficulty: string | null;
  };
  instructor: { id: string; name: string; imageUrl: string | null };
};

type Props = {
  sessions: Session[];
  instructors: { id: string; name: string }[];
  styles: { id: string; name: string }[];
};

export function SessionList({ sessions, instructors, styles }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    router.push(`/schedule?${next.toString()}`);
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-4">
      <div className="lg:col-span-1 space-y-4">
        <Select
          onValueChange={(v) => setParam("instructor", v)}
          defaultValue={params.get("instructor") ?? "all"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All instructors</SelectItem>
            {instructors.map((i) => (
              <SelectItem key={i.id} value={i.id}>
                {i.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(v) => setParam("style", v)}
          defaultValue={params.get("style") ?? "all"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All styles</SelectItem>
            {styles.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="lg:col-span-3 grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {sessions.map((s, index) => {
          const sessionWithDates = {
            id: s.id,
            classType: {
              name: s.classType.name,
              image: undefined,
            },
            instructor: {
              name: s.instructor.name,
              avatar: s.instructor.imageUrl || undefined,
            },
            startsAt: new Date(s.startsAt),
            duration: s.classType.durationMinutes,
            capacity: s.capacity,
            bookedCount: s.bookings.length,
          };
          return <SessionCard key={s.id} session={sessionWithDates} />;
        })}

        {sessions.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No classes found matching your filters.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
