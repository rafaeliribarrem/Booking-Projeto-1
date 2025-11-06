"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  CalendarSession,
  AdminInstructor,
  AdminClassType,
} from "@/lib/types/admin";

type Props = {
  sessions: CalendarSession[];
  instructors: AdminInstructor[];
  classTypes: AdminClassType[];
};

export function SessionManagement({
  sessions,
  instructors,
  classTypes,
}: Props) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    classTypeId: "",
    instructorId: "",
    startsAt: "",
    capacity: "12",
    location: "",
  });

  async function handleCreate() {
    setIsCreating(true);
    try {
      // Get the selected class type to determine duration
      const classType = classTypes.find((ct) => ct.id === formData.classTypeId);
      if (!classType) {
        toast.error("Please select a class type");
        setIsCreating(false);
        return;
      }

      const startsAt = new Date(formData.startsAt);
      const endsAt = new Date(
        startsAt.getTime() + classType.durationMinutes * 60000
      );

      const res = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classTypeId: formData.classTypeId,
          instructorId: formData.instructorId,
          startsAt: startsAt.toISOString(),
          endsAt: endsAt.toISOString(),
          capacity: parseInt(formData.capacity),
          location: formData.location || undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage =
          errorData.error?.message ||
          errorData.message ||
          "Failed to create session";
        throw new Error(errorMessage);
      }

      toast.success("Session created successfully");
      setOpen(false);
      setFormData({
        classTypeId: "",
        instructorId: "",
        startsAt: "",
        capacity: "12",
        location: "",
      });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to create session");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      const res = await fetch(`/api/admin/sessions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete session");

      toast.success("Session deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete session");
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Session</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="classType">Class Type</Label>
                <Select
                  value={formData.classTypeId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, classTypeId: v })
                  }
                >
                  <SelectTrigger id="classType">
                    <SelectValue placeholder="Select class type" />
                  </SelectTrigger>
                  <SelectContent>
                    {classTypes.map((ct) => (
                      <SelectItem key={ct.id} value={ct.id}>
                        {ct.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Select
                  value={formData.instructorId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, instructorId: v })
                  }
                >
                  <SelectTrigger id="instructor">
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startsAt">Start Date & Time</Label>
                <Input
                  id="startsAt"
                  type="datetime-local"
                  value={formData.startsAt}
                  onChange={(e) =>
                    setFormData({ ...formData, startsAt: e.target.value })
                  }
                />
                {formData.classTypeId && formData.startsAt && (
                  <p className="text-xs text-sand-600">
                    Duration:{" "}
                    {classTypes.find((ct) => ct.id === formData.classTypeId)
                      ?.durationMinutes || 0}{" "}
                    minutes
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  min="1"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (optional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Studio A"
                />
              </div>

              <Button
                onClick={handleCreate}
                disabled={
                  isCreating ||
                  !formData.classTypeId ||
                  !formData.instructorId ||
                  !formData.startsAt
                }
                className="w-full"
              >
                {isCreating ? "Creating..." : "Create Session"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => {
          const starts = new Date(session.startsAt);
          const ends = new Date(session.endsAt);
          const remaining = session.capacity - session.bookings.length;

          return (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>
                    {session.classType.name} · {session.instructor.name}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(session.id)}
                  >
                    Delete
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <strong>Start:</strong>{" "}
                    {starts.toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p>
                    <strong>End:</strong>{" "}
                    {ends.toLocaleTimeString([], { timeStyle: "short" })}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {session.capacity}
                  </p>
                  <p>
                    <strong>Bookings:</strong> {session.bookings.length} (
                    {remaining} spots remaining)
                  </p>
                  {session.location && (
                    <p>
                      <strong>Location:</strong> {session.location}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
