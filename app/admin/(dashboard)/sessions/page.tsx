"use client";

import { useState, useEffect } from "react";
import { SessionCalendarView } from "@/components/admin/SessionCalendarView";
import { SessionManagement } from "@/components/admin/SessionManagement";
import { SessionDetailModal } from "@/components/admin/SessionDetailModal";
import { CreateSessionModal } from "@/components/admin/CreateSessionModal";
import { Button } from "@/components/ui/button";
import { Calendar, List } from "lucide-react";
import {
  AdminSession,
  AdminInstructor,
  AdminClassType,
  CalendarSession,
} from "@/lib/types/admin";

export default function AdminSessionsPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [instructors, setInstructors] = useState<AdminInstructor[]>([]);
  const [classTypes, setClassTypes] = useState<AdminClassType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<AdminSession | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsRes, instructorsRes, classTypesRes] = await Promise.all([
        fetch("/api/admin/sessions"),
        fetch("/api/admin/instructors"),
        fetch("/api/admin/class-types"),
      ]);

      const [sessionsData, instructorsData, classTypesData] = await Promise.all(
        [sessionsRes.json(), instructorsRes.json(), classTypesRes.json()]
      );

      // Handle both direct array and wrapped response formats
      const sessionsList = sessionsData.data || sessionsData;
      const instructorsList =
        Array.isArray(instructorsData) ? instructorsData : (
          instructorsData.data || []
        );
      const classTypesList =
        Array.isArray(classTypesData) ? classTypesData : (
          classTypesData.data || []
        );

      // Convert date strings to Date objects
      const processedSessions = sessionsList.map((session: any) => ({
        ...session,
        startsAt: new Date(session.startsAt),
        endsAt: new Date(session.endsAt),
      }));

      setSessions(processedSessions);
      setInstructors(instructorsList);
      setClassTypes(classTypesList);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionClick = (session: CalendarSession) => {
    // Convert CalendarSession to AdminSession by fetching detailed booking info
    // For now, we'll create a mock AdminSession
    const adminSession: AdminSession = {
      ...session,
      bookings: session.bookings.map((booking) => ({
        id: booking.id,
        user: {
          id: "user-1",
          name: "Mock User",
          email: "user@example.com",
        },
        status: "CONFIRMED",
        createdAt: new Date(),
      })),
    };
    setSelectedSession(adminSession);
    setIsModalOpen(true);
  };

  const handleCreateSession = (date: Date) => {
    setIsCreateModalOpen(true);
  };

  const handleUpdateSession = async (sessionId: string, data: any) => {
    try {
      const response = await fetch(`/api/admin/sessions/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update session");

      // Refresh sessions data
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update session:", error);
      throw error;
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/admin/sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete session");

      // Refresh sessions data
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete session:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sand-700">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sand-900">Manage Sessions</h2>
          <p className="text-sand-700">
            View and manage your yoga class schedule
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            Calendar
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            List
          </Button>
        </div>
      </div>

      {viewMode === "calendar" ?
        <SessionCalendarView
          sessions={sessions.map((session) => ({
            ...session,
            bookings: session.bookings.map((booking) => ({ id: booking.id })),
          }))}
          onSessionClick={handleSessionClick}
          onCreateSession={handleCreateSession}
        />
      : <SessionManagement
          sessions={sessions.map((session) => ({
            ...session,
            bookings: session.bookings.map((booking) => ({ id: booking.id })),
          }))}
          instructors={instructors}
          classTypes={classTypes}
        />
      }

      <SessionDetailModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSession(null);
        }}
        instructors={instructors}
        classTypes={classTypes}
        onUpdate={handleUpdateSession}
        onDelete={handleDeleteSession}
      />

      <CreateSessionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          fetchData();
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
