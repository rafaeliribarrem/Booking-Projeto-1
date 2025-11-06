"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
}

interface ClassType {
  id: string;
  name: string;
  durationMinutes: number;
  defaultCapacity: number;
}

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateSessionModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateSessionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [classTypes, setClassTypes] = useState<ClassType[]>([]);
  const [formData, setFormData] = useState({
    classTypeId: "",
    instructorId: "",
    startsAt: "",
    capacity: "20",
    location: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [instructorsRes, classTypesRes] = await Promise.all([
        fetch("/api/admin/instructors"),
        fetch("/api/admin/class-types"),
      ]);

      const [instructorsData, classTypesData] = await Promise.all([
        instructorsRes.json(),
        classTypesRes.json(),
      ]);

      console.log("Fetched instructors:", instructorsData);
      console.log("Fetched class types:", classTypesData);

      // Handle both direct array and wrapped response formats
      const instructorsList = Array.isArray(instructorsData)
        ? instructorsData
        : instructorsData.data || [];
      const classTypesList = Array.isArray(classTypesData)
        ? classTypesData
        : classTypesData.data || [];

      console.log("Processed instructors:", instructorsList);
      console.log("Processed class types:", classTypesList);

      setInstructors(instructorsList.filter((i: any) => i.isActive !== false));
      setClassTypes(classTypesList.filter((c: any) => c.isActive !== false));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleClassTypeChange = (classTypeId: string) => {
    const classType = classTypes.find((ct) => ct.id === classTypeId);
    setFormData({
      ...formData,
      classTypeId,
      capacity: classType?.defaultCapacity.toString() || "20",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Calculate endsAt based on class type duration
      const classType = classTypes.find((ct) => ct.id === formData.classTypeId);
      if (!classType) {
        throw new Error("Please select a class type");
      }

      const startsAt = new Date(formData.startsAt);
      const endsAt = new Date(
        startsAt.getTime() + classType.durationMinutes * 60000
      );

      const payload = {
        classTypeId: formData.classTypeId,
        instructorId: formData.instructorId,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        capacity: parseInt(formData.capacity),
        location: formData.location || undefined,
      };

      console.log("Sending payload:", payload);
      console.log("Form data:", formData);
      console.log("ClassType ID type:", typeof formData.classTypeId, formData.classTypeId);
      console.log("Instructor ID type:", typeof formData.instructorId, formData.instructorId);
      console.log("Available class types:", classTypes.map(ct => ({ id: ct.id, name: ct.name })));
      console.log("Available instructors:", instructors.map(i => ({ id: i.id, name: i.name })));

      const response = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        // Handle different error response formats
        const errorMessage =
          data.error?.message || data.message || "Failed to create session";

        // If there are validation details, format them nicely
        if (data.error?.details) {
          const details = Object.entries(data.error.details)
            .map(
              ([field, errors]) =>
                `${field}: ${(errors as string[]).join(", ")}`
            )
            .join("; ");
          throw new Error(`${errorMessage}. ${details}`);
        }

        throw new Error(errorMessage);
      }

      // Reset form and close modal
      setFormData({
        classTypeId: "",
        instructorId: "",
        startsAt: "",
        capacity: "20",
        location: "",
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Get minimum datetime (now)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="classType">Class Type *</Label>
            <select
              id="classType"
              value={formData.classTypeId}
              onChange={(e) => handleClassTypeChange(e.target.value)}
              required
              className="w-full h-11 rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            >
              <option value="">Select class type</option>
              {classTypes.map((classType) => (
                <option key={classType.id} value={classType.id}>
                  {classType.name} ({classType.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor *</Label>
            <select
              id="instructor"
              value={formData.instructorId}
              onChange={(e) =>
                setFormData({ ...formData, instructorId: e.target.value })
              }
              required
              className="w-full h-11 rounded-base border-2 border-sand-200 bg-cream-50 px-4 py-3 text-base text-sand-900 shadow-sm transition-all outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-500/20"
            >
              <option value="">Select instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startsAt">Start Date & Time *</Label>
            <Input
              id="startsAt"
              type="datetime-local"
              value={formData.startsAt}
              onChange={(e) =>
                setFormData({ ...formData, startsAt: e.target.value })
              }
              min={getMinDateTime()}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity *</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              min="1"
              max="100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., Studio A, Main Room"
            />
          </div>

          {error && (
            <div className="p-3 bg-terracotta-50 border border-terracotta-200 rounded-base text-sm text-terracotta-700">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Session
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
