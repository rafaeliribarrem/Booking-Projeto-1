import Link from "next/link";
import { Card, CardImage } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClassTypeImageVariants } from "@/components/ui/class-type-image";
import { InstructorAvatarVariants } from "@/components/ui/instructor-avatar";
import { Calendar, Clock, Users } from "lucide-react";

interface SessionCardProps {
  session: {
    id: string;
    classType: {
      name: string;
      image?: string;
    };
    instructor: {
      name: string;
      avatar?: string;
    };
    startsAt: Date;
    duration: number;
    capacity: number;
    bookedCount: number;
  };
}

export function SessionCard({ session }: SessionCardProps) {
  const isFull = session.bookedCount >= session.capacity;
  const spotsLeft = session.capacity - session.bookedCount;
  const capacityPercentage = (session.bookedCount / session.capacity) * 100;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card
      variant="elevated"
      className="group hover:shadow-xl transition-all overflow-hidden h-full flex flex-col"
    >
      {/* Class Image */}
      <CardImage className="relative h-48 w-full overflow-hidden">
        <ClassTypeImageVariants.Card
          classTypeName={session.classType.name}
          image={session.classType.image}
        />
        {isFull && (
          <div className="absolute top-3 right-3">
            <Badge variant="error">Full</Badge>
          </div>
        )}
      </CardImage>

      {/* Content */}
      <div className="px-6 flex-1 flex flex-col gap-4">
        {/* Class Type */}
        <div>
          <h3 className="text-xl font-semibold text-sand-900 mb-1">
            {session.classType.name}
          </h3>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <InstructorAvatarVariants.Medium
            instructorName={session.instructor.name}
            image={session.instructor.avatar}
          />
          <div>
            <p className="text-sm font-medium text-sand-900">
              {session.instructor.name}
            </p>
            <p className="text-xs text-sand-700">Instructor</p>
          </div>
        </div>

        {/* Session Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sand-700">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{formatDate(session.startsAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-sand-700">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              {formatTime(session.startsAt)} • {session.duration} min
            </span>
          </div>
        </div>

        {/* Capacity Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-sand-700">
              <Users className="h-4 w-4" />
              <span>
                {session.bookedCount} / {session.capacity} spots
              </span>
            </div>
            {!isFull && (
              <span className="text-sage-600 font-medium">
                {spotsLeft} left
              </span>
            )}
          </div>
          <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                capacityPercentage >= 90
                  ? "bg-terracotta-500"
                  : capacityPercentage >= 70
                  ? "bg-clay-500"
                  : "bg-sage-500"
              }`}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-2">
          {isFull ? (
            <Button variant="secondary" className="w-full" asChild>
              <Link
                href={`/booking/start?sessionId=${session.id}&waitlist=true`}
              >
                Join Waitlist
              </Link>
            </Button>
          ) : (
            <Button className="w-full" asChild>
              <Link href={`/booking/start?sessionId=${session.id}`}>
                Book Now
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
