import { SessionCard } from "./SessionCard";
import { Calendar } from "lucide-react";

interface Session {
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
}

interface SessionGridProps {
  sessions: Session[];
  isLoading?: boolean;
}

export function SessionGrid({ sessions, isLoading }: SessionGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[500px] bg-sand-100 rounded-base animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-sand-100 flex items-center justify-center mb-6">
          <Calendar className="w-10 h-10 text-sand-400" />
        </div>
        <h3 className="text-2xl font-semibold text-sand-900 mb-2">
          No Classes Found
        </h3>
        <p className="text-sand-700 text-center max-w-md mb-6">
          We couldn't find any classes matching your filters. Try adjusting your
          search criteria or check back later for new sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
