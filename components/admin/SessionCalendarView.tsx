"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Users, Clock } from "lucide-react";
import { CalendarSession } from "@/lib/types/admin";

interface SessionCalendarViewProps {
  sessions: CalendarSession[];
  onSessionClick?: (session: CalendarSession) => void;
  onCreateSession?: (date: Date) => void;
}

export function SessionCalendarView({
  sessions,
  onSessionClick,
  onCreateSession,
}: SessionCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the first day of the current month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the last day of the current month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Get the first day of the week for the calendar (Sunday)
  const firstDayOfWeek = new Date(firstDayOfMonth);
  firstDayOfWeek.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  // Get the last day of the week for the calendar (Saturday)
  const lastDayOfWeek = new Date(lastDayOfMonth);
  lastDayOfWeek.setDate(
    lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())
  );

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = [];
    const current = new Date(firstDayOfWeek);

    while (current <= lastDayOfWeek) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [firstDayOfWeek, lastDayOfWeek]);

  // Group sessions by date
  const sessionsByDate = useMemo(() => {
    const grouped: Record<string, CalendarSession[]> = {};

    sessions.forEach((session) => {
      const dateKey = new Date(session.startsAt).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(session);
    });

    // Sort sessions by start time for each date
    Object.keys(grouped).forEach((dateKey) => {
      grouped[dateKey].sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
      );
    });

    return grouped;
  }, [sessions]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getSessionColor = (session: CalendarSession) => {
    const utilization = session.bookings.length / session.capacity;
    if (utilization >= 0.9) return "bg-terracotta-500 text-cream-50";
    if (utilization >= 0.7) return "bg-clay-500 text-cream-50";
    return "bg-sage-500 text-cream-50";
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sand-900">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <p className="text-sand-700">Session Calendar</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-sand-700"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date) => {
            const dateKey = date.toDateString();
            const daySessions = sessionsByDate[dateKey] || [];
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);

            return (
              <div
                key={dateKey}
                className={`min-h-[120px] p-2 border border-sand-200 rounded-base ${
                  isCurrentMonthDay ? "bg-cream-50" : "bg-sand-50 opacity-50"
                } ${isTodayDate ? "ring-2 ring-terracotta-500" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      isTodayDate
                        ? "text-terracotta-600"
                        : isCurrentMonthDay
                        ? "text-sand-900"
                        : "text-sand-600"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                  {isCurrentMonthDay && onCreateSession && (
                    <button
                      onClick={() => onCreateSession(date)}
                      className="w-5 h-5 rounded-full bg-sand-200 hover:bg-sand-300 flex items-center justify-center transition-colors cursor-pointer"
                      title="Create session"
                    >
                      <Plus className="w-3 h-3 text-sand-700" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {daySessions.slice(0, 3).map((session) => (
                    <button
                      key={session.id}
                      onClick={() => onSessionClick?.(session)}
                      className={`w-full text-left p-1 rounded text-xs cursor-pointer ${getSessionColor(
                        session
                      )} hover:opacity-80 transition-opacity`}
                    >
                      <div className="font-medium truncate">
                        {session.classType.name}
                      </div>
                      <div className="flex items-center gap-1 opacity-90">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(session.startsAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-90">
                        <Users className="w-3 h-3" />
                        <span>
                          {session.bookings.length}/{session.capacity}
                        </span>
                      </div>
                    </button>
                  ))}
                  {daySessions.length > 3 && (
                    <div className="text-xs text-sand-600 text-center py-1">
                      +{daySessions.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sage-500"></div>
          <span className="text-sand-700">Available ({"<"}70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-clay-500"></div>
          <span className="text-sand-700">Filling Up (70-90%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-terracotta-500"></div>
          <span className="text-sand-700">Nearly Full ({">"} 90%)</span>
        </div>
      </div>
    </div>
  );
}
