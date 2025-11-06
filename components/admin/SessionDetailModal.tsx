"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import {
  AdminSession,
  AdminInstructor,
  AdminClassType,
} from "@/lib/types/admin";

interface SessionDetailModalProps {
  session: AdminSession | null;
  isOpen: boolean;
  onClose: () => void;
  instructors: AdminInstructor[];
  classTypes: AdminClassType[];
  onUpdate?: (sessionId: string, data: any) => Promise<void>;
  onDelete?: (sessionId: string) => Promise<void>;
}

export function SessionDetailModal({
  session,
  isOpen,
  onClose,
  instructors,
  classTypes,
  onUpdate,
  onDelete,
}: SessionDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    classTypeId: "",
    instructorId: "",
    startsAt: "",
    duration: "",
    capacity: "",
    location: "",
  });

  // Initialize form data when session changes
  React.useEffect(() => {
    if (session) {
      const duration = Math.round(
        (new Date(session.endsAt).getTime() -
          new Date(session.startsAt).getTime()) /
          60000
      );

      setFormData({
        classTypeId: session.classType.id,
        instructorId: session.instructor.id,
        startsAt: new Date(session.startsAt).toISOString().slice(0, 16),
        duration: duration.toString(),
        capacity: session.capacity.toString(),
        location: session.location || "",
      });
    }
  }, [session]);

  if (!session) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data
    const duration = Math.round(
      (new Date(session.endsAt).getTime() -
        new Date(session.startsAt).getTime()) /
        60000
    );

    setFormData({
      classTypeId: session.classType.id,
      instructorId: session.instructor.id,
      startsAt: new Date(session.startsAt).toISOString().slice(0, 16),
      duration: duration.toString(),
      capacity: session.capacity.toString(),
      location: session.location || "",
    });
  };

  const handleSave = async () => {
    if (!onUpdate) return;

    setIsLoading(true);
    try {
      const startsAt = new Date(formData.startsAt);
      const endsAt = new Date(
        startsAt.getTime() + parseInt(formData.duration) * 60000
      );

      await onUpdate(session.id, {
        classTypeId: formData.classTypeId,
        instructorId: formData.instructorId,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        capacity: parseInt(formData.capacity),
        location: formData.location || null,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    if (
      !confirm(
        "Are you sure you want to delete this session? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await onDelete(session.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <Badge variant="success">Confirmed</Badge>;
      case "CANCELLED":
        return <Badge variant="error">Cancelled</Badge>;
      case "WAITLIST":
        return <Badge variant="warning">Waitlist</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const confirmedBookings = session.bookings.filter(
    (b) => b.status === "CONFIRMED"
  );
  const waitlistBookings = session.bookings.filter(
    (b) => b.status === "WAITLIST"
  );
  const utilization = Math.round(
    (confirmedBookings.length / session.capacity) * 100
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Session Details</span>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 py-4">
          {/* Session Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-sand-900 mb-4">
                Session Information
              </h3>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-classType">Class Type</Label>
                    <Select
                      value={formData.classTypeId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, classTypeId: v })
                      }
                    >
                      <SelectTrigger id="edit-classType">
                        <SelectValue />
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
                    <Label htmlFor="edit-instructor">Instructor</Label>
                    <Select
                      value={formData.instructorId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, instructorId: v })
                      }
                    >
                      <SelectTrigger id="edit-instructor">
                        <SelectValue />
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
                    <Label htmlFor="edit-startsAt">Start Date & Time</Label>
                    <Input
                      id="edit-startsAt"
                      type="datetime-local"
                      value={formData.startsAt}
                      onChange={(e) =>
                        setFormData({ ...formData, startsAt: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-duration">Duration (minutes)</Label>
                    <Input
                      id="edit-duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-capacity">Capacity</Label>
                    <Input
                      id="edit-capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Studio A"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-sand-700 mb-1">Class Type</p>
                    <p className="font-semibold text-sand-900 text-lg">
                      {session.classType.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-sand-700 mb-1">Instructor</p>
                    <p className="font-medium text-sand-900">
                      {session.instructor.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-sand-700 mt-0.5" />
                      <div>
                        <p className="text-sm text-sand-700">Date</p>
                        <p className="font-medium text-sand-900">
                          {session.startsAt.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-sand-700 mt-0.5" />
                      <div>
                        <p className="text-sm text-sand-700">Time</p>
                        <p className="font-medium text-sand-900">
                          {session.startsAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {session.endsAt.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-sand-700 mt-0.5" />
                      <div>
                        <p className="text-sm text-sand-700">Capacity</p>
                        <p className="font-medium text-sand-900">
                          {confirmedBookings.length} / {session.capacity} (
                          {utilization}%)
                        </p>
                      </div>
                    </div>

                    {session.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-sand-700 mt-0.5" />
                        <div>
                          <p className="text-sm text-sand-700">Location</p>
                          <p className="font-medium text-sand-900">
                            {session.location}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Bookings List */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-sand-900 mb-4">
                Bookings ({session.bookings.length})
              </h3>

              {session.bookings.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {session.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-3 p-3 bg-sand-50 rounded-base"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {booking.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sand-900 truncate">
                            {booking.user.name}
                          </p>
                          {getBookingStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-sand-700">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">
                              {booking.user.email}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-sand-600 mt-1">
                          Booked{" "}
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sand-600">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No bookings yet</p>
                </div>
              )}
            </Card>

            {waitlistBookings.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-sand-900 mb-4">
                  Waitlist ({waitlistBookings.length})
                </h3>
                <div className="space-y-3">
                  {waitlistBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-3 p-3 bg-clay-50 rounded-base"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {booking.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sand-900 text-sm">
                          {booking.user.name}
                        </p>
                        <p className="text-xs text-sand-600">
                          {booking.user.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
