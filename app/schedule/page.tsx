"use client";

import { useState, useEffect } from "react";
import { FilterBar, FilterState } from "@/components/schedule/FilterBar";
import { SessionGrid } from "@/components/schedule/SessionGrid";

export default function SchedulePage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({});

  useEffect(() => {
    // Fetch sessions based on filters
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        // Build query params from filters
        const params = new URLSearchParams();
        if (filters.date) params.append("date", filters.date);
        if (filters.classType && filters.classType !== "all")
          params.append("classType", filters.classType);
        if (filters.instructor && filters.instructor !== "all")
          params.append("instructor", filters.instructor);
        if (filters.timeOfDay && filters.timeOfDay !== "all")
          params.append("timeOfDay", filters.timeOfDay);

        const response = await fetch(`/api/sessions?${params.toString()}`);
        const result = await response.json();

        // Extract sessions array from API response
        const sessionsData = result.data || [];

        // Transform data to match SessionCard interface
        const transformedSessions = sessionsData.map((session: any) => ({
          id: session.id,
          classType: {
            name: session.classType?.name || "Yoga Class",
            image: session.classType?.image,
          },
          instructor: {
            name: session.instructor?.name || "Instructor",
            avatar: session.instructor?.imageUrl,
          },
          startsAt: new Date(session.startsAt),
          duration: session.classType?.durationMinutes || 60,
          capacity: session.capacity,
          bookedCount: session.bookings?.length || 0,
        }));

        setSessions(transformedSessions);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [filters]);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Page Header */}
      <div className="bg-sand-50 border-b border-sand-200">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand-900 mb-4">
            Class Schedule
          </h1>
          <p className="text-lg text-sand-700 max-w-2xl">
            Find your perfect session and book your spot. All levels welcome.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar onFilterChange={setFilters} />

      {/* Session Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <SessionGrid sessions={sessions} isLoading={isLoading} />
      </div>
    </div>
  );
}
