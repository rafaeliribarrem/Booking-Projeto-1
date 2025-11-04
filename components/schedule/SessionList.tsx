"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  location?: string | null;
  bookings: { id: string }[];
  classType: { id: string; name: string };
  instructor: { id: string; name: string };
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
      <div className="lg:col-span-3 space-y-4">
        {sessions.map((s) => {
          const starts = new Date(s.startsAt);
          const ends = new Date(s.endsAt);
          const remaining = s.capacity - s.bookings.length;
          return (
            <Card key={s.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 sm:w-32 flex flex-col items-center justify-center text-center">
                  <div className="text-sm font-medium text-muted-foreground">
                    {starts.toLocaleDateString([], { weekday: "short" })}
                  </div>
                  <div className="text-3xl font-bold text-primary mt-1">
                    {starts.getDate()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {starts.toLocaleDateString([], { month: "short" })}
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {s.classType.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        with {s.instructor.name}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {starts.toLocaleTimeString([], { timeStyle: "short" })}
                          </span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-medium">
                            {ends.toLocaleTimeString([], { timeStyle: "short" })}
                          </span>
                        </div>
                        {s.location && (
                          <div className="text-muted-foreground">
                            {s.location}
                          </div>
                        )}
                        <div className={remaining > 3 ? "text-muted-foreground" : "text-accent font-medium"}>
                          {remaining} {remaining === 1 ? "spot" : "spots"} left
                        </div>
                      </div>
                    </div>
                    <Button asChild className="shrink-0">
                      <Link href={`/booking/start?sessionId=${s.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
